import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  full_name: string;
  student_id?: string;
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  order_index: number;
  content: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  published_at: string;
  author: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  event_date: string;
  category: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
  category: string;
}

export interface Right {
  id: string;
  title: string;
  content: string;
  category: string;
  order_index: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  bio: string;
  order_index: number;
}
