'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type DayInfo = {
  id: number;
  dayName: string;
  date: number;
  isSelected: boolean;
};

type TimeSlot = {
  id: number;
  time: string;
  isAvailable: boolean;
};

// Service information mapping
const serviceInfo: Record<string, { title: string; subtitle: string; description?: string }> = {
  'emergency-care': {
    title: 'Emergency Care',
    subtitle: '24/7 urgent medical assistance',
    description: '24/7 emergency medical services for urgent and life-threatening conditions.',
  },
  'general-surgery': {
    title: 'General Surgery',
    subtitle: 'Expert surgical procedures',
    description: 'Comprehensive surgical procedures including appendectomy, hernia repair, and gallbladder removal.',
  },
  'cardiology': {
    title: 'Cardiology',
    subtitle: 'Heart care specialists',
    description: 'Heart care services including diagnosis and treatment of cardiovascular diseases.',
  },
  'pediatrics': {
    title: 'Pediatrics',
    subtitle: 'Care for your children',
    description: 'Specialized medical care for infants, children, and adolescents.',
  },
  'maternity-obstetrics': {
    title: 'Maternity & Obstetrics',
    subtitle: 'Supporting your pregnancy journey',
    description: 'Prenatal care, delivery services, and postnatal care for mothers and newborns.',
  },
  'radiology-imaging': {
    title: 'Radiology & Imaging',
    subtitle: 'Advanced diagnostic services',
    description: 'X-rays, CT scans, MRI, ultrasound, and other diagnostic imaging services.',
  },
  'laboratory-services': {
    title: 'Laboratory Services',
    subtitle: 'Accurate diagnostic testing',
    description: 'Blood tests, urinalysis, microbiology, and other diagnostic laboratory tests.',
  },
  'orthopedics': {
    title: 'Orthopedics',
    subtitle: 'Bone and joint specialists',
    description: 'Treatment for bone, joint, ligament, tendon, and muscle conditions and injuries.',
  },
  'dental-care': {
    title: 'Dental Care',
    subtitle: 'Complete dental health',
    description: 'General dentistry, tooth extractions, fillings, and oral health services.',
  },
  'physiotherapy': {
    title: 'Physiotherapy',
    subtitle: 'Recovery and rehabilitation',
    description: 'Physical rehabilitation and therapy for injury recovery and mobility improvement.',
  },
  'ophthalmology': {
    title: 'Ophthalmology',
    subtitle: 'Expert eye care services',
    description: 'Eye care services including vision tests, cataract surgery, and eye disease treatment.',
  },
  'ent': {
    title: 'ENT Services',
    subtitle: 'Ear, nose, and throat specialists',
    description: 'Treatment for ear infections, sinus problems, tonsillitis, and hearing issues.',
  },
  'dermatology': {
    title: 'Dermatology',
    subtitle: 'Skin health and treatment',
    description: 'Skin care including treatment for acne, rashes, infections, and skin conditions.',
  },
  'neurology': {
    title: 'Neurology',
    subtitle: 'Brain and nervous system care',
    description: 'Diagnosis and treatment of nervous system disorders including stroke and epilepsy.',
  },
  'psychiatry': {
    title: 'Mental Health',
    subtitle: 'Support for your wellbeing',
    description: 'Mental health services including counseling and treatment for depression and anxiety.',
  },
  'pharmacy': {
    title: 'Pharmacy',
    subtitle: 'Medication and pharmaceutical care',
    description: 'In-house pharmacy providing prescribed medications and pharmaceutical care.',
  },
  'dialysis': {
    title: 'Dialysis',
    subtitle: 'Kidney care services',
    description: 'Kidney dialysis services for patients with chronic kidney disease.',
  },
  'oncology': {
    title: 'Cancer Care',
    subtitle: 'Comprehensive oncology treatment',
    description: 'Cancer screening, diagnosis, chemotherapy, and supportive cancer treatment.',
  },
  'icu': {
    title: 'Intensive Care',
    subtitle: 'Critical care services',
    description: 'Critical care for seriously ill patients requiring constant monitoring.',
  },
  'nutrition-dietetics': {
    title: 'Nutrition',
    subtitle: 'Dietary counseling and planning',
    description: 'Nutritional counseling and diet planning for various health conditions.',
  },
  'vaccination': {
    title: 'Vaccination',
    subtitle: 'Immunization services',
    description: 'Immunization programs for children and adults including flu shots and travel vaccines.',
  },
  'blood-bank': {
    title: 'Blood Bank',
    subtitle: 'Blood donation and transfusion',
    description: 'Blood donation, storage, and transfusion services.',
  },
  'ambulance': {
    title: 'Ambulance',
    subtitle: 'Emergency medical transport',
    description: 'Emergency medical transportation with trained paramedics.',
  },
  'health-screening': {
    title: 'Health Screening',
    subtitle: 'Preventive health check-ups',
    description: 'Comprehensive health check-ups and preventive screening programs.',
  },
};

