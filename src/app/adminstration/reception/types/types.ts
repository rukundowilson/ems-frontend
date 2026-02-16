export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id: string;
  doctorId?: string;
  doctorName?: string;
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
  completedAt?: Date;
  completedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceWithCount {
  service: Service;
  count: number;
}

export interface DayAppointments {
  date: string;
  appointments: Booking[];
  count: number;
}
