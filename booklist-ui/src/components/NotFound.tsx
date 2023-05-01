// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = () => {
    const theme = useTheme();

    return makeStyles(({
        oops: {
            fontWeight: 'bolder',
            fontSize: '12rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '9rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '7rem',
            },
        },
        button: {
            marginTop: 20,
        },
    }),
    {
        name: 'NotFound',
    });
};

export default (): JSX.Element => {
    const classes = useStyles();

    return (
        <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            minHeight='100vh'
        >
            <Typography className={classes().oops} color='secondary' variant='h1' component='h2'>
                OOPS!
            </Typography>
            <Typography variant='h4' align='center' gutterBottom>
                {'We can\'t find the page you\'re looking for.'}
            </Typography>
            <Button
                href='/'
                color='secondary'
                variant='outlined'
                className={classes().button}
            >
                Visit hompepage
            </Button>
        </Box>
    );
};
