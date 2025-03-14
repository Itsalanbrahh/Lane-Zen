# Environment Configuration Guide

This document provides guidance on how to work with different environments (Development, QA, and Production) in the Lane Zen Freight Forecasting application.

## Environment Structure

The application supports three primary environments:

1. **Development** - For local development and testing
2. **QA** - For quality assurance and staging
3. **Production** - For the live application

## Configuration Files

Environment-specific configuration is managed through `.env` files:

- `.env.development` - Development environment settings
- `.env.qa` - QA environment settings
- `.env.production` - Production environment settings
- `.env.local` - Local overrides (not committed to git)

### Local Development

For local development, you can create a `.env.local` file to override environment variables without changing the committed files. This file should never be committed to the repository.

Example `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-supabase-key
```

## Running with Different Environments

### Development Scripts

The following npm scripts are provided for convenience:

```bash
# Development mode (default)
npm run dev

# QA mode
npm run dev:qa

# Production mode (for testing production build locally)
npm run dev:prod

# Building for specific environments
npm run build         # Production build
npm run build:dev     # Development build
npm run build:qa      # QA build
```

### Command Line Arguments

You can also specify the environment directly with command line arguments:

```bash
# Development
next dev --env=development

# QA
next dev --env=qa

# Production
next dev --env=production
```

## Environment Indicator

The application includes a visual environment indicator that appears in the corner of the screen. This helps you identify which environment you're currently using:

- **Blue** - Development
- **Yellow** - QA
- **Red** - Production (only visible in development mode)

## Configuration Debug Page

A debug page is available at `/debug/config` that shows all current configuration values. This page is only accessible in Development and QA environments.

## Working with Mock Data

In Development mode, you can use mock data instead of connecting to a real database by setting:

```
NEXT_PUBLIC_USE_MOCK_DATA=true
```

This is useful for development when you don't have access to a Supabase instance or want to work offline.

## Database Configuration

### Development

For development, you can use either:

1. A local Supabase instance
2. A development Supabase project 
3. Mock data (by setting `NEXT_PUBLIC_USE_MOCK_DATA=true`)

### QA

QA should use a dedicated Supabase project that mirrors the production structure but contains test data.

### Production

Production should use the main Supabase project with proper security settings.

## Security Considerations

1. **Never commit sensitive keys** to the repository. Use `.env.local` for local development.
2. Ensure production keys are kept secure and only accessible to authorized personnel.
3. In production, ensure proper Row Level Security (RLS) is configured in Supabase.
4. Use different API keys for different environments.

## Deployment Process

### Development to QA

1. Build the application with `npm run build:qa`
2. Deploy to the QA environment
3. Test thoroughly using QA configuration

### QA to Production

1. Build the application with `npm run build`
2. Deploy to the production environment
3. Verify functionality with production configuration

## Troubleshooting

### Environment Variables Not Loading

1. Make sure you're using the `NEXT_PUBLIC_` prefix for client-side variables
2. Restart the development server after changing environment files
3. Check the debug page (`/debug/config`) to verify loaded values

### Deployment Issues

1. Ensure you're building with the correct environment target
2. Verify environment variables are properly set in your deployment platform
3. Check that your Supabase URL and API keys are correctly configured for the target environment

### Mock Data Issues

If you're seeing issues with mock data:

1. Check that `NEXT_PUBLIC_USE_MOCK_DATA` is set to `true`
2. Verify you're running in Development mode
3. Check the console for any errors related to data fetching 