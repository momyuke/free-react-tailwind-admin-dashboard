export interface ApiResponse<T> {
    data: T,
    message?: string,
    status?: boolean
}

export interface PaginationResponse<T> {
    items: T[];
    page: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
}

export const GENERAL_ERROR_MESSAGE = 'Oops, there is something wrong. Please kindly check again later.'
export const APP_PATH_API = '/app';