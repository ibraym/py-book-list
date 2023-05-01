// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#62ce95',
            contrastText: '#fff',
        },
        secondary: {
            main: '#6098f2',
            contrastText: '#fff',
        },
    },
    components: {
    },
});
export default theme;
