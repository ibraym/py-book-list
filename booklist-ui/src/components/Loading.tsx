// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = () => {
    const theme = useTheme();

    return makeStyles(({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
    {
        name: 'Backdrop',
    });
};

export default (): JSX.Element => {
    const classes = useStyles();

    return (
        <Backdrop open className={classes().backdrop}>
            <CircularProgress />
        </Backdrop>
    );
};
