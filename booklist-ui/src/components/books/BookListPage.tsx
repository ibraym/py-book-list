// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { getList, PAGE_SIZE } from '../../dataProvider';

import Loading from '../Loading';
import Notification from '../Notification';
import BookList from './BookList';

const useStyles = makeStyles(
    () => ({
        container: {
            margin: '20px 0',
        },
    }),
    {
        name: 'BookListPage',
    },
);

const BookListPage = (): JSX.Element => {
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: PAGE_SIZE,
    });

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        // isPreviousData,
    } = getList('books', paginationModel.page, paginationModel.pageSize);
    const classes = useStyles();

    if (isLoading) return (<Loading />);
    if (isError) return (<Notification severity='error' message={error} />);

    return (
        <Box className={classes.container}>
            {
                (data) ? (
                    <>
                        <Box textAlign='center'>
                            <BookList
                                data={data}
                                paginationModel={paginationModel}
                                setPaginationModel={setPaginationModel}
                            />
                            {isFetching ? <Loading /> : null}
                            {' '}
                        </Box>
                    </>
                ) : (
                    <Notification severity='info' message='No books found! click Add book to create one.' />
                )
            }
        </Box>
    );
};

export default BookListPage;
