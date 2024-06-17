'use client';

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto h-full">{children}</div>;
}
