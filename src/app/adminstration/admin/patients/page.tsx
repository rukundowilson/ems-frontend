"use client";

import React, { useState } from "react";
import { usePatients, useUpdatePatient, useDeletePatient, useCreatePatient } from "@/app/shared/hooks/useAdminData";
import { Search, Edit, Trash2, X, Plus } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function PatientsPage() {
  const { data: patients, isLoading } = usePatients();
  const updatePatient = useUpdatePatient();
  const deletePatient = useDeletePatient();
  const createPatient = useCreatePatient();
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    password: "",
  });

  const filteredPatients = patients?.filter((patient: any) =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name || "",
      email: patient.email || "",
      phone: patient.phone || "",
      gender: patient.gender || "",
      dateOfBirth: patient.dateOfBirth || "",
      password: "",
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePatient.mutateAsync({ id: editingPatient._id, data: formData });
    setEditingPatient(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatient.mutateAsync({ ...formData, role: "patient" });
    setShowAddModal(false);
    setFormData({ name: "", email: "", phone: "", gender: "", dateOfBirth: "", password: "" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      await deletePatient.mutateAsync(id);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Patients</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage all patients in the system</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
        >
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      <div className={`rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
        </div>

        {isLoading ? (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading patients...</p>
        ) : filteredPatients?.length === 0 ? (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No patients found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`border-b-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Patient</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date of Birth</th>
                  <th className={`text-center py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredPatients?.map((patient: any, index: number) => (
                  <tr key={patient._id} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} ${index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-750' : 'bg-gray-50')}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold mr-3">
                          {patient.name?.charAt(0) || 'P'}
                        </div>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{patient.name || 'N/A'}</p>
                      </div>
                    </td>
                    <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{patient.email || 'N/A'}</td>
                    <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{patient.phone || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        patient.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {patient.gender || 'N/A'}
                      </span>
                    </td>
                    <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{patient.dateOfBirth || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(patient._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Patient</h2>
              <button onClick={() => setEditingPatient(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={updatePatient.isPending}
                  className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
                >
                  {updatePatient.isPending ? "Updating..." : "Update Patient"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPatient(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={createPatient.isPending}
                  className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
                >
                  {createPatient.isPending ? "Adding..." : "Add Patient"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
