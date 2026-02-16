"use client";

import React, { useState } from "react";
import { Search, Plus, X, Trash2, Edit, Eye } from "lucide-react";
import {
  useDoctors,
  useUpdateDoctor,
  useCreateDoctor,
  useDeleteDoctor,
  useServices,
} from "@/app/shared/hooks/useAdminData";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function DoctorsPage() {
  const { data: doctors = [], isLoading } = useDoctors();
  const { data: services = [] } = useServices();
  const updateDoctor = useUpdateDoctor();
  const createDoctor = useCreateDoctor();
  const deleteDoctor = useDeleteDoctor();
  const { darkMode } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const emptyForm = {
    name: "",
    title: "",
    role: "",
    specialization: "",
    availability: "",
    phone: "",
    email: "",
    password: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [customService, setCustomService] = useState("");

  // ✅ ONE FUNCTION FOR ALL MODES
  const openDoctorModal = (mode: "add" | "edit" | "view", doctor?: any) => {
    setModalMode(mode);
    setSelectedDoctor(doctor || null);

    if (doctor) {
      setFormData({
        name: doctor.name || "",
        title: doctor.title || "",
        role: doctor.role || "",
        specialization: doctor.specialization || "",
        availability: doctor.availability || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        password: "",
        status: doctor.status || "Active",
      });
    } else {
      setFormData(emptyForm);
    }

    setCustomService("");
    setShowModal(true);
  };

  const handleAdd = () => openDoctorModal("add");
  const handleEdit = (doctor: any) => openDoctorModal("edit", doctor);
  const handleView = (doctor: any) => openDoctorModal("view", doctor);

  const handleSubmit = async () => {
    const serviceValue =
      formData.specialization === "custom"
        ? customService
        : formData.specialization;

    if (modalMode === "add") {
      await createDoctor.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "doctor",
        specialization: serviceValue,
        title: formData.title,
        availability: formData.availability,
        status: formData.status,
      });
    }

    if (modalMode === "edit" && selectedDoctor) {
      await updateDoctor.mutateAsync({
        id: selectedDoctor._id,
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialization: serviceValue,
          title: formData.title,
          availability: formData.availability,
          status: formData.status,
        },
      });
    }

    setShowModal(false);
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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Doctors Management
          </h1>
          <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Manage doctor profiles and availability
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Doctor
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
      </div>

      {/* DOCTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor: any) => (
          <div
            key={doctor._id}
            className={`rounded-xl shadow-md p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-1 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {doctor.name}
            </h3>

            <p className="text-sm text-teal-600 font-semibold mb-3">
              {doctor.role}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(doctor)}
                className="bg-purple-600 text-white p-2 rounded-lg"
              >
                <Edit className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleView(doctor)}
                className="bg-gray-200 p-2 rounded-lg"
              >
                <Eye className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleDelete(doctor._id, doctor.name)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {modalMode === "add"
                  ? "Add Doctor"
                  : modalMode === "edit"
                  ? "Edit Doctor"
                  : "Doctor Details"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-3">
              {[
                "name",
                "title",
                "role",
                "availability",
                "phone",
                "email",
              ].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={(formData as any)[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  disabled={modalMode === "view"}
                  className="w-full border px-3 py-2 rounded-lg disabled:bg-gray-100"
                />
              ))}

              {/* SERVICES */}
              <select
                value={formData.specialization}
                disabled={modalMode === "view"}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select Service</option>
                {services.map((service: any) => (
                  <option key={service._id} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="custom">+ Create New Service</option>
              </select>

              {formData.specialization === "custom" &&
                modalMode !== "view" && (
                  <input
                    placeholder="Custom service name"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                )}

              {modalMode === "add" && (
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              )}
            </div>

            {/* ACTIONS */}
            {modalMode !== "view" ? (
              <div className="flex gap-2 mt-5">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
                >
                  {modalMode === "add" ? "Add" : "Save"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-5 bg-gray-200 py-2 rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
