export interface BackendErrorsInterface {
    type: string
    title: string
    status: number
    detail: string
    instance: string
    access_denied_reason: string
}