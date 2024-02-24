import {Report} from "./database.mjs";

export const handler = async (event) => {
	let domains = await Report.query()
	 .select('report_domain')
	 .groupBy('report_domain')

	return {
		statusCode: 200,
		body: JSON.stringify({
			domains
		})
	}
}
