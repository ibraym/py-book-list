// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useGridApiContext, useGridRootProps } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { deleteObj } from '../../../dataProvider';
import { DialogTitle, DialogContent } from '../../../common';

const BookBulkDeleteButton = (): JSX.Element | null => {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const [open, setOpen] = React.useState(false);
    const selectedRow = apiRef.current.getSelectedRows();
    const deleteMutation = deleteObj('books');

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleCancel = (): void => {
        setOpen(false);
    };

    const handleOk = (): void => {
        // delete selected rows
        [...selectedRow.keys()].forEach((key) => deleteMutation.mutate(key.toString()));
        apiRef.current.setRowSelectionModel([]);
        setOpen(false);
    };

    return selectedRow.size > 0 ? (
        <>
            <rootProps.slots.baseButton
                size='small'
                onClick={handleOpen}
                startIcon={<DeleteIcon />}
            >
                Delete Selected
            </rootProps.slots.baseButton>
            <Dialog
                onClose={handleClose}
                aria-labelledby='delete-book-dialog-title'
                open={open}
                maxWidth='lg'
            >
                <DialogTitle onClose={handleClose}>
                    Deleting Books
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant='subtitle2'>
                        Are you sure you want to delete these books?
                    </Typography>
                    <List>
                        {
                            [...selectedRow.values()].map((book) => (
                                <ListItem key={book.id}>
                                    <ListItemText
                                        primary={book.name}
                                        secondary={book.author}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    ) : null;
};

export default BookBulkDeleteButton;
