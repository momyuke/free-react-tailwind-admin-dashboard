export interface ApiResponse<T> {
    data: T,
    message?: string,
    status?: boolean
}

export const GENERAL_ERROR_MESSAGE = 'Oops, there is something wrong. Please kindly check again later.'