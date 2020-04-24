import React from 'react';
import { getPaginationStyles } from './styles';

type propsType = {
    currentPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
};

export const Pagination: React.FC<propsType> = ({
    currentPage,
    totalPages,
    onChangePage,
}) => {
    const {
        pagination,
        paginationCurrentPage,
        paginationNavigation,
    } = getPaginationStyles();

    const handleOnPageChange = (offset: number) => {
        onChangePage(currentPage + offset);
    };

    return (
        <div className={pagination}>
            {currentPage > 1 && (
                <p
                    className={paginationNavigation}
                    onClick={() => handleOnPageChange(-1)}
                >
                    {'<- previous'}
                </p>
            )}
            <p
                className={paginationCurrentPage}
            >{`${currentPage}/${totalPages}`}</p>
            {totalPages > currentPage && (
                <p
                    className={paginationNavigation}
                    onClick={() => handleOnPageChange(1)}
                >
                    {'next ->'}
                </p>
            )}
        </div>
    );
};
