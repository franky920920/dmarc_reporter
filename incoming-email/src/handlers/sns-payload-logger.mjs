import parse from "emailjs-mime-parser";
import {TextWriter, Uint8ArrayReader, ZipReader} from "@zip.js/zip.js";
import xmljs from "xml2js"
import Model, {Report, Item} from "./database.js"
import * as Zlib from "zlib";
import {simpleParser} from  'mailparser'

export const snsPayloadLoggerHandler = async (event, context) => {
	// console.debug(JSON.stringify(event))
	// parse email message
	let mine = atob(JSON.parse(event.Records[0].Sns.Message).content)
	// mine = parse.default(mine)
	let parsed = await simpleParser(mine)

	// get report email information
	// const reporter = mine.headers.from[0].value[0].address
	const reporter = parsed.from.value[0].address
	// noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
	const receiver = parsed.to.value[0].address
	// const children = mine.childNodes

	let xml = await mimeProcessor(parsed.attachments)

	if (xml) {
		// parse xml string
		const report = await xmljs.parseStringPromise(xml, {})
		await insertDMARCReport(report)
	} else {
		console.warn(`Email from ${reporter} doesn't seems having valid DMARC report. ignoring.`)
	}

}

async function mimeProcessor(children) {
	for (let child of children) {
		console.log(child.contentType, child)
		if (child.contentType === 'application/zip') {
			try {
				console.log("Processing zip archive")
				// let zipReader = new ZipReader(new Uint8ArrayReader(child.content))
				// let zipEntries = (await zipReader.getEntries()).shift()
				// return await zipEntries.getData(new TextWriter())
				const buffer = new Buffer.from(child.content)
				const unzip = new Zlib.inflateSync(buffer)
				return unzip.toString()
			} catch (e) {
				console.error(e)
				throw e
			}
		}
		if (child.contentType === 'application/gzip') {
			console.log("Processing gunzip xml")
			const buffer = new Buffer.from(child.content)
			const unzip = new Zlib.gunzipSync(buffer)
			return unzip.toString()
		}
		if (["application/xml", "text/xml"].indexOf(child.contentType.value) > -1) {
			console.log("Processing plain xml file")
			return new TextDecoder().decode(child.content)
		}
		console.log("skipped file")
	}
}

async function insertDMARCReport(report) {
	const trx = await Model.startTransaction();

	try {
		const feedback = report.feedback
		const metadata = feedback.report_metadata[0];
		const policy = feedback.policy_published[0];

		const dt_begin = new Date(metadata.date_range[0].begin[0] * 1000).toISOString().replace('T', ' ').replace('Z', '');
		const dt_end = new Date(metadata.date_range[0].end[0] * 1000).toISOString().replace('T', ' ').replace('Z', '');

		const pct = policy.pct[0];
		await Report.query(trx).insert({
			report_id: metadata.report_id[0],
			report_begin_date: dt_begin,
			report_end_date: dt_end,
			report_domain: policy.domain[0],
			report_org_name: metadata.org_name[0],
			report_email: metadata.email[0],
			report_policy_adkim: policy.adkim[0],
			report_policy_aspf: policy.aspf[0],
			report_policy_p: policy.p[0],
			report_policy_sp: policy.sp?.[0] ?? null, // yahoo did not report this
			report_policy_pct: parseInt(pct),
		});

		for (const item of feedback.record) {
			const dd = item.auth_results[0].dkim?.[0].domain[0] ?? null
			const dr = item.auth_results[0].dkim?.[0].result[0] ?? null

			const sd = item.auth_results[0].spf?.[0].domain[0] ?? null;
			const sr = item.auth_results[0].spf?.[0].result[0] ?? null

			// const reason = item.row.policy_evaluated[0]?.reason ? item.row.policy_evaluated[0].reason[0].comment[0] : "-";

			await Item.query(trx).insert({
				item_report_id: metadata.report_id[0],
				item_ip: item.row[0].source_ip[0],
				item_count: parseInt(item.row[0].count[0]),
				item_disposition: item.row[0].policy_evaluated[0].disposition[0],
				item_dkim_domain: dd,
				item_dkim_result: dr,
				item_policy_dkim: item.row[0].policy_evaluated[0].dkim[0],
				item_spf_domain: sd,
				item_spf_result: sr,
				item_policy_spf: item.row[0].policy_evaluated[0].spf[0],
				item_reason: null,
				item_header_from: feedback.record[0].identifiers[0].header_from[0],
			});
		}

		await trx.commit()
		console.log('DMARC report inserted successfully.');
	} catch (error) {
		await trx.rollback()
		console.error('Error inserting DMARC report:', error.message);
		throw error
	}
}
