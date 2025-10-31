export interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  phone: string;
}

export interface Service {
  id: string;
  workshop_id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  workshop_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}
