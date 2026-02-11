"use client";

import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";

const dummyDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    title: "MD, Cardiologist",
    role: "Senior Consultant",
    specialization: "Cardiology",
    availability: "Mon-Fri, 9AM-5PM",
    phone: "+1234567890",
    email: "sarah.smith@hospital.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. John Johnson",
    title: "MD, Neurologist",
    role: "Consultant",
    specialization: "Neurology",
    availability: "Mon-Wed, 10AM-4PM",
    phone: "+1234567891",
    email: "john.johnson@hospital.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    title: "MD, Pediatrician",
    role: "Junior Consultant",
    specialization: "Pediatrics",
    availability: "Tue-Sat, 8AM-3PM",
    phone: "+1234567892",
    email: "emily.davis@hospital.com",
    status: "On Leave",
  },
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(dummyDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    specialization: "",
    availability: "",
    phone: "",
    email: "",
    status: "Active",
  });

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
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEdit = (doctor: any) => {
    setModalMode("edit");
    setSelectedDoctor(doctor);
    setFormData(doctor);
    setShowModal(true);
  };

  const handleView = (doctor: any) => {
    setModalMode("view");
    setSelectedDoctor(doctor);
    setFormData(doctor);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      setDoctors([...doctors, { id: Date.now(), ...formData }]);
    } else if (modalMode === "edit") {
      setDoctors(doctors.map((d) => (d.id === selectedDoctor.id ? { ...d, ...formData } : d)));
    }
    setShowModal(false);
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                {doctor.name.split(" ")[1][0]}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {doctor.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.title}</p>
            <p className="text-sm text-teal-600 font-semibold mb-3">{doctor.role}</p>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Specialization:</span>
                <span className="text-gray-800 ml-2">{doctor.specialization}</span>
              </div>
              <div>
                <span className="text-gray-500">Availability:</span>
                <span className="text-gray-800 ml-2">{doctor.availability}</span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-800 ml-2">{doctor.phone}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-800 ml-2 text-xs">{doctor.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-2">
              <button onClick={() => handleEdit(doctor)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm">
                Edit
              </button>
              <button onClick={() => handleView(doctor)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm">
                View Details
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={modalMode === "view"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                />
              </div>
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
                <button onClick={handleSubmit} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg">
                  {modalMode === "add" ? "Add" : "Save"}
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
