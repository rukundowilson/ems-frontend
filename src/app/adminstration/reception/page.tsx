"use client";

import { useEffect, useState } from "react";
import { getAllServices, getAllBookings } from "./service/api";
import ServiceCard from "./components/ServiceCard";
import CalendarView from "./components/CalendarView";
import AppointmentList from "./components/AppointmentList";
import type { Service, Booking } from "./types/types";
import { useRouter } from "next/navigation";

export default function ReceptionPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [servicesData, bookingsData] = await Promise.all([
        getAllServices(),
        getAllBookings(),
      ]);
      setServices(servicesData);
      setBookings(bookingsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Count appointments per service (today)
  const getTodayCount = (serviceId: string): number => {
    const today = new Date().toISOString().split("T")[0];
    return bookings.filter(
      (b) => b.service === serviceId && b.date === today
    ).length;
  };

  // Service icons (customize as needed)
  const serviceIcons: Record<string, string> = {
    consultation: "🩺",
    "follow-up": "🔁",
    "lab-review": "🧪",
    vaccination: "💉",
    default: "🏥",
  };

  const getIcon = (slug: string): string => {
    return serviceIcons[slug.toLowerCase()] || serviceIcons.default;
  };

  const selectedServiceObj = services.find((s) => s._id === selectedService);
  const selectedAppointments = selectedService
    ? bookings.filter((b) => b.service === selectedService)
    : [];

  if (loading) {
    return (
      <div className="p-8 h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reception</h1>
          <p className="text-gray-600">Manage appointments by service</p>
        </div>

        {!selectedService ? (
          // Services Dashboard
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                icon={getIcon(service.slug)}
                count={getTodayCount(service._id)}
                onClick={() => {
                  router.push(`/adminstration/reception/service/${service._id}`);
                }}
                isActive={false}
              />
            ))}
          </div>
        ) : (
          // Calendar + Appointment View
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedService(null);
                setSelectedDay(null);
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-semibold"
            >
              ← Back to Services
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <CalendarView
                  serviceId={selectedService}
                  serviceName={selectedServiceObj?.title || ""}
                  bookings={bookings}
                  onDaySelect={setSelectedDay}
                  selectedDay={selectedDay}
                />
              </div>

              {/* Appointment List */}
              <div className="lg:col-span-2">
                <AppointmentList
                  appointments={selectedAppointments}
                  selectedDay={selectedDay}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}