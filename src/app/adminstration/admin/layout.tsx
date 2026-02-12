"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Briefcase,
  UserCircle,
} from "lucide-react";
import QueryProvider from "@/app/providers/QueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("user_data");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setUser(parsed || null);
    } catch (e) {
      // ignore
    }
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "A";

  return (
    <QueryProvider>
    <div className="flex h-screen bg-gray-50">
      <div className="w-28 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col items-center py-6 space-y-8 fixed h-screen z-40">
        <div
          className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl overflow-hidden"
          title={user?.name || "Admin"}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <nav className="flex flex-col space-y-8">
          <Link
            href="/adminstration/admin"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Overview"
          >
            <LayoutDashboard className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/doctors"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/doctors" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Doctors"
          >
            <Users className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/patients"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/patients" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Patients"
          >
            <UserCircle className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/appointments"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/appointments" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Appointments"
          >
            <Calendar className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/services"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname?.includes("/services") ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Services"
          >
            <Briefcase className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/settings"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/settings" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Settings"
          >
            <Settings className="w-6 h-6 text-white" />
          </Link>
        </nav>
        <div className="mt-auto mb-4">
          <button
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_role");
              localStorage.removeItem("user_data");
              router.push("/auth/signin");
            }}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 ml-28 overflow-auto">{children}</div>
    </div>
    </QueryProvider>
  );
}
