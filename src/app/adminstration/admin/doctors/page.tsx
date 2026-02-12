"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import api from "@/app/shared/services/axios";



export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    specialization: "",
    availability: "",
    phone: "",
    email: "",
    password: "",
    status: "Active",
  });
  const [customService, setCustomService] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      title: "",
      role: "",
      specialization: "",
      availability: "",
      phone: "",
      email: "",
      password: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEdit = (doctor: any) => {
    setModalMode("edit");
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name || "",
      title: doctor.title || "",
      role: doctor.role || "",
      specialization: doctor.specialization || "",
      availability: doctor.availability || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      status: doctor.status || "Active",
    });
    setShowModal(true);
  };

  const handleView = (doctor: any) => {
    setModalMode("view");
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name || "",
      title: doctor.title || "",
      role: doctor.role || "",
      specialization: doctor.specialization || "",
      availability: doctor.availability || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      status: doctor.status || "Active",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (modalMode === "add") {
        const res = await api.post("/doctors", formData);
        if (res.data.success) {
          setDoctors([...doctors, res.data.data]);
          setShowModal(false);
        }
      } else if (modalMode === "edit") {
        const res = await api.patch(`/doctors/${selectedDoctor._id}`, formData);
        if (res.data.success) {
          setDoctors(doctors.map((d: any) => (d._id === selectedDoctor._id ? res.data.data : d)));
          setShowModal(false);
        }
      }
    } catch (err) {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteDoctor.mutateAsync(id);
    }
  };

  const filteredDoctors = doctors.filter((doc: any) =>
    doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 text-center">Loading doctors...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctors Management</h1>
          <p className="text-gray-600 mt-1">Manage doctor profiles and availability</p>
        </div>
        <button onClick={handleAdd} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Doctor
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor: any) => (
          <div key={doctor._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                {doctor.name?.split(" ")[1]?.[0] || doctor.name?.charAt(0) || 'D'}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {doctor.status || 'Active'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name || 'N/A'}</h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.title || 'N/A'}</p>
            <p className="text-sm text-teal-600 font-semibold mb-3">{doctor.role}</p>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Specialization:</span>
                <span className="text-gray-800 ml-2">{doctor.specialization || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Availability:</span>
                <span className="text-gray-800 ml-2">{doctor.availability || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-800 ml-2">{doctor.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-800 ml-2 text-xs">{doctor.email || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-2">
              <button onClick={() => handleEdit(doctor)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm">
                Edit
              </button>
              <button onClick={() => handleView(doctor)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm">
                View Details
              </button>
              <button 
                onClick={() => handleDelete(doctor._id, doctor.name)} 
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                title="Delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {modalMode === "add" ? "Add Doctor" : modalMode === "edit" ? "Edit Doctor" : "Doctor Details"}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service</label>
                <select
                  value={formData.specialization}
                  onChange={(e) => {
                    setFormData({ ...formData, specialization: e.target.value });
                    if (e.target.value !== "custom") setCustomService("");
                  }}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                >
                  <option value="">Select Service</option>
                  {services.map((service: any) => (
                    <option key={service._id} value={service.title}>{service.title}</option>
                  ))}
                  <option value="custom">+ Create New Service</option>
                </select>
              </div>
              {formData.specialization === "custom" && modalMode !== "view" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Service Name</label>
                  <input
                    type="text"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Enter new service name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
              {modalMode === "add" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            {modalMode !== "view" && (
              <div className="flex gap-2 mt-6">
                <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg disabled:opacity-50">
                  {loading ? "Saving..." : modalMode === "add" ? "Add" : "Save"}
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            )}
            {modalMode === "view" && (
              <button onClick={() => setShowModal(false)} className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
