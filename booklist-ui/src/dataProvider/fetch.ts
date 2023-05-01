// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import HttpError from './HttpError';

export const createHeadersFromOptions = (options: any): Headers => {
    const requestHeaders = (options.headers ||
        new Headers({
            Accept: 'application/vnd.booklist+json; version=1.0',
        })) as Headers;
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && (!options.method || options.method === 'GET')) &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }

    return requestHeaders;
};

export const fetchJson = (url: string, options = {}): Promise<any> => {
    const requestHeaders = createHeadersFromOptions(options);

    return fetch(url, { ...options, headers: requestHeaders })
        .then((response) => response.text().then((text) => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,
        }))).then(({
            status,
            statusText,
            headers,
            body,
        }) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                // not json
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(
                    new HttpError(
                        (json && json.message) || statusText,
                        status,
                        json,
                    ),
                );
            }
            return Promise.resolve({
                status,
                headers,
                body,
                json,
            });
        });
};
