import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtavbbqeiprtrgqwqtlk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0YXZiYnFlaXBydHJncXdxdGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwOTAwNzMsImV4cCI6MjA3NTY2NjA3M30.4L6cTKCxHdvojkkGXKrULkbVjVG5UP7mVXfYjcXzw6U';

const supabase = createClient(supabaseUrl, supabaseKey);

const workshops = [
  {
    id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    name: 'Premium Auto Care',
    description: 'Expert automotive service with 20+ years of experience',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
    rating: 4.8,
    location: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
    name: 'Quick Fix Mechanics',
    description: 'Fast and reliable repairs for all vehicle makes',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&fit=crop',
    rating: 4.6,
    location: '456 Oak Avenue, Westside',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
    name: 'Elite Motor Works',
    description: 'Specialized in luxury and performance vehicles',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop',
    rating: 4.9,
    location: '789 Pine Road, Eastside',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a',
    name: 'City Auto Repair',
    description: 'Your neighborhood trusted mechanic shop',
    image: 'https://images.unsplash.com/photo-1632823469883-e8ff0e1ec1eb?w=800&h=600&fit=crop',
    rating: 4.7,
    location: '321 Elm Street, Northside',
    phone: '+1 (555) 456-7890'
  }
];

const services = [
  // Premium Auto Care services
  { workshop_id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', name: 'Oil Change', description: 'Complete oil and filter replacement', price: 49.99, duration: '30 min' },
  { workshop_id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', name: 'Brake Service', description: 'Brake pad replacement and inspection', price: 199.99, duration: '2 hours' },
  { workshop_id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', name: 'Tire Rotation', description: 'Rotate and balance all four tires', price: 39.99, duration: '45 min' },
  { workshop_id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', name: 'Engine Diagnostics', description: 'Complete engine diagnostic scan', price: 89.99, duration: '1 hour' },
  
  // Quick Fix Mechanics services
  { workshop_id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', name: 'Oil Change', description: 'Quick oil and filter service', price: 44.99, duration: '20 min' },
  { workshop_id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', name: 'Brake Inspection', description: 'Free brake system check', price: 0, duration: '15 min' },
  { workshop_id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', name: 'Battery Replacement', description: 'Battery testing and replacement', price: 149.99, duration: '30 min' },
  { workshop_id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', name: 'AC Service', description: 'Air conditioning system check and recharge', price: 129.99, duration: '1 hour' },
  
  // Elite Motor Works services
  { workshop_id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', name: 'Premium Oil Service', description: 'Synthetic oil change for luxury vehicles', price: 99.99, duration: '45 min' },
  { workshop_id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', name: 'Performance Brake Upgrade', description: 'High-performance brake system installation', price: 499.99, duration: '3 hours' },
  { workshop_id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', name: 'Suspension Tuning', description: 'Custom suspension setup and alignment', price: 299.99, duration: '2 hours' },
  { workshop_id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', name: 'Detailing Package', description: 'Premium interior and exterior detailing', price: 249.99, duration: '4 hours' },
  
  // City Auto Repair services
  { workshop_id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', name: 'General Inspection', description: 'Complete vehicle health check', price: 59.99, duration: '45 min' },
  { workshop_id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', name: 'Transmission Service', description: 'Transmission fluid change and inspection', price: 179.99, duration: '1.5 hours' },
  { workshop_id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', name: 'Exhaust Repair', description: 'Muffler and exhaust system repair', price: 229.99, duration: '2 hours' },
  { workshop_id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', name: 'Wheel Alignment', description: 'Precision wheel alignment service', price: 79.99, duration: '1 hour' }
];

async function insertData() {
  console.log('Inserting workshops...');
  const { data: workshopsData, error: workshopsError } = await supabase
    .from('workshops')
    .insert(workshops);
  
  if (workshopsError) {
    console.error('Error inserting workshops:', workshopsError);
  } else {
    console.log('✓ Workshops inserted successfully!');
  }

  console.log('Inserting services...');
  const { data: servicesData, error: servicesError } = await supabase
    .from('services')
    .insert(services);
  
  if (servicesError) {
    console.error('Error inserting services:', servicesError);
  } else {
    console.log('✓ Services inserted successfully!');
  }

  console.log('\nDone! Sample data has been added to your database.');
}

insertData();
