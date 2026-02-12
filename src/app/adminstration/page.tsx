"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminstrationPage() {
  const router = useRouter();

  useEffect(() => {
    // Check user role and redirect to appropriate dashboard
    const role = localStorage.getItem('user_role');
    const token = localStorage.getItem('auth_token');

    if (!token) {
      // No token, redirect to signin
      router.push('/auth/signin');
      return;
    }

    // Redirect based on role
    if (role === 'admin') {
      router.push('/adminstration/admin');
    } else if (role === 'doctor') {
      router.push('/adminstration/doctor');
    } else {
      // Unknown role, redirect to signin
      router.push('/auth/signin');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}