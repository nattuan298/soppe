export interface IPaginationData<T = any> {
    data: T;
    page: number;
    limit: number;
    total: number;
}
