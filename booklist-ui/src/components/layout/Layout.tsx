// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import theme from './theme';

export default ({
    // eslint-disable-next-line react/prop-types
    children,
    ...rest
}): JSX.Element => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='lg' {...rest}>
            {children}
        </Container>
    </ThemeProvider>
);
