/* eslint-disable react/prop-types */
// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import {
    DataGrid, GridColDef, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,
    GridEventListener, useGridApiContext, useGridApiEventHandler, GridFooter,
    GridRowModel,
} from '@mui/x-data-grid';

import {
    updateObj, PAGE_SIZE, getList,
} from '../../dataProvider';
import Loading from '../Loading';
import Notification, { NotificationProps } from '../Notification';
import { BookBulkDeleteButton, BookAddButton } from './buttons';

const tableColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        editable: true,
    },
    {
        field: 'title', headerName: 'Title', flex: 1, editable: true,
    },
    {
        field: 'author', headerName: 'Author', flex: 1, editable: true,
    },
    {
        field: 'description', headerName: 'Description', flex: 2, editable: true,
    },
    {
        field: 'price', headerName: 'Price', flex: 1, editable: true,
    },
];

const Footer = (): JSX.Element => {
    const apiRef = useGridApiContext();
    const updateMutation = updateObj('profiles');
    // change column visibility on the server
    const handleEvent: GridEventListener<'columnVisibilityModelChange'> = (params) => {
        Object.keys(params).forEach((key) => {
            if (key !== '__check__') {
                updateMutation.mutate({ id: key, is_visible: params[key] });
            }
        });
    };
    useGridApiEventHandler(apiRef, 'columnVisibilityModelChange', handleEvent);
    return (
        <GridFooter />
    );
};

const CustomToolbar = (): JSX.Element => (
    <GridToolbarContainer>
        <BookAddButton />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <BookBulkDeleteButton />
    </GridToolbarContainer>
);

const BookListView = ({
    data, paginationModel, setPaginationModel, columnVisibilityModel,
}): JSX.Element => {
    const updateMutation = updateObj('books');
    const [notification, setNotification] = React.useState<NotificationProps>({ message: '', severity: 'success' });

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => updateMutation.mutate(newRow, {
            onSuccess: () => {
                setNotification({ message: 'Book successfully updated', severity: 'success' });
            },
            onError: (err) => {
                setNotification({ message: err, severity: 'error' });
            },
        }),
        [updateObj],
    );

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                editMode='row'
                initialState={{
                    columns: {
                        columnVisibilityModel,
                    },
                }}
                columns={tableColumns}
                rows={data.results}
                rowCount={data.count}
                paginationMode='server'
                paginationModel={paginationModel}
                pageSizeOptions={[PAGE_SIZE]}
                onPaginationModelChange={setPaginationModel}
                processRowUpdate={processRowUpdate}
                disableColumnMenu
                slots={{
                    toolbar: CustomToolbar,
                    footer: Footer,
                }}
                slotProps={{
                    columnsPanel: {
                        disableHideAllButton: true,
                        disableShowAllButton: true,
                    },
                }}
                checkboxSelection
                keepNonExistentRowsSelected
            />
            { notification && notification.message !== '' &&
                <Notification {...notification} />}
        </div>
    );
};

const BookList = ({ data, paginationModel, setPaginationModel }): JSX.Element => {
    const {
        isLoading,
        isError,
        error,
        data: profiles,
    } = getList('profiles', 0, PAGE_SIZE);

    if (isLoading) return (<Loading />);
    if (isError) return (<Notification severity='error' message={error} />);

    let columnVisibilityModel = {};
    if (profiles) {
        columnVisibilityModel = profiles.results.reduce((acc, curr) => {
            acc[curr.column_name] = curr.is_visible;
            return acc;
        }, {});
    }

    return (
        <BookListView
            data={data}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            columnVisibilityModel={columnVisibilityModel}
        />
    );
};

export default BookList;
