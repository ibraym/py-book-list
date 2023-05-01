// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { useGridRootProps } from '@mui/x-data-grid';

import { createObj } from '../../../dataProvider';
import BookForm from '../BookForm';

import { DialogTitle, DialogContent } from '../../../common';

// interface BookAddButtonProps {
//     insideGrid?: boolean;
// }

const BookAddButton = (): JSX.Element | null => {
    const createMutation = createObj('books');
    const rootProps = useGridRootProps();
    const [open, setOpen] = React.useState(false);

    const onSubmit = (values): void => createMutation.mutate(values, {
        onSuccess: () => {
            setOpen(false);
        },
    });

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <rootProps.slots.baseButton
                size='small'
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                Add Book
            </rootProps.slots.baseButton>
            <Dialog
                onClose={handleClose}
                aria-labelledby='add-book-dialog-title'
                open={open}
            >
                <DialogTitle onClose={handleClose}>
                    Add new books
                </DialogTitle>
                <DialogContent dividers>
                    <BookForm onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookAddButton;
