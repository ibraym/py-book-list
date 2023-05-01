// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { TextInput } from '../../common';

const useStyles = () => makeStyles(
    () => ({
        form: {
            marginTop: '5px',
            marginBottom: '30px',
            width: '500px',
        },
        button: {
            marginTop: '20px',
        },
    }),
    {
        name: 'CreateHeroForm',
    },
);

export interface BookData {
    name: string;
    title: string;
    author: string;
    description: string;
    price: number;
}

const initialValues: BookData = {
    name: '',
    title: '',
    author: '',
    description: '',
    price: 0,
};

interface BookFormProps {
    onSubmit: (data: BookData) => void;
}

const BookForm = ({ onSubmit }: BookFormProps): JSX.Element => {
    const methods = useForm<BookData>({ defaultValues: { ...initialValues } });
    const {
        handleSubmit,
        control,
        formState,
    } = methods;
    const rules = {
        required: 'This field is required',
        validateName: (name: string) => {
            if (name && name.length <= 20) {
                return undefined;
            }
            return 'Book name must be less than 20 characters';
        },
        validateTitle: (title: string) => {
            if (title && title.length <= 30) {
                return undefined;
            }
            return 'Book title must be less than 30 characters';
        },
        validateAuthor: (author: string) => {
            if (author && author.length <= 30) {
                return undefined;
            }
            return 'Book author must be less than 30 characters';
        },
        validateDescription: (description: string) => {
            if (description && description.length <= 512) {
                return undefined;
            }
            return 'Book description must be less than 512 characters';
        },
        validatePrice: (price: number) => {
            if (price && Number.isInteger(+price)) {
                if (price && price > 0 && price <= 99999) {
                    return undefined;
                }
                return 'Book price must be between 0 and 99999';
            }
            return 'Book price must be an integer number';
        },
    };

    const classes = useStyles();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes().form}>
            <FormGroup>
                <TextInput
                    name='name'
                    control={control}
                    label='Name'
                    rules={{ required: rules.required, validate: rules.validateName }}
                />
                <TextInput
                    name='title'
                    control={control}
                    label='Title'
                    rules={{ validate: rules.validateTitle }}
                />
                <TextInput
                    name='author'
                    control={control}
                    label='Author'
                    rules={{ required: rules.required, validate: rules.validateAuthor }}
                />
                <TextInput
                    name='description'
                    control={control}
                    label='Description'
                    multiline
                    minRows={4}
                    rules={{ validate: rules.validateDescription }}
                />
                <TextInput
                    name='price'
                    type='number'
                    control={control}
                    label='Price'
                    rules={{ required: rules.required, validate: rules.validatePrice }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                $
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes().button}
                    disabled={!formState.isDirty}
                >
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

export default BookForm;
