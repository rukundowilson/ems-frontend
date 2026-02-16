"use client";

import Card from "@/app/components/Card";
import type { Booking } from "../types/types";

interface AppointmentListProps {
  appointments: Booking[];
  selectedDay: string | null;
}

export default function AppointmentList({
  appointments,
  selectedDay,
}: AppointmentListProps) {
  if (!selectedDay) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500 text-lg">
          Select a day to view appointments
        </p>
      </Card>
    );
  }

  const dayAppointments = appointments.filter((a) => a.date === selectedDay);

  if (dayAppointments.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500 text-lg">No appointments on this day</p>
      </Card>
    );
  }

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Appointments for {formatDate(selectedDay)}
      </h3>
      {dayAppointments
        .sort((a, b) => a.time.localeCompare(b.time))
        .map((apt) => (
          <Card key={apt._id} className="p-4 border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{apt.patientName}</p>
                <p className="text-sm text-gray-600">{apt.patientEmail}</p>
                <p className="text-sm text-gray-600">{apt.patientPhone}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{apt.time}</p>
                <p
                  className={`text-sm font-medium ${
                    apt.status === "confirmed"
                      ? "text-green-600"
                      : apt.status === "pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                  }`}
                >
                  {apt.status}
                </p>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}