'use client';

import { useState } from 'react';
import type { DayInfo, TimeSlot } from '../shared/types/types';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days: DayInfo[] = [
    { id: 0, dayName: 'THU', date: 5, isSelected: true },
    { id: 1, dayName: 'FRI', date: 6, isSelected: false },
    { id: 2, dayName: 'SAT', date: 7, isSelected: false },
    { id: 3, dayName: 'SUN', date: 8, isSelected: false },
    { id: 4, dayName: 'MON', date: 9, isSelected: false },
    { id: 5, dayName: 'TUE', date: 10, isSelected: false },
    { id: 6, dayName: 'WED', date: 11, isSelected: false },
  ];

  // Different time slots for each day
  const timeSlotsByDay: Record<number, TimeSlot[]> = {
    0: [ // Thursday
      { id: 1, time: '12:00 PM', isAvailable: true },
      { id: 2, time: '12:30 PM', isAvailable: true },
      { id: 3, time: '01:00 PM', isAvailable: true },
      { id: 4, time: '01:30 PM', isAvailable: true },
      { id: 5, time: '02:00 PM', isAvailable: true },
      { id: 6, time: '02:30 PM', isAvailable: true },
      { id: 7, time: '03:00 PM', isAvailable: true },
      { id: 8, time: '03:30 PM', isAvailable: true },
      { id: 9, time: '04:00 PM', isAvailable: true },
      { id: 10, time: '04:30 PM', isAvailable: true },
      { id: 11, time: '05:00 PM', isAvailable: true },
      { id: 12, time: '05:30 PM', isAvailable: true },
      { id: 13, time: '06:00 PM', isAvailable: true },
      { id: 14, time: '06:30 PM', isAvailable: true },
      { id: 15, time: '07:00 PM', isAvailable: true },
      { id: 16, time: '07:30 PM', isAvailable: true },
      { id: 17, time: '08:00 PM', isAvailable: true },
      { id: 18, time: '08:30 PM', isAvailable: true },
    ],
    1: [ // Friday
      { id: 1, time: '09:00 AM', isAvailable: true },
      { id: 2, time: '09:30 AM', isAvailable: true },
      { id: 3, time: '10:00 AM', isAvailable: true },
      { id: 4, time: '10:30 AM', isAvailable: true },
      { id: 5, time: '11:00 AM', isAvailable: true },
      { id: 6, time: '11:30 AM', isAvailable: true },
      { id: 7, time: '01:00 PM', isAvailable: true },
      { id: 8, time: '01:30 PM', isAvailable: true },
      { id: 9, time: '02:00 PM', isAvailable: true },
      { id: 10, time: '02:30 PM', isAvailable: true },
      { id: 11, time: '03:00 PM', isAvailable: true },
      { id: 12, time: '03:30 PM', isAvailable: true },
      { id: 13, time: '04:00 PM', isAvailable: true },
      { id: 14, time: '04:30 PM', isAvailable: true },
    ],
    2: [ // Saturday
      { id: 1, time: '10:00 AM', isAvailable: true },
      { id: 2, time: '10:30 AM', isAvailable: true },
      { id: 3, time: '11:00 AM', isAvailable: true },
      { id: 4, time: '11:30 AM', isAvailable: true },
      { id: 5, time: '12:00 PM', isAvailable: true },
      { id: 6, time: '12:30 PM', isAvailable: true },
      { id: 7, time: '01:00 PM', isAvailable: true },
      { id: 8, time: '01:30 PM', isAvailable: true },
      { id: 9, time: '02:00 PM', isAvailable: true },
      { id: 10, time: '02:30 PM', isAvailable: true },
    ],
    3: [ // Sunday
      { id: 1, time: '11:00 AM', isAvailable: true },
      { id: 2, time: '11:30 AM', isAvailable: true },
      { id: 3, time: '12:00 PM', isAvailable: true },
      { id: 4, time: '12:30 PM', isAvailable: true },
      { id: 5, time: '01:00 PM', isAvailable: true },
      { id: 6, time: '01:30 PM', isAvailable: true },
      { id: 7, time: '02:00 PM', isAvailable: true },
      { id: 8, time: '02:30 PM', isAvailable: true },
    ],
    4: [ // Monday
      { id: 1, time: '08:00 AM', isAvailable: true },
      { id: 2, time: '08:30 AM', isAvailable: true },
      { id: 3, time: '09:00 AM', isAvailable: true },
      { id: 4, time: '09:30 AM', isAvailable: true },
      { id: 5, time: '10:00 AM', isAvailable: true },
      { id: 6, time: '10:30 AM', isAvailable: true },
      { id: 7, time: '11:00 AM', isAvailable: true },
      { id: 8, time: '11:30 AM', isAvailable: true },
      { id: 9, time: '02:00 PM', isAvailable: true },
      { id: 10, time: '02:30 PM', isAvailable: true },
      { id: 11, time: '03:00 PM', isAvailable: true },
      { id: 12, time: '03:30 PM', isAvailable: true },
      { id: 13, time: '04:00 PM', isAvailable: true },
      { id: 14, time: '04:30 PM', isAvailable: true },
      { id: 15, time: '05:00 PM', isAvailable: true },
      { id: 16, time: '05:30 PM', isAvailable: true },
    ],
    5: [ // Tuesday
      { id: 1, time: '09:00 AM', isAvailable: true },
      { id: 2, time: '09:30 AM', isAvailable: true },
      { id: 3, time: '10:00 AM', isAvailable: true },
      { id: 4, time: '10:30 AM', isAvailable: true },
      { id: 5, time: '11:00 AM', isAvailable: true },
      { id: 6, time: '03:00 PM', isAvailable: true },
      { id: 7, time: '03:30 PM', isAvailable: true },
      { id: 8, time: '04:00 PM', isAvailable: true },
      { id: 9, time: '04:30 PM', isAvailable: true },
      { id: 10, time: '05:00 PM', isAvailable: true },
      { id: 11, time: '05:30 PM', isAvailable: true },
      { id: 12, time: '06:00 PM', isAvailable: true },
    ],
    6: [ // Wednesday
      { id: 1, time: '12:00 PM', isAvailable: true },
      { id: 2, time: '12:30 PM', isAvailable: true },
      { id: 3, time: '01:00 PM', isAvailable: true },
      { id: 4, time: '01:30 PM', isAvailable: true },
      { id: 5, time: '02:00 PM', isAvailable: true },
      { id: 6, time: '02:30 PM', isAvailable: true },
      { id: 7, time: '03:00 PM', isAvailable: true },
      { id: 8, time: '03:30 PM', isAvailable: true },
      { id: 9, time: '04:00 PM', isAvailable: true },
      { id: 10, time: '04:30 PM', isAvailable: true },
      { id: 11, time: '05:00 PM', isAvailable: true },
      { id: 12, time: '05:30 PM', isAvailable: true },
      { id: 13, time: '06:00 PM', isAvailable: true },
      { id: 14, time: '06:30 PM', isAvailable: true },
      { id: 15, time: '07:00 PM', isAvailable: true },
    ],
  };

  // Get time slots for the selected day
  const currentTimeSlots = timeSlotsByDay[selectedDay] || [];

  // Handle day selection - clear selected time when day changes
  const handleDaySelect = (dayId: number) => {
    setSelectedDay(dayId);
    setSelectedTime(null); // Reset time selection when changing days
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Disease Info */}
      <div className="lg:w-2/5 bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg p-10 max-w-md w-full shadow-xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Acne</h1>
          <p className="text-xl text-gray-700">Clearer skin starts today</p>
        </div>
      </div>

      {/* Right Panel - Booking Interface */}
      <div className="lg:w-3/5 bg-gray-50 p-8 overflow-y-auto flex items-center justify-center">
        {/* Booking Slots Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl w-full">
          <h2 className="text-purple-gradient-start text-sm font-bold tracking-widest mb-2">
            BOOKING SLOTS
          </h2>
          <p className="text-lg text-gray-900 mb-6">
            Choose a day and time that works for you.
          </p>

          {/* Day Selector */}
          <div className="grid grid-cols-7 gap-3 mb-8">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => handleDaySelect(day.id)}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedDay === day.id
                    ? 'bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-gradient-start'
                }`}
              >
                <div className="text-xs font-semibold tracking-wider mb-1">
                  {day.dayName}
                </div>
                <div className="text-2xl font-bold">{day.date}</div>
              </button>
            ))}
          </div>

          {/* Available Times */}
          <h3 className="text-purple-gradient-start text-sm font-bold tracking-widest mb-4">
            AVAILABLE TIMES
          </h3>
          <div className="grid grid-cols-5 gap-3 mb-8 min-h-[200px]">
            {currentTimeSlots.length > 0 ? (
              currentTimeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-3 rounded border-2 text-sm font-medium tracking-wide transition-all ${
                    selectedTime === slot.time
                      ? 'bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end text-white border-purple-gradient-start'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-purple-gradient-start'
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <div className="col-span-5 flex items-center justify-center text-gray-text">
                No available time slots for this day
              </div>
            )}
          </div>

          {/* Book Button */}
          <button
            className="w-full bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end text-white py-4 rounded-lg font-bold text-lg tracking-wide hover:opacity-90 transition-opacity shadow-md"
            onClick={() => {
              if (selectedTime) {
                alert(`Booking slot for ${days[selectedDay].dayName} ${days[selectedDay].date} at ${selectedTime}`);
              } else {
                alert('Please select a time slot');
              }
            }}
          >
            BOOK YOUR SLOT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
