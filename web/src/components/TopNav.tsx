"use client"
import {TopNavigation} from "@cloudscape-design/components";
import React, {useLayoutEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function TopNav() {
	const router = useRouter()

	return (
		<TopNavigation
			identity={{
				href: '#',
				title: 'DMARC',
				// logo: {src: logo, alt: 'Service name logo'},
			}}
			// search={
			// 	<Input
			// 		ariaLabel="Input field"
			// 		clearAriaLabel="Clear"
			// 		value={searchValue}
			// 		type="search"
			// 		placeholder="Search"
			// 		onChange={({detail}) => setSearchValue(detail.value)}
			// 	/>
			// }
			utilities={[

			]}
		/>
	)
}

