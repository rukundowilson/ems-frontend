"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  User,
  MessageSquare,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";

export default function PatientLayout({
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
    : "P";

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-28 bg-[#0d2563] text-white flex flex-col items-center py-6 space-y-8 fixed h-screen z-40">
        <Link
          href="/adminstration/patient"
          className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center font-bold text-[#1a3fac] text-xl overflow-hidden hover:ring-2 hover:ring-teal-300 transition"
          title={user?.name || "Patient"}
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
        </Link>

        <nav className="flex flex-col space-y-8">
          <Link
            href="/adminstration/patient"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
            title="Overview"
          >
            <LayoutDashboard className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/patient/appointments"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient/appointments" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
            title="Appointments"
          >
            <Calendar className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/patient/profile"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient/profile" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
            title="Profile"
          >
            <User className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/patient/messages"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient/messages" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
            title="Messages"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/patient/support"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient/support" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
            title="Support"
          >
            <HelpCircle className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/patient/settings"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/patient/settings" ? "bg-teal-500" : "bg-[#1a3fac] hover:bg-[#1a3fac]"}`}
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
  );
}
