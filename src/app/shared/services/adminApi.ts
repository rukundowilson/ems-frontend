import api from './axios';

export const adminApi = {
  getPatients: () => api.get('/admin/patients'),
  getDoctors: () => api.get('/admin/doctors'),
  getServices: () => api.get('/admin/services'),
  getBookings: () => api.get('/admin/bookings'),
  createDoctor: (data: any) => api.post('/admin/doctors', data),
  updateDoctor: (id: string, data: any) => api.patch(`/admin/doctors/${id}`, data),
  deleteDoctor: (id: string) => api.delete(`/admin/doctors/${id}`),
  createPatient: (data: any) => api.post('/auth/signup', data),
  updatePatient: (id: string, data: any) => api.patch(`/admin/patients/${id}`, data),
  deletePatient: (id: string) => api.delete(`/admin/patients/${id}`),
};
