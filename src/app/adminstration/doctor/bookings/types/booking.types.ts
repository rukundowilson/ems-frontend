export interface Booking {
  _id: string;
  doctorId?: string;
  patientId?: string;
  service: string;
  date: string;
  time: string;
  patientEmail?: string;
  patientName?: string;
  patientPhone?: string;
  paymentMethod?: string;
  amount?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Service {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  name?: string;
  description?: string;
  price?: number;
}

export interface ServiceMap {
  [key: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingStatusUpdate {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CompletionLog {
  _id?: string;
  bookingId: string;
  doctorId: string;
  patientId?: string;
  service: string;
  appointmentDate: string;
  completedAt: string;
  notes?: string;
  rating?: number;
}
