'use client';

import { useProtectedRoute } from 'src/modules';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();
  return (
    <>
      <h1 className="title">This is Forms Page</h1>
      {PlaceholderElement}
    </>
  );
}
