"use client";

import React, { useState } from "react";
import { Bell, Lock, Globe, Eye, Shield, Smartphone } from "lucide-react";

export default function PatientSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    promotionalEmails: false,
    twoFactorAuth: false,
    language: "English",
    timezone: "EST",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 text-sm">Manage your account preferences and security</p>
      </div>

      <div className="p-8 max-w-4xl">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#1a3fac]" />
            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <button
                onClick={() => handleToggle("emailNotifications")}
                className={`w-12 h-6 rounded-full transition ${
                  settings.emailNotifications ? "bg-[#1a3fac]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    settings.emailNotifications ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
                <p className="text-sm text-gray-600">Receive text message alerts</p>
              </div>
              <button
                onClick={() => handleToggle("smsNotifications")}
                className={`w-12 h-6 rounded-full transition ${
                  settings.smsNotifications ? "bg-[#1a3fac]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    settings.smsNotifications ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Appointment Reminders</h3>
                <p className="text-sm text-gray-600">Get reminders before appointments</p>
              </div>
              <button
                onClick={() => handleToggle("appointmentReminders")}
                className={`w-12 h-6 rounded-full transition ${
                  settings.appointmentReminders ? "bg-[#1a3fac]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    settings.appointmentReminders ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-semibold text-gray-800">Promotional Emails</h3>
                <p className="text-sm text-gray-600">Receive offers and updates</p>
              </div>
              <button
                onClick={() => handleToggle("promotionalEmails")}
                className={`w-12 h-6 rounded-full transition ${
                  settings.promotionalEmails ? "bg-[#1a3fac]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    settings.promotionalEmails ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#1a3fac]" />
            <h2 className="text-xl font-bold text-gray-800">Security</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => handleToggle("twoFactorAuth")}
                className={`w-12 h-6 rounded-full transition ${
                  settings.twoFactorAuth ? "bg-[#1a3fac]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    settings.twoFactorAuth ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                className="px-6 py-2 bg-[#1a3fac] hover:bg-[#1a3fac] text-white rounded-lg transition"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#1a3fac]" />
            <h2 className="text-xl font-bold text-gray-800">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
              >
                <option>EST - Eastern Standard Time</option>
                <option>CST - Central Standard Time</option>
                <option>MST - Mountain Standard Time</option>
                <option>PST - Pacific Standard Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-[#1a3fac]" />
            <h2 className="text-xl font-bold text-gray-800">Privacy</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-800">Download My Data</h3>
              <p className="text-sm text-gray-600">Get a copy of your personal information</p>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-800">Privacy Policy</h3>
              <p className="text-sm text-gray-600">Review our privacy practices</p>
            </button>
            <button className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition text-red-600">
              <h3 className="font-semibold">Delete Account</h3>
              <p className="text-sm">Permanently delete your account and data</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-8 py-3 bg-[#1a3fac] hover:bg-[#1a3fac] text-white rounded-lg font-semibold transition"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
