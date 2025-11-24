export interface ResponseType<T> {
    status: string | number;
    msg: string;
    data: T;
}