export default function ServiceBookingPage() {
  const params = useParams();
  const serviceSlug = params.service as string;
  const service = serviceInfo[serviceSlug] || { 
    title: serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
    subtitle: 'Book your appointment',
    description: 'Professional medical services tailored to your needs.'
  };

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

  const timeSlotsByDay: Record<number, TimeSlot[]> = {
    0: [
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
    1: [
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
    2: [
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
    3: [
      { id: 1, time: '11:00 AM', isAvailable: true },
      { id: 2, time: '11:30 AM', isAvailable: true },
      { id: 3, time: '12:00 PM', isAvailable: true },
      { id: 4, time: '12:30 PM', isAvailable: true },
      { id: 5, time: '01:00 PM', isAvailable: true },
      { id: 6, time: '01:30 PM', isAvailable: true },
      { id: 7, time: '02:00 PM', isAvailable: true },
      { id: 8, time: '02:30 PM', isAvailable: true },
    ],
    4: [
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
    5: [
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
    6: [
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

  const currentTimeSlots = timeSlotsByDay[selectedDay] || [];

  const handleDaySelect = (dayId: number) => {
    setSelectedDay(dayId);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Service Info */}
      <div className="lg:w-2/5 bg-gradient-to-br from-purple-600 to-purple-800 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg p-10 max-w-md w-full shadow-xl">
          {/* Back button */}
          <Link 
            href="/services"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{service.title}</h1>
          <p className="text-xl text-gray-700 mb-4">{service.subtitle}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
        </div>
      </div>

      {/* Right Panel - Booking Interface */}
      <div className="lg:w-3/5 bg-gray-50 p-8 overflow-y-auto flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl w-full">
          <h2 className="text-purple-600 text-sm font-bold tracking-widest mb-2">
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
                    ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-600'
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
          <h3 className="text-purple-600 text-sm font-bold tracking-widest mb-4">
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
                      ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white border-purple-600'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-purple-600'
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <div className="col-span-5 flex items-center justify-center text-gray-500">
                No available time slots for this day
              </div>
            )}
          </div>
              {/* Book Button */}
              <button
                className="w-full bg-gradient-to-br from-purple-600 to-purple-800 text-white py-4 rounded-lg font-bold text-lg tracking-wide hover:opacity-90 transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedTime}
                onClick={() => {
                  if (!selectedTime) return;

                  const newAppointment = {
                    id: Date.now(),
                    service: service.title,
                    date: `${days[selectedDay].dayName} ${days[selectedDay].date}`,
                    time: selectedTime,
                    status: 'Pending'
                  };

                  const existingAppointments = JSON.parse(
                    localStorage.getItem('appointments') || '[]'
                  );

                  existingAppointments.push(newAppointment);

                  localStorage.setItem(
                    'appointments',
                    JSON.stringify(existingAppointments)
                  );

                  window.location.href = '/dashboard';
                }}
              >
                BOOK YOUR SLOT
              </button>

        </div>
      </div>
    </div>
  );
}