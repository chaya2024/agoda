/*
  # Create Events and Departments Tables

  ## Overview
  This migration creates the core tables for the student union website:
  - Events table for upcoming activities and announcements
  - Departments table for organizational structure information

  ## New Tables

  ### `events`
  Stores information about upcoming events and activities
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Event title
  - `description` (text) - Detailed description
  - `event_date` (timestamptz) - When the event occurs
  - `location` (text, optional) - Where the event takes place
  - `image_url` (text, optional) - Event image
  - `is_featured` (boolean) - Whether to highlight this event
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `departments`
  Stores information about student union departments
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Department name
  - `description` (text) - Department description
  - `contact_email` (text, optional) - Contact email
  - `contact_phone` (text, optional) - Contact phone
  - `icon` (text, optional) - Icon identifier for UI
  - `display_order` (integer) - Order for displaying departments
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on both tables
  - Public read access for all users (these are informational tables)
  - Authenticated users with admin role can modify (for future admin panel)
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text,
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  contact_email text,
  contact_phone text,
  icon text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Public read access for events
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Public read access for departments
CREATE POLICY "Anyone can view departments"
  ON departments
  FOR SELECT
  TO public
  USING (true);

-- Insert sample events
INSERT INTO events (title, description, event_date, location, is_featured) VALUES
  ('יום פעילות חורף 2025', 'יום פעילות מלא בהפתעות, אטרקציות ופעילויות מגוונות לכל הסטודנטים', '2025-01-15 10:00:00+02', 'קמפוס הראשי', true),
  ('הרצאה: זכויות סטודנטים', 'הרצאה מקיפה על זכויות הסטודנטים והטבות שמגיעות לכם', '2025-01-20 18:00:00+02', 'אולם 301', false),
  ('מבצע חנות האגודה', 'מבצעים מיוחדים על כל המוצרים בחנות האגודה - עד 50% הנחה!', '2025-01-10 09:00:00+02', 'חנות האגודה', true);

-- Insert sample departments
INSERT INTO departments (name, description, contact_email, contact_phone, icon, display_order) VALUES
  ('מחלקת תרבות ואירועים', 'אחראית על ארגון אירועים, מסיבות, ימי פעילות ופעילויות תרבות במכללה. צור קשר לרעיונות ופניות.', 'culture@studentunion.com', '03-1234567', 'Music', 1),
  ('מחלקת ספורט', 'מארגנת טורנירים ספורטיביים, מפעילה חוגי ספורט ומסייעת לסטודנטים בנושאי ספורט ובריאות.', 'sports@studentunion.com', '03-1234568', 'Dumbbell', 2),
  ('מחלקת רווחה', 'עוסקת בסיוע כלכלי, מלגות, והטבות לסטודנטים. מטפלת בפניות למצוקות ייחודיות.', 'welfare@studentunion.com', '03-1234569', 'Heart', 3),
  ('מחלקת חינוך', 'מטפלת בנושאי איכות הוראה, שיפור תנאי לימוד, וקשר בין הסטודנטים וההנהלה האקדמית.', 'education@studentunion.com', '03-1234570', 'GraduationCap', 4),
  ('מחלקת קשרי חוץ', 'אחראית על קשרים עם אגודות סטודנטים אחרות, ארגונים חיצוניים ושותפויות אסטרטגיות.', 'external@studentunion.com', '03-1234571', 'Globe', 5);
