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
    additionalInfo: object,
}

export interface ApiListResponse extends ApiResponse {
    result: object[],
}

export interface ApiObjectResponse extends ApiResponse {
    result: object,
}
