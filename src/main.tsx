import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';
import {AuthProvider} from "./AuthContext.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // v4
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'; // v4


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Disable refetch on window focus
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App/>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom"/>

            {/*
                <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
            */}
        </QueryClientProvider>
    </React.StrictMode>
);
