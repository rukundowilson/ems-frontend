'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';

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
  const serviceSlug = searchParams.get('service');
  const doctorId = searchParams.get('doctorId') || 'doctor-1';

  const [checkedAuth, setCheckedAuth] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [days, setDays] = useState<DayInfo[]>([]);
  const [timeSlotsByDay, setTimeSlotsByDay] = useState<Record<number, TimeSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Service mapping for display
  const serviceMap: Record<string, string> = {
    'emergency-care': 'Emergency Care',
    'general-surgery': 'General Surgery',
    'cardiology': 'Cardiology',
    'pediatrics': 'Pediatrics',
    'maternity-obstetrics': 'Maternity & Obstetrics',
    'radiology-imaging': 'Radiology & Imaging',
    'laboratory-services': 'Laboratory Services',
    'orthopedics': 'Orthopedics',
    'dental-care': 'Dental Care',
    'physiotherapy': 'Physiotherapy',
  };

  const selectedService = serviceSlug ? serviceMap[serviceSlug] || serviceSlug : 'Service';

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

  // Save booking context when selections change
  const saveBookingContext = () => {
    const context = {
      selectedDay,
      selectedTime,
      service: serviceSlug,
      doctorId,
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

  // Convert full time range to display format
  const parseTimeSlots = (start: string, end: string): TimeSlot[] => {
    const displayStart = formatTime(start);
    const displayEnd = formatTime(end);
    const displayTime = `${displayStart} - ${displayEnd}`;
    
    return [{
      id: `${start}-${end}`,
      time: displayTime,
      startTime: start,
      endTime: end,
      isAvailable: true,
    }];
  };

  // Convert 24h to 12h format
  const formatTime = (time: string): string => {
    const [hour, min] = time.split(':').map(Number);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${String(min).padStart(2, '0')} ${meridiem}`;
  };

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        const generatedDays = generateDays();
        setDays(generatedDays);

        // Fetch all doctor availability
        const response = await fetch(
          `http://localhost:4000/api/availability?doctorId=${doctorId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch availability');
        }

        const data = await response.json();
        const slots: AvailabilitySlot[] = data.data || [];

        console.log('Fetched slots:', slots);
        console.log('Generated days:', generatedDays);

        // Build time slots by day
        const byDay: Record<number, TimeSlot[]> = {};

        generatedDays.forEach((day, idx) => {
          const daySlots = slots.filter((slot) => slot.date === day.dateString);
          console.log(`Day ${day.dayName} (${day.dateString}): Found ${daySlots.length} slots`, daySlots);

          if (daySlots.length > 0) {
            const timeSlots: TimeSlot[] = [];
            daySlots.forEach((slot) => {
              timeSlots.push(...parseTimeSlots(slot.start, slot.end));
            });
            byDay[idx] = timeSlots;
          } else {
            byDay[idx] = [];
          }
        });

        console.log('Final timeSlotsByDay:', byDay);
        setTimeSlotsByDay(byDay);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [doctorId]);

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
      doctorId,
      service: selectedService,
      serviceSlug: serviceSlug,
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedService}</h2>
          <p className="text-gray-600 text-lg">Book your appointment today</p>
        </div>

        {/* Right Panel - Booking Interface */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Booking Slots Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-purple-600 mb-2">BOOKING SLOTS</h3>
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
                    ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-300'
                }`}
              >
                <div className="text-xs font-semibold mb-1">{day.dayName}</div>
                <div className="text-xl font-bold">{day.date}</div>
              </button>
            ))}
          </div>

          {/* Available Times */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-purple-600 mb-4">AVAILABLE TIMES</h3>
            {currentTimeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {currentTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSelect(slot.time)}
                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white border-purple-600 shadow-md'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-purple-300'
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
                : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
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