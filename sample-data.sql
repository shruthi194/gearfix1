-- Sample Data for GearFix Application
-- Run this in your Supabase SQL Editor to populate the database with sample workshops and services

-- Insert sample workshops
INSERT INTO workshops (id, name, description, image, rating, location, phone) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Premium Auto Care', 'Expert automotive service with 20+ years of experience', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop', 4.8, '123 Main Street, Downtown', '+1 (555) 123-4567'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Quick Fix Mechanics', 'Fast and reliable repairs for all vehicle makes', 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&fit=crop', 4.6, '456 Oak Avenue, Westside', '+1 (555) 234-5678'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Elite Motor Works', 'Specialized in luxury and performance vehicles', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop', 4.9, '789 Pine Road, Eastside', '+1 (555) 345-6789'),
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'City Auto Repair', 'Your neighborhood trusted mechanic shop', 'https://images.unsplash.com/photo-1632823469883-e8ff0e1ec1eb?w=800&h=600&fit=crop', 4.7, '321 Elm Street, Northside', '+1 (555) 456-7890');

-- Insert services for Premium Auto Care
INSERT INTO services (workshop_id, name, description, price, duration) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Oil Change', 'Complete oil and filter replacement', 49.99, '30 min'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Brake Service', 'Brake pad replacement and inspection', 199.99, '2 hours'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Tire Rotation', 'Rotate and balance all four tires', 39.99, '45 min'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Engine Diagnostics', 'Complete engine diagnostic scan', 89.99, '1 hour');

-- Insert services for Quick Fix Mechanics
INSERT INTO services (workshop_id, name, description, price, duration) VALUES
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Oil Change', 'Quick oil and filter service', 44.99, '20 min'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Brake Inspection', 'Free brake system check', 0, '15 min'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Battery Replacement', 'Battery testing and replacement', 149.99, '30 min'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'AC Service', 'Air conditioning system check and recharge', 129.99, '1 hour');

-- Insert services for Elite Motor Works
INSERT INTO services (workshop_id, name, description, price, duration) VALUES
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Premium Oil Service', 'Synthetic oil change for luxury vehicles', 99.99, '45 min'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Performance Brake Upgrade', 'High-performance brake system installation', 499.99, '3 hours'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Suspension Tuning', 'Custom suspension setup and alignment', 299.99, '2 hours'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Detailing Package', 'Premium interior and exterior detailing', 249.99, '4 hours');

-- Insert services for City Auto Repair
INSERT INTO services (workshop_id, name, description, price, duration) VALUES
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'General Inspection', 'Complete vehicle health check', 59.99, '45 min'),
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Transmission Service', 'Transmission fluid change and inspection', 179.99, '1.5 hours'),
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Exhaust Repair', 'Muffler and exhaust system repair', 229.99, '2 hours'),
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Wheel Alignment', 'Precision wheel alignment service', 79.99, '1 hour');
