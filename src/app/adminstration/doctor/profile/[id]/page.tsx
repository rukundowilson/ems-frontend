'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Mail, Phone, Award, Briefcase, Clock } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Service } from '@/types/services';
import api from '@/app/shared/services/axios';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization?: string;
  experience?: number;
  qualification?: string;
  services?: string[];
}

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.id as string;
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [assignedServices, setAssignedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch doctor details
        const doctorRes = await api.get(`/doctors/${doctorId}`);
        setDoctor(doctorRes.data.data);

        // Fetch all services
        const servicesRes = await api.get('/services');
        const servicesData = servicesRes.data;
        const allServices = servicesData.data || [];
        setServices(allServices);

        // Match doctor's services with service objects
        if (doctorRes.data?.services && Array.isArray(doctorRes.data.services)) {
          const assigned = allServices.filter((service: Service) => 
            doctorRes.data.services?.includes(service._id?.toString() || service.id)
          );
          setAssignedServices(assigned);
        }
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading doctor profile...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link
            href="/get-started/all"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Doctors
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error || 'Doctor not found'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          href="/get-started/all"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Doctors
        </Link>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {doctor.name}
              </h1>
              {doctor.specialization && (
                <p className="text-lg text-blue-600 font-semibold mb-4">
                  {doctor.specialization}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">{doctor.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900 font-medium">{doctor.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          {(doctor.qualification || doctor.experience) && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctor.qualification && (
                  <div className="flex items-start gap-4">
                    <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Qualification</p>
                      <p className="text-gray-900 font-medium">{doctor.qualification}</p>
                    </div>
                  </div>
                )}

                {doctor.experience !== undefined && (
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Years of Experience</p>
                      <p className="text-gray-900 font-medium">{doctor.experience} years</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assigned Services */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Services</h2>
            
            {assignedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedServices.map((service) => (
                  <div
                    key={service._id || service.id}
                    className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                  >
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600">No services assigned to this doctor yet.</p>
              </div>
            )}
          </div>

          {/* Book Appointment Button */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <Link
              href={`/get-started/book?doctor=${doctor._id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
