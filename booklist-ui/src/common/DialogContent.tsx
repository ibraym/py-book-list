// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import withStyles from '@mui/styles/withStyles';
import MuiDialogContent from '@mui/material/DialogContent';

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default DialogContent;
