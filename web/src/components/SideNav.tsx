"use client"
import {SideNavigation} from "@cloudscape-design/components";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function SideNav() {
	const router = useRouter();
	const [dynamicActiveHref, setDynamicActiveHref] = useState( '')
	useEffect(() => {
		setDynamicActiveHref(window.location.pathname)
	}, [])
	return (
		<SideNavigation
			activeHref={dynamicActiveHref}
			header={{text: `Home`, href: `/`}}
			items={[
				{
					type: "link",
					text: 'Dashboard',
					href: "/dashboard"
				},{
					type: "link",
					text: 'First page - simple form',
					href: "/simpleForm"
				}
			]}
			onFollow={event => {
				event.preventDefault();
				router.push(event.detail.href);
				setDynamicActiveHref(event.detail.href)
			}}
		/>
	)
}

