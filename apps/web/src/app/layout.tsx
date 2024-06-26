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
import { Navbar } from 'src/components';
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
      <body className="text-primary-800">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <MantineProvider>
              <Navbar />
              <main
                className="w-full min-h-full overflow-y-scroll pt-20"
                style={{ scrollbarWidth: 'thin' }}
              >
                <div className="container mx-auto">{children}</div>
              </main>
              <AuthenticationModal />
              <ReactQueryDevtools initialIsOpen={false} />
            </MantineProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
