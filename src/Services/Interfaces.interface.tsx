export interface MenuListInterface {
    label: string,
    list: MenuListInterface[],
    link?: string
}

export interface ApiResponse {
    is_authenticated: boolean,
    status: boolean,
    message: string[],
    result: object | object[],
    additional_info: object,
}
