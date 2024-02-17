import {Component, createContext, Dispatch, SetStateAction} from "react";
import {AppLayoutProps} from "@cloudscape-design/components";

interface appLayoutContextProps {
	breadcrumbItems: { text: string, href: string }[]
	setBreadcrumbItems: Dispatch<SetStateAction<{ text: string, href: string }[]>>
	contentType: AppLayoutProps.ContentType
	setContentType: Dispatch<SetStateAction<AppLayoutProps.ContentType>>
	showTools?: boolean
	setShowTools?: Dispatch<SetStateAction<boolean>>
	toolsContent?: any
	setToolsContent?: Dispatch<SetStateAction<any>>
}

export const AppLayoutContext = createContext<appLayoutContextProps>({
	breadcrumbItems: [{text: "Dashboard (loading...)", href: '#'},],
	setBreadcrumbItems: () => {},
	contentType: 'default',
	setContentType: () => {},
	showTools: false,
	setShowTools: () => {},
})
