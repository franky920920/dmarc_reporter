"use client"
import React from "react";
import {
	Box,
	BreadcrumbGroup,
	Button,
	Container,
	ContentLayout,
	Header,
	SpaceBetween,
} from '@cloudscape-design/components';
import {useRouter} from "next/navigation";

export default function Home() {
	const router = useRouter()

	return (
		<ContentLayout
			header={
				<Header>Use the side navigation to get started</Header>
			}
		>
		</ContentLayout>
	)
}
