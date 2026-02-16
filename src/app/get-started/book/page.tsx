'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import api from '@/app/shared/services/axios';

interface TimeSlot {
  id: string;
  time: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface DayInfo {
  id: number;
  dayName: string;
  date: number;
  dateString: string; // YYYY-MM-DD
  isSelected: boolean;
}

interface AvailabilitySlot {
  _id: string;
  doctorId: string;
  date: string;
  start: string;
  end: string;
}

const CalendarContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get('service');

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [days, setDays] = useState<DayInfo[]>([]);
  const [timeSlotsByDay, setTimeSlotsByDay] = useState<Record<number, TimeSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{ _id: string; title: string } | null>(null);

  // Restore any pending booking context (no login required)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCheckedAuth(true);

    const bookingContext = localStorage.getItem('booking_context');
    if (bookingContext) {
      try {
        const context = JSON.parse(bookingContext);
        if (context.selectedDay !== undefined) setSelectedDay(context.selectedDay);
        if (context.selectedTime) setSelectedTime(context.selectedTime);
        localStorage.removeItem('booking_context');
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Fetch service details by ID
  useEffect(() => {
    if (!serviceId) return;

    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setSelectedService(response.data.data);
      } catch (err) {
        console.error('Error fetching service:', err);
      }
    };

    fetchService();
  }, [serviceId]);

  // Save booking context when selections change
  const saveBookingContext = () => {
    const context = {
      selectedDay,
      selectedTime,
      service: serviceId,
    };
    localStorage.setItem('booking_context', JSON.stringify(context));
  };

  // Generate next 7 days from today
  const generateDays = (): DayInfo[] => {
    const today = new Date();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

      return {
        id: i,
        dayName: dayNames[date.getDay()],
        date: date.getDate(),
        dateString,
        isSelected: i === 0,
      };
    });
  };

  // Convert 24h time to 12h format with AM/PM
  const convertTo12Hour = (time: string): string => {
    if (!time) return time;
    const [hour, min] = time.split(':');
    const h = parseInt(hour);
    const meridiem = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${min} ${meridiem}`;
  };

  // Fetch availability slots for selected service
  useEffect(() => {
    const generatedDays = generateDays();
    setDays(generatedDays);
    setLoading(true);

    (async () => {
      try {
        // Fetch availability slots for the selected service
        const serviceParam = serviceId ? `?service=${encodeURIComponent(serviceId)}` : '';
        const res = await api.get(`/availability${serviceParam}`);
        const allSlots = res.data.data || [];
        console.debug('availability slots fetched:', allSlots.length, allSlots.slice(0,5));

        // Group slots by date
        const byDay: Record<number, TimeSlot[]> = {};

        generatedDays.forEach((day, idx) => {
          // Find slots for this date
          const daySlots = allSlots.filter(
            (slot: AvailabilitySlot) =>
              slot.date === day.dateString
          );

          // Convert to TimeSlot format and display as "start-end"
          const timeSlots: TimeSlot[] = daySlots.map((slot: AvailabilitySlot, i: number) => {
            const displayStartTime = convertTo12Hour(slot.start);
            const displayEndTime = convertTo12Hour(slot.end);
            const displayRange = `${displayStartTime} - ${displayEndTime}`;

            return {
              id: `${slot._id}`,
              time: displayRange,
              startTime: slot.start,
              endTime: slot.end,
              isAvailable: true,
            };
          });

          byDay[idx] = timeSlots;
        });

        setTimeSlotsByDay(byDay);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Failed to load available slots');
        setLoading(false);
      }
    })();
  }, [serviceId]);

  // Get time slots for the selected day
  const currentTimeSlots = timeSlotsByDay[selectedDay] || [];

  // Handle day selection - clear selected time when day changes
  const handleDaySelect = (dayId: number) => {
    setSelectedDay(dayId);
    setSelectedTime(null);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedTime) {
      setBookingError('Please select a time slot');
      return;
    }

    // Store booking data and redirect to confirmation
    const selectedSlot = currentTimeSlots.find(slot => slot.time === selectedTime);
    const bookingData = {
      serviceId: serviceId,
      serviceName: selectedService?.title || 'Service',
      date: days[selectedDay].dateString,
      time: selectedTime,
      startTime: selectedSlot?.startTime,
      endTime: selectedSlot?.endTime,
      dayName: days[selectedDay].dayName,
      dayDate: days[selectedDay].date,
    };

    localStorage.setItem('pending_booking', JSON.stringify(bookingData));
    router.push('/get-started/booking-confirmation');
  };

  if (!checkedAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading available slots...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-600 mb-2">Error</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Panel - Disease Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedService?.title || 'Service'}</h2>
          <p className="text-gray-600 text-lg">Book your appointment today</p>
        </div>

        {/* Right Panel - Booking Interface */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Booking Slots Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-blue-600 mb-2">BOOKING SLOTS</h3>
            <p className="text-gray-600">Choose a day and time that works for you.</p>
          </div>

          {/* Day Selector */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => handleDaySelect(day.id)}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${
                  selectedDay === day.id
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-blue-300'
                }`}
              >
                <div className="text-xs font-semibold mb-1">{day.dayName}</div>
                <div className="text-xl font-bold">{day.date}</div>
              </button>
            ))}
          </div>

          {/* Available Times */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-blue-600 mb-4">AVAILABLE TIMES</h3>
            {currentTimeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {currentTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSelect(slot.time)}
                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-600 shadow-md'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-blue-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No available time slots for this day
              </div>
            )}
          </div>

          {/* Error Message */}
          {bookingError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{bookingError}</p>
            </div>
          )}

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedTime}
            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg text-white ${
              !selectedTime
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
            }`}
          >
            BOOK YOUR SLOT
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Calendar() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CalendarContent />
    </Suspense>
  );
}