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
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
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

          {!loading && !error && services.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <p>No services available at the moment.</p>
            </div>
          )}

          {!loading && services.map((service, index) => (
            <ServiceCard key={service._id || service.id || `service-${index}`} service={service} />
          ))}
        </div>

        {/* See everything link - goes to another page */}
        <div className="text-center mt-16 pt-8">
          <Link 
            href="/services/all"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:underline text-lg font-semibold transition-all group"
          >
            <span>See all our services</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Footer spacing */}
      </div>
    </div>
  );
}