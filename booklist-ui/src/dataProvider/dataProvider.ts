// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import queryString from 'query-string';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query';

import { baseUrl } from '../utils';

import { fetchJson } from './fetch';

export const PAGE_SIZE = 10;
const getPaginationQuery = (page: number, page_size: number): {} => ({
    page,
    page_size,
});

const getList = (resource: string, page, page_size) => useQuery(
    [resource, page],
    () => {
        const query = {
            ...getPaginationQuery(page + 1, page_size),
        };
        const url = baseUrl(`/${resource}?${queryString.stringify(query)}`);
        return fetchJson(url).then((response) => response.json);
    },
    { keepPreviousData: true },
);

const createObj = (resource: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: any) => fetchJson(baseUrl(`/${resource}`), {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response) => response.json),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(resource);
            },
        },
    );
};

const updateObj = (resource: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: any) => fetchJson(baseUrl(`/${resource}/${data.id}`), {
            method: 'PATCH',
            body: JSON.stringify(data),
        }).then((response) => response.json),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(resource);
            },
        },
    );
};

const deleteObj = (resource: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: string) => fetchJson(baseUrl(`/${resource}/${id}`), {
            method: 'DELETE',
        }).then((response) => response.json),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(resource);
            },
        },
    );
};

export {
    getList,
    createObj,
    updateObj,
    deleteObj,
};
