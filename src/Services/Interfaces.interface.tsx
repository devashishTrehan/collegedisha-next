import { pageStateType } from "@/Components/DataPageWrapper.component";

export interface MenuListInterface {
    label: string,
    list: MenuListInterface[],
    link?: string
}

export interface ApiResponse {
    isAuthenticated: boolean,
    status: boolean,
    messages: string[],
    result: any,
    additionalData: { [key: string]: any, pageSEO: PageSEOProps },
    requestStatus?: pageStateType
}

export interface ApiListResponse extends ApiResponse {
    result: object[],
}

export interface ApiObjectResponse extends ApiResponse {
    result: object,
}


export interface PageSEOProps {
    metaTitle: string,
    metaDescription: string,
    metaKeywords: string
}

