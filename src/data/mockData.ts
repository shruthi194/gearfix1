import { Workshop, Service } from '@/types';

export const mockWorkshops: Workshop[] = [
  {
    id: '1',
    name: 'Premium Auto Care',
    description: 'Expert automotive service with 20+ years of experience',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
    rating: 4.8,
    location: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Quick Fix Mechanics',
    description: 'Fast and reliable repairs for all vehicle makes',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&fit=crop',
    rating: 4.6,
    location: '456 Oak Avenue, Westside',
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Elite Motor Works',
    description: 'Specialized in luxury and performance vehicles',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop',
    rating: 4.9,
    location: '789 Pine Road, Eastside',
    phone: '+1 (555) 345-6789'
  },
  {
    id: '4',
    name: 'City Auto Repair',
    description: 'Your neighborhood trusted mechanic shop',
    image: 'https://images.unsplash.com/photo-1632823469883-e8ff0e1ec1eb?w=800&h=600&fit=crop',
    rating: 4.7,
    location: '321 Elm Street, Northside',
    phone: '+1 (555) 456-7890'
  }
];

export const mockServices: Service[] = [
  // Premium Auto Care services
  { id: 's1', workshop_id: '1', name: 'Oil Change', description: 'Complete oil and filter replacement', price: 49.99, duration: '30 min' },
  { id: 's2', workshop_id: '1', name: 'Brake Service', description: 'Brake pad replacement and inspection', price: 199.99, duration: '2 hours' },
  { id: 's3', workshop_id: '1', name: 'Tire Rotation', description: 'Rotate and balance all four tires', price: 39.99, duration: '45 min' },
  { id: 's4', workshop_id: '1', name: 'Engine Diagnostics', description: 'Complete engine diagnostic scan', price: 89.99, duration: '1 hour' },
  
  // Quick Fix Mechanics services
  { id: 's5', workshop_id: '2', name: 'Oil Change', description: 'Quick oil and filter service', price: 44.99, duration: '20 min' },
  { id: 's6', workshop_id: '2', name: 'Brake Inspection', description: 'Free brake system check', price: 0, duration: '15 min' },
  { id: 's7', workshop_id: '2', name: 'Battery Replacement', description: 'Battery testing and replacement', price: 149.99, duration: '30 min' },
  { id: 's8', workshop_id: '2', name: 'AC Service', description: 'Air conditioning system check and recharge', price: 129.99, duration: '1 hour' },
  
  // Elite Motor Works services
  { id: 's9', workshop_id: '3', name: 'Premium Oil Service', description: 'Synthetic oil change for luxury vehicles', price: 99.99, duration: '45 min' },
  { id: 's10', workshop_id: '3', name: 'Performance Brake Upgrade', description: 'High-performance brake system installation', price: 499.99, duration: '3 hours' },
  { id: 's11', workshop_id: '3', name: 'Suspension Tuning', description: 'Custom suspension setup and alignment', price: 299.99, duration: '2 hours' },
  { id: 's12', workshop_id: '3', name: 'Detailing Package', description: 'Premium interior and exterior detailing', price: 249.99, duration: '4 hours' },
  
  // City Auto Repair services
  { id: 's13', workshop_id: '4', name: 'General Inspection', description: 'Complete vehicle health check', price: 59.99, duration: '45 min' },
  { id: 's14', workshop_id: '4', name: 'Transmission Service', description: 'Transmission fluid change and inspection', price: 179.99, duration: '1.5 hours' },
  { id: 's15', workshop_id: '4', name: 'Exhaust Repair', description: 'Muffler and exhaust system repair', price: 229.99, duration: '2 hours' },
  { id: 's16', workshop_id: '4', name: 'Wheel Alignment', description: 'Precision wheel alignment service', price: 79.99, duration: '1 hour' },
];
