"use client";

import React from 'react';
import AdminLayout from '../admin/layout';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 w-full">{children}</div>
    </AdminLayout>
  );
}
