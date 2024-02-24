interface overviewResponse {
	domains: string[],
	emailCount: string,
	rates: {
		spf_pass_rate: string,
		dkim_pass_rate: string,
		disposition_none_rate: string,
		disposition_quarantine_rate: string,
		disposition_reject_rate: string
	},
	lastReport: {
		report_end_date: string,
		report_org_name: string
	},
	reportOrg: reportOrgCount[]
}

interface reportOrgCount {
	report_org_name: string
	count: string
}
