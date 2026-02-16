'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceCard from '@/app/components/ServiceCard';
import { Service } from '@/types/services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '@/app/shared/services/axios';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.get('/services');
        setServices(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError((err as Error).message);
        // Fallback to empty array if API fails
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedServices = services.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="min-h-screen bg-gray-100">
     <Header/>
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Quality Care When You Need It
          </h1>
          
          {/* Subheading */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-8">
            Expert medical services across multiple departments including <span className="font-semibold">emergency care, surgery, diagnostics, and specialized treatments</span>.
          </p>

          {/* Divider line */}
          <div className="w-20 h-1 bg-gray-300 mb-12"></div>

          {/* "I'm here for" label */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            I'm here for:
          </h2>
        </div>

        {/* Services list */}
        <div className="space-y-5">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading services...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Error loading services</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <p>No services available at the moment.</p>
            </div>
          )}

          {!loading && displayedServices.map((service, index) => (
            <ServiceCard key={service._id || service.id || `service-${index}`} service={service} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded font-medium transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
        
        {/* Footer spacing */}
        
      </div>
      <br />
      <Footer/>
    </div>
  );
}