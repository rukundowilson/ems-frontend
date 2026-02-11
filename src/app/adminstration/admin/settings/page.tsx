"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hospitalName: "City Hospital",
    email: "admin@hospital.com",
    phone: "+1234567890",
    address: "123 Medical Street, City",
    workingHours: "Mon-Fri, 8AM-6PM",
    notifications: true,
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital Name</label>
            <input type="text" value={settings.hospitalName} onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Working Hours</label>
            <input type="text" value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
            <label className="ml-2 text-sm font-semibold text-gray-700">Enable Email Notifications</label>
          </div>
        </div>
        <button onClick={handleSave} className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
