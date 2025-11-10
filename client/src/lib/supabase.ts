import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Department {
  id: string;
  name_he: string;
  name_en: string;
  description_he: string;
  description_en: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface NewsUpdate {
  id: string;
  title_he: string;
  title_en: string;
  content_he: string;
  content_en: string;
  image_url?: string;
  published_at: string;
  author_id: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title_he: string;
  title_en: string;
  description_he?: string;
  description_en?: string;
  image_url: string;
  category: string;
  event_date?: string;
  order_index: number;
  created_at: string;
}

export interface RightCategory {
  id: string;
  name_he: string;
  name_en: string;
  description_he: string;
  description_en: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface StoreProduct {
  id: string;
  name_he: string;
  name_en: string;
  description_he: string;
  description_en: string;
  price: number;
  image_url?: string;
  category: string;
  stock_quantity: number;
  is_available: boolean;
  in_stock: boolean;
  created_at: string;
}
