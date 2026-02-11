"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

const dummyServices = [
  { id: 1, name: "General Consultation", description: "Basic health checkup and consultation", price: "$50", status: "Active" },
  { id: 2, name: "Cardiology Checkup", description: "Heart health examination", price: "$120", status: "Active" },
  { id: 3, name: "Neurology Consultation", description: "Brain and nervous system consultation", price: "$150", status: "Active" },
  { id: 4, name: "Pediatric Care", description: "Child health services", price: "$80", status: "Active" },
];

export default function ServicesPage() {
  const [services, setServices] = useState(dummyServices);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", status: "Active" });

  const handleCreate = () => {
    setEditingService(null);
    setFormData({ name: "", description: "", price: "", status: "Active" });
    setShowModal(true);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleSubmit = () => {
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? { ...s, ...formData } : s)));
    } else {
      setServices([...services, { id: Date.now(), ...formData }]);
    }
    setShowModal(false);
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
          <div key={service.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${service.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                {service.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <p className="text-2xl font-bold text-teal-600 mb-4">{service.price}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(service)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button onClick={() => handleDelete(service.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-1">
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={handleSubmit} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg">Save</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
