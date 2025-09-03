# Integração com Supabase - Guia Completo

Este projeto agora inclui uma integração completa com Supabase, fornecendo autenticação, banco de dados e recursos em tempo real.

## 🚀 Funcionalidades Implementadas

### 1. **Sistema de Autenticação**
- ✅ Login/Registro com email e senha
- ✅ Autenticação com GitHub e Google
- ✅ Gerenciamento de estado de autenticação
- ✅ Componente de botão de usuário na navbar
- ✅ Modal de autenticação responsivo

### 2. **Sistema de Feedback**
- ✅ Widget de feedback nas páginas
- ✅ Avaliação rápida (útil/não útil)
- ✅ Comentários detalhados e sugestões
- ✅ Sistema de avaliação por estrelas
- ✅ Histórico de feedbacks

### 3. **Analytics de Páginas**
- ✅ Rastreamento automático de visualizações
- ✅ Sessão única por visitante
- ✅ Dados de usuário e user agent
- ✅ Hook personalizado para analytics

### 4. **Dashboard do Usuário**
- ✅ Página de dashboard personalizada
- ✅ Estatísticas do usuário
- ✅ Configurações de preferências
- ✅ Histórico completo de feedbacks

## 📦 Configuração do Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Escolha uma organização e configure o projeto:
   - **Name**: Integrador Documentation
   - **Database Password**: Crie uma senha segura
   - **Region**: Escolha a região mais próxima

### Passo 2: Configurar o Banco de Dados

Execute o código SQL abaixo no editor SQL do Supabase (Settings > SQL Editor):

\`\`\`sql
-- Cole aqui o conteúdo do arquivo src/lib/supabase-schema.sql
\`\`\`

### Passo 3: Configurar Autenticação

1. Vá para **Authentication > Settings**
2. Configure os provedores OAuth:

**Para GitHub:**
- Enable GitHub provider
- Adicione Client ID e Client Secret do GitHub
- URL de callback: `https://your-domain.com/auth/callback`

**Para Google:**
- Enable Google provider
- Adicione Client ID e Client Secret do Google
- URL de callback: `https://your-domain.com/auth/callback`

### Passo 4: Configurar Variáveis de Ambiente

1. Copie `.env.example` para `.env.local`
2. Preencha com suas credenciais do Supabase:

\`\`\`env
REACT_APP_SUPABASE_URL=https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua-chave-anonima
\`\`\`

## 🛠️ Estrutura dos Componentes

### Componentes Criados

\`\`\`
src/
├── components/
│   ├── Auth/
│   │   ├── AuthModal.tsx          # Modal de autenticação
│   │   ├── styles.module.css      # Estilos do modal
│   │   └── index.tsx              # Export do componente
│   ├── UserButton/
│   │   ├── UserButton.tsx         # Botão de usuário na navbar
│   │   ├── styles.module.css      # Estilos do botão
│   │   └── index.tsx              # Export do componente
│   └── Feedback/
│       ├── FeedbackWidget.tsx     # Widget de feedback
│       ├── styles.module.css      # Estilos do feedback
│       └── index.tsx              # Export do componente
├── contexts/
│   └── AuthContext.tsx            # Contexto de autenticação
├── hooks/
│   └── useAnalytics.ts            # Hook para analytics
├── lib/
│   ├── supabase.ts                # Cliente e tipos do Supabase
│   └── supabase-schema.sql        # Schema do banco de dados
├── pages/
│   ├── dashboard.tsx              # Página do dashboard
│   └── dashboard.module.css       # Estilos do dashboard
└── theme/
    ├── Root.tsx                   # Provider global
    └── Navbar/Layout/index.tsx    # Navbar customizada
\`\`\`

## 📊 Esquema do Banco de Dados

### Tabelas Criadas

1. **user_feedback**: Armazena feedbacks dos usuários
2. **page_analytics**: Rastreia visualizações de páginas
3. **user_preferences**: Salva preferências dos usuários

### Políticas de Segurança (RLS)

- ✅ Row Level Security habilitado
- ✅ Usuários só veem seus próprios dados
- ✅ Analytics permite inserção anônima
- ✅ Feedbacks são públicos para leitura

## 🎯 Como Usar

### Adicionar Feedback a uma Página

\`\`\`tsx
import { FeedbackWidget } from '@site/src/components/Feedback';
import { useAnalytics } from '@site/src/hooks/useAnalytics';

export default function MinhaPage() {
  // Rastrear analytics
  useAnalytics('/minha-pagina');
  
  return (
    <Layout>
      {/* Conteúdo da página */}
      
      {/* Widget de feedback */}
      <FeedbackWidget pagePath="/minha-pagina" />
    </Layout>
  );
}
\`\`\`

### Verificar Autenticação

\`\`\`tsx
import { useAuth } from '@site/src/contexts/AuthContext';

export default function ComponenteProtegido() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Faça login para acessar</div>;
  
  return <div>Conteúdo para usuários autenticados</div>;
}
\`\`\`

## 🔧 Desenvolvimento

### Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### Executar em Desenvolvimento

\`\`\`bash
npm run start
\`\`\`

### Build para Produção

\`\`\`bash
npm run build
\`\`\`

## 📈 Próximos Passos

### Funcionalidades Futuras

- [ ] Sistema de notificações em tempo real
- [ ] Comentários nas páginas de documentação
- [ ] Sistema de likes/dislikes
- [ ] Dashboard administrativo com métricas
- [ ] Export de dados de analytics
- [ ] Sistema de tags para organizar feedback
- [ ] Integração com sistemas de suporte

### Melhorias Possíveis

- [ ] Cache de dados para melhor performance
- [ ] Paginação nos listados de feedback
- [ ] Filtros avançados no dashboard
- [ ] Temas personalizáveis por usuário
- [ ] Sistema de badges/gamificação
- [ ] API para integração externa

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Confirme que o schema do banco foi aplicado
3. Verifique os logs do navegador para erros JavaScript
4. Consulte a documentação do Supabase: [docs.supabase.com](https://docs.supabase.com)

Para problemas específicos, abra uma issue no repositório do projeto.