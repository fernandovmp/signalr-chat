export default interface PaginatedList<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    result: T[];
}
