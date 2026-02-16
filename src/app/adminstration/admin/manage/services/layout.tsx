"use client";

import React from "react";

export default function ServicesManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 w-full">
      {children}
    </div>
  );
}
