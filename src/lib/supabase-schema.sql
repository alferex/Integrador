-- Schema SQL para criar as tabelas no Supabase
-- Execute este código no editor SQL do Supabase

-- Tabela para feedback dos usuários
CREATE TABLE user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('helpful', 'not_helpful', 'suggestion')),
  comment TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para analytics de páginas
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT
);

-- Tabela para preferências do usuário
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme TEXT DEFAULT 'auto' CHECK (theme IN ('light', 'dark', 'auto')),
  language TEXT DEFAULT 'pt-BR',
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_user_feedback_page_path ON user_feedback(page_path);
CREATE INDEX idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX idx_page_analytics_page_path ON page_analytics(page_path);
CREATE INDEX idx_page_analytics_timestamp ON page_analytics(timestamp);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Políticas RLS (Row Level Security)
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Política para user_feedback: usuários podem ler todos os feedbacks, mas só podem inserir/atualizar os próprios
CREATE POLICY "Usuários podem ver todos os feedbacks" ON user_feedback
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem inserir feedback" ON user_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Usuários podem atualizar próprio feedback" ON user_feedback
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para page_analytics: inserção livre para analytics, leitura restrita
CREATE POLICY "Qualquer um pode inserir analytics" ON page_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins podem ver analytics" ON page_analytics
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM user_preferences WHERE user_id = auth.uid()
  ));

-- Política para user_preferences: usuários só podem ver/editar suas próprias preferências
CREATE POLICY "Usuários podem ver próprias preferências" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir próprias preferências" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprias preferências" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at em user_preferences
CREATE TRIGGER update_user_preferences_updated_at 
  BEFORE UPDATE ON user_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();