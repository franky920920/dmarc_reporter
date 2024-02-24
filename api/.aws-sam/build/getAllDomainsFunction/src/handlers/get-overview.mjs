import {Item, Report} from "./database.mjs";
import {raw} from 'objection'
import {cors} from "./cors.mjs";

export const handler = async (event) => {
	let domains = await Report.query()
	 .select('report_domain')
	 .groupBy('report_domain')

	domains = domains.map(obj => obj.report_domain)


	let emailCount = await Item.query()
	 .select(raw('SUM(item_count)').as('count'))

	let rates = await Item.query()
	 .select(raw("(SUM(IF(item_policy_spf = 'pass', item_count, 0)) / SUM(item_count) * 100)").as('spf_pass_rate'))
	 .select(raw("(SUM(IF(item_policy_dkim = 'pass', item_count, 0)) / SUM(item_count) * 100)").as('dkim_pass_rate'))
	 .select(raw("(SUM(IF(item_disposition = 'none', item_count, 0)) / SUM(item_count) * 100)").as('disposition_none_rate'))
	 .select(raw("(SUM(IF(item_disposition = 'quarantine', item_count, 0)) / SUM(item_count) * 100)").as('disposition_quarantine_rate'))
	 .select(raw("(SUM(IF(item_disposition = 'reject', item_count, 0)) / SUM(item_count) * 100)").as('disposition_reject_rate'))

	let lastReport = await Report.query()
	 .select('report_end_date','report_org_name')
	 .orderBy('report_end_date', 'desc')
	 .limit(1)

	let reportOrg = await Item.query()
	 .select('report_org_name')
	 .select(raw('sum(item_count)').as('count'))
	 .leftJoin('report', function () {
		 this.on('item_report_id', '=', 'report_id')
	 })
	 .groupBy('report_org_name')
	 .orderBy('count', "desc")

	return {
		statusCode: 200,
		body: JSON.stringify({
			domains,
			emailCount: emailCount[0].count,
			rates: rates[0],
			lastReport: lastReport[0],
			reportOrg: reportOrg
		}),
		headers: cors
	}
}

await handler({}).then(r => console.log(r))

