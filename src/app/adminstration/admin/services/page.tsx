"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import api from "@/app/shared/services/axios";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      const data = res.data;
      if (data.success) {
        setServices(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleCreate = () => {
    setEditingService(null);
    setFormData({ title: "", slug: "", description: "" });
    setError("");
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({ title: service.title, slug: service.slug, description: service.description });
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await api.delete(`/services/${id}`);
      const data = res.data;
      if (data.success) {
        setServices(services.filter((s) => s._id !== id));
      } else {
        alert(data.error || "Failed to delete service");
      }
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.description) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (editingService) {
        const res = await api.patch(`/services/${editingService._id}`, formData);
        const data = res.data;
        if (data.success) {
          setServices(services.map((s) => (s._id === editingService._id ? data.data : s)));
          setShowModal(false);
        } else {
          setError(data.error || "Failed to update service");
        }
      } else {
        const res = await api.post("/services", formData);
        const data = res.data;
        if (data.success) {
          setServices([...services, data.data]);
          setShowModal(false);
        } else {
          setError(data.error || "Failed to create service");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage hospital services and pricing</p>
        </div>
        <button onClick={handleCreate} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                {service.slug}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(service)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button onClick={() => handleDelete(service._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-1">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingService ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g., General Consultation" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g., general-consultation" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" rows={3} placeholder="Describe the service..." />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg disabled:opacity-50">{loading ? "Saving..." : "Save"}</button>
              <button onClick={() => setShowModal(false)} disabled={loading} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg disabled:opacity-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
