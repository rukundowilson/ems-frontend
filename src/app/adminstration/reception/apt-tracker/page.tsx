"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Card from "@/app/components/Card";
import { getAllBookings, getAllServices } from "@/app/adminstration/reception/service/api";
import type { Booking, Service } from "@/app/adminstration/reception/types/types";

export default function ServiceAppointmentsPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string | undefined;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [qEmail, setQEmail] = useState("");
  const [qId, setQId] = useState("");
  const [qStatus, setQStatus] = useState("");

  useEffect(() => {
    if (!serviceId) return;
    const fetch = async () => {
      setLoading(true);
      const [s, b] = await Promise.all([getAllServices(), getAllBookings()]);
      setServices(s);
      setBookings(b);
      setLoading(false);
    };
    fetch();
  }, [serviceId]);

  const service = useMemo(() => services.find((s) => s._id === serviceId), [services, serviceId]);

  const appointments = useMemo(
    () => bookings.filter((b) => b.service === serviceId),
    [bookings, serviceId]
  );

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (qId && !a._id.toLowerCase().includes(qId.toLowerCase())) return false;
      if (qEmail && !(a.patientEmail || "").toLowerCase().includes(qEmail.toLowerCase())) return false;
      if (qStatus && qStatus !== "all" && a.status !== qStatus) return false;
      return true;
    }).sort((x, y) => x.time.localeCompare(y.time));
  }, [appointments, qEmail, qId, qStatus]);

  if (!serviceId) return <div className="p-8">Invalid service</div>;
  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push("/adminstration/reception")}
            className="px-3 py-1 bg-gray-200 rounded mr-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold inline-block">{service?.title || "Service"}</h1>
          <p className="text-sm text-gray-600">{service?.description}</p>
        </div>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={qId}
            onChange={(e) => setQId(e.target.value)}
            placeholder="Filter by appointment id"
            className="px-3 py-2 border rounded w-full md:w-1/4"
          />
          <input
            value={qEmail}
            onChange={(e) => setQEmail(e.target.value)}
            placeholder="Filter by patient email"
            className="px-3 py-2 border rounded w-full md:w-1/4"
          />
          <select
            value={qStatus}
            onChange={(e) => setQStatus(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-1/6"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="ml-auto flex items-center space-x-2">
            <div className="text-sm text-gray-600">Results:</div>
            <div className="font-semibold">{filtered.length}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-gray-500">No appointments match filters</Card>
        )}

        {filtered.map((apt) => (
          <Card key={apt._id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">#{apt._id}</div>
              <div className="font-semibold text-lg">{apt.patientName || "Unknown Patient"}</div>
              <div className="text-sm text-gray-600">{apt.patientEmail} • {apt.patientPhone}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-600">{apt.time}</div>
              <div className={`text-sm ${apt.status === "confirmed" ? "text-green-600" : apt.status === "pending" ? "text-yellow-600" : "text-gray-600"}`}>
                {apt.status}
              </div>
              <div className="mt-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(apt._id)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  Copy id
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}