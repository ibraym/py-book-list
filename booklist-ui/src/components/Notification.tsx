// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import { HttpError } from '../dataProvider';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref,
) => <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />);

export interface NotificationProps {
    severity: AlertColor | undefined;
    message: string | HttpError | unknown;
}

export default ({ severity, message }: NotificationProps): JSX.Element => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const messageString = message instanceof HttpError ? message.message : message;

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity={severity}>
                {
                    typeof message === 'string' ? messageString : ''
                }
            </Alert>
        </Snackbar>
    );
};
