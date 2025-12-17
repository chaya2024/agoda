import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  image_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  contact_email: string | null;
  contact_phone: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const eventsApi = {
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getFeatured(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getUpcoming(): Promise<Event[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', now)
      .order('event_date', { ascending: true })
      .limit(6);

    if (error) throw error;
    return data || [];
  }
};

export const departmentsApi = {
  async getAll(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};
