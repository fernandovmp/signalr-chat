using System;
using System.Collections.Generic;

namespace SignalRChat.Domain.Queries
{
    public class PagedList<T>
    {
        public PagedList(int currentPage, int pageSize, int totalCount, IEnumerable<T> result)
        {
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize); ;
            PageSize = pageSize;
            TotalCount = totalCount;
            Result = result;
        }

        public int CurrentPage { get; private set; }
        public int TotalPages { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public IEnumerable<T> Result { get; private set; }
    }
}
