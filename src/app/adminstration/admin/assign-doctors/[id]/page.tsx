"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Plus, Trash2, Check } from "lucide-react";
import Link from "next/link";
import api from "@/app/shared/services/axios";

interface Doctor {
  _id?: string;
  id?: string;
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization?: string;
  services?: string[];
}

interface Service {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
}

interface ServiceDoctor {
  _id?: string;
  id?: string;
  serviceId: string;
  doctorId: string;
  doctor?: Doctor;
}

export default function AssignDoctorsPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [assignedDoctors, setAssignedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    (async () => {
      await fetchService();
      await fetchDoctors();
      setLoading(false);
    })();
  }, []);

  async function fetchService() {
    try {
      const res = await api.get(`/services/${serviceId}`);
      setService(res.data?.data);
    } catch (err: any) {
      setError("Failed to load service");
    }
  }

  async function fetchDoctors() {
    try {
      const res = await api.get("/doctors");
      const docs: Doctor[] = res.data?.data || [];
      setDoctors(docs);
      // derive assigned doctors from doctor.services array
      const assigned = docs.filter((d) => Array.isArray(d.services) && d.services!.includes(serviceId));
      setAssignedDoctors(assigned);
    } catch (err: any) {
      setError("Failed to load doctors");
    }
  }

  async function handleAssignDoctor(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDoctorId) {
      setError("Please select a doctor");
      return;
    }

    // Check if already assigned
    if (assignedDoctors.some((d) => (d._id || d.id) === selectedDoctorId)) {
      setError("This doctor is already assigned to this service");
      return;
    }

    setAssigning(true);
    try {
      // Assign using doctors route: POST /doctors/:id/services
      const res = await api.post(`/doctors/${selectedDoctorId}/services`, { serviceId });
      const updatedDoctor: Doctor = res.data?.data;
      // update doctors list
      const nextDoctors = doctors.map((d) => (d._id === updatedDoctor._id || d.id === updatedDoctor.id ? updatedDoctor : d));
      // if updatedDoctor wasn't present in local list, add it
      if (!nextDoctors.find((d) => (d._id || d.id) === (updatedDoctor._id || updatedDoctor.id))) {
        nextDoctors.push(updatedDoctor);
      }
      setDoctors(nextDoctors);
      // refresh assignedDoctors
      setAssignedDoctors(nextDoctors.filter((d) => Array.isArray(d.services) && d.services!.includes(serviceId)));
      setSelectedDoctorId("");
      setError(null);
      setToast({ type: 'success', message: 'Doctor assigned to service' });
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to assign doctor");
    } finally {
      setAssigning(false);
    }
  }

  async function handleRemoveDoctor(doctorId: string) {
    setRemoving(doctorId);
    try {
      // Remove using doctors route: DELETE /doctors/:id/services/:serviceId
      await api.delete(`/doctors/${doctorId}/services/${serviceId}`);
      // update local doctors list
      const nextDoctors = doctors.map((d) => {
        if ((d._id || d.id) === doctorId) {
          return { ...d, services: Array.isArray(d.services) ? d.services!.filter((s) => s !== serviceId) : [] };
        }
        return d;
      });
      setDoctors(nextDoctors);
      setAssignedDoctors(nextDoctors.filter((d) => Array.isArray(d.services) && d.services!.includes(serviceId)));
      setToast({ type: 'success', message: 'Doctor removed from service' });
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to remove doctor");
    } finally {
      setRemoving(null);
    }
  }

  const availableDoctors = doctors.filter((d) => !(assignedDoctors.find((a) => (a._id || a.id) === (d._id || d.id))));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Service not found</p>
        <Link
          href="/adminstration/admin/manage/services"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed right-4 top-6 z-50 px-4 py-2 rounded-lg shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.message}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Assign Doctors to {service.title}
          </h1>
          <p className="text-gray-600 text-sm mt-1">{service.description}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Add Doctor Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add Doctor to Service
        </h2>
        <form onSubmit={handleAssignDoctor} className="flex gap-4">
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a doctor --</option>
            {availableDoctors.map((doctor) => (
              <option key={doctor._id || doctor.id} value={doctor._id || doctor.id}>
                {doctor.name ? doctor.name : `${doctor.firstName || ''} ${doctor.lastName || ''}`}
                {doctor.specialization && ` - ${doctor.specialization}`}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={assigning || !selectedDoctorId}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {assigning ? "Adding..." : "Add"}
          </button>
        </form>
        {availableDoctors.length === 0 && (
          <p className="text-gray-600 text-sm mt-4">
            All doctors are already assigned to this service
          </p>
        )}
      </div>

      {/* Assigned Doctors Table */}
      {assignedDoctors.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignedDoctors.map((assignment) => (
                <tr key={assignment._id || assignment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {assignment.name ? assignment.name : `${assignment.firstName || ''} ${assignment.lastName || ''}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {assignment.specialization || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveDoctor(assignment._id || assignment.id || "")}
                      disabled={removing === (assignment._id || assignment.id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No doctors assigned yet</p>
          {doctors.length > 0 && (
            <p className="text-sm text-gray-500">
              Select a doctor from the form above to add them
            </p>
          )}
        </div>
      )}
    </div>
  );
}
