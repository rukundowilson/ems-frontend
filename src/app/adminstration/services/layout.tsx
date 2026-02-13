"use client";

import React from 'react';
import AdminLayout from '../admin/layout';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
