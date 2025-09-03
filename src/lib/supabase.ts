import { createClient } from '@supabase/supabase-js';

// Estas variáveis devem ser configuradas no ambiente de produção
// Para desenvolvimento local, você pode criar um arquivo .env.local
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface UserFeedback {
  id?: string;
  user_id?: string;
  page_path: string;
  feedback_type: 'helpful' | 'not_helpful' | 'suggestion';
  comment?: string;
  rating?: number;
  created_at?: string;
}

export interface PageAnalytics {
  id?: string;
  page_path: string;
  user_id?: string;
  session_id: string;
  timestamp?: string;
  user_agent?: string;
}

export interface UserPreferences {
  id?: string;
  user_id: string;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  notifications_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}