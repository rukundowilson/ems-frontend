import api from "@/app/shared/services/axios";
import type { Service, Booking } from "../types/types";

export async function getAllServices(): Promise<Service[]> {
  try {
    const res = await api.get('/services');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const res = await api.get('/bookings');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return [];
  }
}

export function countAppointmentsByServiceAndDate(
  bookings: Booking[],
  service: string,
  date?: string
): number {
  return bookings.filter(
    (b) => b.service === service && (!date || b.date === date)
  ).length;
}

export function getAppointmentsByServiceAndDate(
  bookings: Booking[],
  service: string,
  date: string
): Booking[] {
  return bookings
    .filter((b) => b.service === service && b.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function getDaysWithAppointmentsForService(
  bookings: Booking[],
  service: string,
  targetDate: Date
): string[] {
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');

  const daysSet = new Set<string>();
  bookings.forEach((b) => {
    if (b.service === service && b.date.startsWith(`${year}-${month}`)) {
      daysSet.add(b.date);
    }
  });

  return Array.from(daysSet).sort();
}