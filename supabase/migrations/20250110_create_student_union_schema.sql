/*
  # Student Union Website Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `student_id` (text, optional)
      - `created_at` (timestamp)

    - `departments`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `content` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text, optional)
      - `author` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)

    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, optional)
      - `image_url` (text)
      - `category` (text)
      - `event_date` (date)
      - `created_at` (timestamp)

    - `store_products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text, optional)
      - `category` (text)
      - `in_stock` (boolean)
      - `created_at` (timestamp)

    - `rights`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `bio` (text)
      - `image_url` (text, optional)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public read access
    - Add policies for authenticated user management
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  student_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT '📚',
  content text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view departments"
  ON departments FOR SELECT
  TO public
  USING (true);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  author text NOT NULL DEFAULT 'צוות האגודה',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view news"
  ON news FOR SELECT
  TO public
  USING (true);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'אירועים',
  event_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery"
  ON gallery_images FOR SELECT
  TO public
  USING (true);

-- Store products table
CREATE TABLE IF NOT EXISTS store_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text,
  category text NOT NULL DEFAULT 'כללי',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON store_products FOR SELECT
  TO public
  USING (true);

-- Rights table
CREATE TABLE IF NOT EXISTS rights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rights"
  ON rights FOR SELECT
  TO public
  USING (true);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL DEFAULT '',
  image_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team"
  ON team_members FOR SELECT
  TO public
  USING (true);

-- Insert sample data
INSERT INTO departments (name, description, icon, content, order_index) VALUES
('תרבות', 'מחלקת התרבות מארגנת אירועים ופעילויות תרבותיות מגוונות', '🎭', '<p>מחלקת התרבות שלנו מתמחה בהפקת אירועים תרבותיים איכותיים לסטודנטים.</p>', 1),
('ספורט', 'קידום פעילות ספורטיבית ובריאות בקמפוס', '⚽', '<p>מחלקת הספורט מעודדת אורח חיים פעיל ובריא.</p>', 2),
('רווחה', 'דואגים לרווחת הסטודנטים', '💚', '<p>מחלקת הרווחה פועלת למען כל סטודנט.</p>', 3),
('אקדמיה', 'ייצוג אקדמי ותמיכה לימודית', '📚', '<p>מחלקה אקדמית לתמיכה בלימודים.</p>', 4),
('הדרכה', 'תמיכה והדרכה לסטודנטים חדשים', '🎓', '<p>עוזרים לסטודנטים חדשים להשתלב.</p>', 5),
('קהילה', 'בניית קהילה חזקה ותומכת', '👥', '<p>יוצרים קהילה מגובשת ותומכת.</p>', 6);

INSERT INTO news (title, content, author, published_at) VALUES
('פתיחת שנת הלימודים החדשה', 'אנחנו שמחים לפתוח את שנת הלימודים החדשה! מחכים לכם הרבה אירועים מרגשים ופעילויות מגוונות לאורך כל השנה.', 'צוות האגודה', now() - interval '1 day'),
('יום הפתוח של האגודה', 'בשבוע הבא יתקיים יום הפתוח השנתי שלנו. בואו להכיר את כל המחלקות והשירותים שיש לנו להציע!', 'מחלקת התרבות', now() - interval '3 days'),
('הטבות חדשות לסטודנטים', 'נוספו הטבות חדשות במסעדות וחנויות ברחבי העיר. בואו לבדוק בחנות שלנו!', 'מחלקת רווחה', now() - interval '5 days');

INSERT INTO rights (title, content, category, order_index) VALUES
('זכות לשכר לימוד מוזל', '<p>כל סטודנט זכאי למימון לימודים בהתאם לתנאי הזכאות.</p>', 'זכויות כלכליות', 1),
('זכות לערעור על ציונים', '<p>סטודנטים רשאים לערער על ציונים תוך 30 יום מקבלת הציון.</p>', 'זכויות לימודיות', 2),
('זכות לסיוע לימודי', '<p>סטודנטים זכאים לקבל תמיכה לימודית והדרכה אקדמית.</p>', 'זכויות לימודיות', 3);

INSERT INTO team_members (name, role, bio, order_index) VALUES
('דני כהן', 'יו"ר האגודה', 'מוביל את האגודה בלהט ומסירות', 1),
('מיכל לוי', 'סגנית יו"ר', 'אחראית על תכנון אסטרטגי', 2),
('יוסי אברהם', 'מנהל מחלקת תרבות', 'מפיק אירועים בלתי נשכחים', 3),
('שרה דוד', 'מנהלת מחלקת רווחה', 'דואגת לכל סטודנט', 4);
