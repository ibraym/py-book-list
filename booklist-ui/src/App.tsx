// Copyright (C) 2023 Ibrahem Mouhamad
//
// SPDX-License-Identifier: MIT

import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import {
    Routes,
    Route,
} from 'react-router-dom';

import { Layout } from './components/layout';
import { NotFound, BookListPage } from './components';

const queryClient = new QueryClient();

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Routes>
                    <Route index element={<BookListPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Layout>
        </QueryClientProvider>
    );
}

export default App;
