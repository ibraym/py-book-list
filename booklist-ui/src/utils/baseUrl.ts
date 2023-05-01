// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

const baseUrl = (path: string | undefined, base = process.env.REACT_APP_BACKEND_BASE_URL): string => {
    if (path === undefined) return '';
    const parts = [base];
    parts.push(path.replace(/^\//, ''));
    return parts.join('/');
};

export default baseUrl;
