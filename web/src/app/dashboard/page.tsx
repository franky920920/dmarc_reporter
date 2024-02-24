'use client'
import {
	Box,
	Button, ColumnLayout,
	Container,
	ContentLayout,
	FormField, Grid,
	Header,
	Input, PieChart,
	SpaceBetween, Table
} from "@cloudscape-design/components";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {AppLayoutContext} from "@/app/AppLayoutContext";
import axios from "axios";
import {colorChartsGreen400, colorChartsRed400, colorChartsYellow400} from "@cloudscape-design/design-tokens";

const API_ENDPOINT = 'https://g9jx1u9czl.execute-api.us-east-1.amazonaws.com/prod/'

export default function Page() {
	const {setBreadcrumbItems, setContentType} = useContext(AppLayoutContext)
	useLayoutEffect(() => {
		setBreadcrumbItems([
			{text: 'Home', href: '/'},
			{text: 'Report viewer', href: '#'},
		])
		setContentType('dashboard')
	}, []);

	const [overview, setOverview] = useState<overviewResponse>()
	useEffect(() => {
		axios
			.get(`${API_ENDPOINT}overview`)
			.then(value => setOverview(value.data as overviewResponse))
			.catch(error => alert(error))
	}, []);
	return (
		<ContentLayout header={<Header variant={"h1"}>DMARC Report Viewer</Header>}>
			<Grid gridDefinition={[
				{colspan: 8},
				{colspan: 4},
				{colspan: 8},
				{colspan: 4}
			]}>
				<Container header={<Header variant={"h2"}>Overview</Header>}>
					<ColumnLayout borders={"vertical"} columns={4}>
						<div>
							<Box variant="awsui-key-label">Reported domains/emails</Box>
							<Box variant="awsui-value-large">
								{overview?.domains?.length} / {overview ? (numFix(overview.emailCount)) : '-'}
							</Box>
						</div>
						<div>
							<Box variant="awsui-key-label">SPF pass rate</Box>
							<Box variant="awsui-value-large">
								{(overview) ? (parseFloat(overview.rates.spf_pass_rate).toFixed(2)) : '-'}%
							</Box>
						</div>
						<div>
							<Box variant="awsui-key-label">DKIM pass rate</Box>
							<Box variant="awsui-value-large">
								{(overview) ? (parseFloat(overview.rates.dkim_pass_rate).toFixed(2)) : '-'}%
							</Box>
						</div>
						<div>
							<Box variant="awsui-key-label">Disposition rate</Box>
							<Box variant="awsui-value-large">
								{(overview) ? (
									(parseFloat(overview.rates.disposition_quarantine_rate) + parseFloat(overview.rates.disposition_reject_rate)
									).toFixed(2)) : '-'}%
							</Box>
						</div>
					</ColumnLayout>
				</Container>
				<Container header={<Header variant={"h2"}>Last report date</Header>}>
					<Box><b>Date:</b> {overview?.lastReport.report_end_date}</Box>
					<Box><b>Reporter:</b> {overview?.lastReport.report_org_name}</Box>
				</Container>
				<Container header={<Header variant={"h2"}>Reporters</Header>}>
					<Table variant={"borderless"}
						columnDefinitions={[{
							header: "Reporter",
							cell: (item: reportOrgCount) => item.report_org_name
						}, {
							header: "Count",
							cell: (item: reportOrgCount) => item.count
						}]}
						items={overview?.reportOrg ?? []}/>

				</Container>
				<Container header={<Header variant={"h2"}>Disposition stats</Header>}>
				{overview && <PieChart
				 hideFilter={true} hideLegend={true} hideTitles={true}
				 data={[
					 {
						 title: "None",
						 value: parseFloat(overview.rates.disposition_none_rate),
						 color: colorChartsGreen400
					 },
					 {
						 title: "Quarantine",
						 value: parseFloat(overview.rates.disposition_quarantine_rate),
						 color: colorChartsYellow400
					 },
					 {
						 title: "Reject",
						 value: parseFloat(overview.rates.disposition_reject_rate),
						 color: colorChartsRed400
					 }
				 ]}
				 detailPopoverContent={(datum, sum) => [{
					 key: "Percentage",
					 value: `${((datum.value / sum) * 100).toFixed(2)}%`
				 }]}
				 segmentDescription={(datum, sum) =>
					 `${datum.title}: ${((datum.value / sum) * 100
					 ).toFixed(2)}%`}
				 empty={
					 <Box textAlign="center" color="inherit">
						 <b>No data available</b>
						 <Box variant="p" color="inherit">
							 There is no data available
						 </Box>
					 </Box>
				 }
				/>}

			</Container>
			</Grid>
		</ContentLayout>
	)
}

function numFix(num: number | string): string {
	if (typeof num === "string") num = parseFloat(num)
	return new Intl.NumberFormat('en-US', {
		notation: "compact",
		maximumFractionDigits: 2
	}).format(num as number);
}
