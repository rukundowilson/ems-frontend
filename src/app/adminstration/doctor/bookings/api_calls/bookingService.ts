import api from '@/app/shared/services/axios';
import { Booking, Service, ServiceMap, ApiResponse, BookingStatusUpdate } from '../types/booking.types';

export async function fetchDoctorServices(doctorId: string): Promise<any[]> {
  try {
    const svcRes = await api.get(`/doctors/${doctorId}/services`);
    const svcData = svcRes.data;
    return Array.isArray(svcData.data) ? svcData.data : [];
  } catch (err) {
    console.error('Error fetching doctor services:', err);
    throw err;
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  try {
    const res = await api.get('/bookings');
    const list = res.data.data || [];
    return list.map((b: any) => ({ ...b }));
  } catch (err) {
    console.error('Error fetching bookings:', err);
    throw err;
  }
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const servicesRes = await api.get('/services');
    return servicesRes.data.data || [];
  } catch (err) {
    console.error('Error fetching services:', err);
    throw err;
  }
}

export function buildServiceMap(services: Service[]): ServiceMap {
  const map: ServiceMap = {};
  services.forEach((s: Service) => {
    if (s._id) map[String(s._id)] = s.title;
    if (s.id) map[String(s.id)] = s.title;
  });
  return map;
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatusUpdate['status'],
  doctorId?: string,
  notes?: string,
  rating?: number
): Promise<ApiResponse<Booking>> {
  try {
    console.log('Attempting to update booking:', { bookingId, newStatus, doctorId });
    const payload: any = { status: newStatus };
    
    // Include doctor info when marking as completed
    if (newStatus === 'completed' && doctorId) {
      payload.doctorId = doctorId;
      if (notes) payload.notes = notes;
      if (rating) payload.rating = rating;
    }
    
    const res = await api.patch(`/bookings/${bookingId}`, payload);
    console.log('Backend response:', res.data);
    return res.data;
  } catch (err: any) {
    console.error('Error updating booking status:', err);
    console.error('Request URL:', err.config?.url);
    console.error('Response status:', err.response?.status);
    console.error('Response data:', err.response?.data);
    throw err;
  }
}

export async function refetchBookingsAfterError(
  bookingId: string,
  expectedStatus: BookingStatusUpdate['status']
): Promise<Booking | null> {
  try {
    const refreshRes = await api.get('/bookings');
    const list = refreshRes.data.data || [];
    const updated = list.find((b: any) => String(b._id) === String(bookingId));
    
    if (updated && updated.status === expectedStatus) {
      console.log('Update did succeed - status is now', expectedStatus);
      return updated;
    }
    return null;
  } catch (e) {
    console.error('Refresh failed:', e);
    return null;
  }
}

export async function fetchDoctorCompletions(doctorId: string) {
  try {
    const res = await api.get(`/bookings/completions/doctor/${doctorId}`);
    return res.data.data || [];
  } catch (err) {
    console.error('Error fetching doctor completions:', err);
    return [];
  }
}
