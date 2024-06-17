'use client';
import '../styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { AuthenticationModal, authentication } from 'src/modules';
import { getLocalStorageItem } from 'src/modules/Apis/httpService/helpers';
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const isPreAuthenticated = getLocalStorageItem('token');
    if (isPreAuthenticated) {
      authentication({ isAuthenticated: true });
    }
  }, []);

  const dehydratedState = dehydrate(queryClient);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <MantineProvider>
              <div className="container mx-auto h-full">{children}</div>
              <AuthenticationModal />
              <ReactQueryDevtools initialIsOpen={false} />
            </MantineProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
