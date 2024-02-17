"use client"
import {
	Box,
	Button,
	Container,
	ContentLayout,
	Form,
	FormField,
	Input,
	SpaceBetween
} from "@cloudscape-design/components";
import React, {useContext, useLayoutEffect, useState} from "react";
import {AppLayoutContext} from "@/app/AppLayoutContext";

export default function Page() {
	const {setBreadcrumbItems, setContentType} = useContext(AppLayoutContext)
	useLayoutEffect(() => {
		setBreadcrumbItems([
			{text: 'Home', href: '/'},
			{text: 'Simple form', href: '#'},
		])
		setContentType('dashboard')
	}, []);

	const [input, setInput] = useState('')
	const [display, setDisplay] = useState('')
	return (
		<ContentLayout>
			<Container>
				<Form>

					<SpaceBetween size={"m"}>
						<FormField label={"Type below"}>
							<Input value={input} onChange={(event) => setInput(event.detail.value)}/>
						</FormField>
						<Button onClick={() => {
							setDisplay(input)
						}}>
							Submit
						</Button>
						<Box variant={"h3"}>Your input is: {display}</Box>
					</SpaceBetween>
				</Form>
			</Container>
		</ContentLayout>
	)
}
