"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@/app/components/Card";
import type { Booking } from "../types/types";

interface CalendarViewProps {
  serviceId: string;
  serviceName: string;
  bookings: Booking[];
  onDaySelect: (date: string) => void;
  selectedDay: string | null;
}

export default function CalendarView({
  serviceId,
  serviceName,
  bookings,
  onDaySelect,
  selectedDay,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get days with appointments for this service
  const daysWithAppointments = new Set<number>();
  bookings.forEach((b) => {
    if (b.service === serviceId) {
      const [y, m, d] = b.date.split("-").map(Number);
      if (y === year && m === month + 1) {
        daysWithAppointments.add(d);
      }
    }
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDateString = (day: number): string => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const monthName = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{serviceName}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-700 min-w-40 text-center">
            {monthName}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) =>
          day ? (
            <button
              key={idx}
              onClick={() => onDaySelect(getDateString(day))}
              className={`aspect-square rounded-lg flex items-center justify-center font-semibold transition relative ${
                selectedDay === getDateString(day)
                  ? "bg-blue-600 text-white shadow-md"
                  : daysWithAppointments.has(day)
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {daysWithAppointments.has(day) && !selectedDay?.endsWith(String(day).padStart(2, "0")) && (
                <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
              )}
              {day}
            </button>
          ) : (
            <div key={idx} className="aspect-square"></div>
          )
        )}
      </div>
    </Card>
  );
}