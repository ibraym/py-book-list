// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { makeStyles } from '@mui/styles';
import MuiDialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '@mui/material/styles';

const useStyles = () => {
    const theme = useTheme();

    return makeStyles(({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }),
    {
        name: 'DialogTitle',
    });
};

interface Props extends DialogTitleProps {
    onClose: any | undefined;
}

const DialogTitle = (props: Props): JSX.Element => {
    const {
        classes: classesOverride,
        children,
        onClose,
        ...other
    } = props;
    const classes = useStyles();

    return (
        <MuiDialogTitle className={classes().root} {...other}>
            {children}
            <IconButton
                aria-label='close'
                className={classes().closeButton}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
        </MuiDialogTitle>
    );
};

export default DialogTitle;
