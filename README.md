# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 🆕 Supabase Integration

This project now includes a complete Supabase integration with:

- **Authentication System**: Login/register with email/password and social providers (GitHub, Google)
- **User Feedback**: Interactive feedback widgets on documentation pages
- **Analytics Tracking**: Page view analytics and user behavior tracking
- **User Dashboard**: Personal dashboard with statistics and preferences
- **Real-time Features**: Live updates and notifications

📖 **For detailed setup instructions, see [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)**

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

## Build

```bash
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
