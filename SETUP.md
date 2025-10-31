# GearFix - Supabase Setup Guide

## Connect Your External Supabase Project

To connect your external Supabase project to GearFix, follow these steps:

### 1. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** > **API**
4. Copy your:
   - Project URL
   - Anon/Public Key

### 2. Add Credentials to Your Project

Create a `.env` file in the root of your project (it's gitignored) and add:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Or update the `src/lib/supabase.ts` file directly with your credentials.

### 3. Set Up Your Database

Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Create workshops table
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  rating DECIMAL(2,1),
  location TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (for user data)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Workshops: Public read access
CREATE POLICY "Workshops are viewable by everyone"
  ON workshops FOR SELECT
  USING (true);

-- Services: Public read access
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Appointments: Users can view their own appointments
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = user_id);

-- Appointments: Users can create their own appointments
CREATE POLICY "Users can create own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Appointments: Users can update their own appointments
CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Configure Authentication

1. In your Supabase Dashboard, go to **Authentication** > **URL Configuration**
2. Set the **Site URL** to your app's URL (e.g., `https://yourapp.lovable.app`)
3. Add redirect URLs for local development: `http://localhost:8080`, `http://localhost:8080/`

4. **Disable Email Confirmation (Optional):**
   - Go to **Authentication** > **Providers** > **Email**
   - Toggle OFF "Confirm email"
   - This allows users to sign up without email verification

### 5. Add Sample Data

To enable the booking feature, you need to add workshops and services to your database.

**Option 1: Run the provided SQL file**
1. Open the `sample-data.sql` file in this project
2. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/gtavbbqeiprtrgqwqtlk/sql)
3. Copy and paste the entire contents of `sample-data.sql`
4. Click "Run" to execute

**Option 2: Run this quick SQL**
```sql
-- Insert sample workshops with UUID IDs
INSERT INTO workshops (id, name, description, image, rating, location, phone) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Premium Auto Care', 'Expert automotive service with 20+ years of experience', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop', 4.8, '123 Main Street, Downtown', '+1 (555) 123-4567'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Quick Fix Mechanics', 'Fast and reliable repairs for all vehicle makes', 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&fit=crop', 4.6, '456 Oak Avenue, Westside', '+1 (555) 234-5678');

-- Insert sample services
INSERT INTO services (workshop_id, name, description, price, duration) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Oil Change', 'Complete oil and filter replacement', 49.99, '30 min'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Brake Service', 'Brake pad replacement and inspection', 199.99, '2 hours'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Oil Change', 'Quick oil and filter service', 44.99, '20 min'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Battery Replacement', 'Battery testing and replacement', 149.99, '30 min');
```

After adding the data, refresh your app and the workshops will appear with working booking functionality!

### 6. Start Using Your App

Once configured, your app will:
- Allow users to sign up and log in
- Display real workshops from your database
- Enable booking appointments
- Store user data securely

## Features

✅ User Authentication (Email/Password)  
✅ Workshop Listings  
✅ Service Browsing  
✅ Appointment Booking  
✅ Responsive Design  
✅ Modern UI with Slate Blue & Orange Theme

## Need Help?

Check the [Supabase Documentation](https://supabase.com/docs) for more details on setup and configuration.
