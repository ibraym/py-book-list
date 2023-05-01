// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface TextInputProps {
    name: string;
    control: any;
    label: string;
    rules: any;
    [x: string]: any;
}

const TextInput = ({
    name,
    control,
    label,
    rules,
    ...props
}: TextInputProps): JSX.Element => (

    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
            field: { onChange, value },
            fieldState: { error },
        }) => (
            <TextField
                helperText={error ? error.message : null}
                size='medium'
                label={label}
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                variant='outlined'
                sx={{
                    marginBottom: '20px',
                }}
                {...props}
            />
        )}
    />
);

export default TextInput;
