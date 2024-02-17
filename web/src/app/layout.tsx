"use client"
import './globals.css'
import '@cloudscape-design/global-styles/index.css';
import './global-cloudscape.sass';
import React, {useState} from "react";
import styles from "@/app/page.module.scss";
import {TopNav} from "@/components/TopNav";
import {AppLayoutContext} from "@/app/AppLayoutContext";
import {AppLayout, AppLayoutProps, BreadcrumbGroup, SplitPanel} from "@cloudscape-design/components";
import {SideNav} from "@/components/SideNav";
import {useRouter} from "next/navigation";

export default function RootLayout({children,}: {
	children: React.ReactNode
}) {
	const router = useRouter();
	// open / close for nav / tools / split panel
	const [navigation, setNavigation] = useState(true);
	const [tools, setTools] = useState<boolean>(false)
	const [splitPanelShow, setSplitPanelShow] = useState(false)

	const [breadcrumbItems, setBreadcrumbItems] = useState([{text: 'Home', href: '/dashboard'},]);
	const [contentType, setContentType] = useState<AppLayoutProps.ContentType>('default');

	return (
		<html>
		<body>
		<div id={"t"} className={styles.h}>
			<TopNav/>
		</div>
		<AppLayoutContext.Provider value={{
			breadcrumbItems,
			setBreadcrumbItems,
			contentType,
			setContentType,
			showTools: tools,
			setShowTools: setTools,
		}}>
			<AppLayout
				breadcrumbs={
					<BreadcrumbGroup
						items={breadcrumbItems}
						onFollow={event => {
							event.preventDefault();
							router.push(event.detail.href);
						}}
					/>
				}
				headerSelector={'#t'}
				footerSelector={'#f'}
				navigationOpen={navigation}
				navigation={<SideNav/>}
				onNavigationChange={() => setNavigation(!navigation)}
				onToolsChange={() => setTools(!tools)}
				content={children}
				splitPanel={splitPanelShow && <SplitPanel header="Split panel header">Split panel content</SplitPanel>}
				contentType={contentType}
			/>

		</AppLayoutContext.Provider>
		<div id={"f"} className={styles.f}>
			Copyright 2024
			<ul>
				<li>
					<a role={"button"} href={"https://arcloud.com.tw/privacy"} target={'_blank'}>
						Privacy
					</a>
				</li>
			</ul>
		</div>
		</body>
		</html>
	)
}
