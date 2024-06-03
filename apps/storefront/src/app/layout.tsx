'use client';
import '../styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthenticationModal } from 'src/modules';
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            {children}
            <AuthenticationModal /> <ReactQueryDevtools initialIsOpen={false} />
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
