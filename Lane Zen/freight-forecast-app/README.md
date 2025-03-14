# Lane Zen Freight Forecasting Application

A modern, full-stack application for freight rate forecasting, lane management, and RFP (Request for Pricing) processing.

## 🚀 Features

- **Rate Forecasting**: Predict future freight rates based on historical data and market trends
- **Lane Management**: Create, update, and analyze lanes with detailed origin-destination information
- **RFP Processing**: Manage RFPs from creation to completion
- **Multi-environment Support**: Development, QA, and Production environments
- **Mock Data Mode**: Develop without database connectivity using robust mock data
- **Interactive Visualizations**: Data visualization for rates, trends, and forecasts
- **File Import/Export**: Support for importing and exporting data in various formats

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Supports multiple deployment environments

## 📋 Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Git
- Supabase account (optional if using mock data)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Itsalanbrahh/Lane-Zen.git
   cd Lane-Zen/freight-forecast-app
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Environment configuration:
   - Create a `.env.local` file in the `frontend` directory based on `.env.example`
   - For local development with mock data, ensure `NEXT_PUBLIC_USE_MOCK_DATA=true`

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Environment Configuration

The application supports multiple environments with environment-specific configuration:

- **Development**: Local development with optional mock data
- **QA**: Testing environment with real data connections
- **Production**: Live environment for end users

### Environment Files

- `.env` - Base configuration (common across environments)
- `.env.development` - Development-specific settings
- `.env.qa` - QA environment settings
- `.env.production` - Production environment settings
- `.env.local` - Local overrides (not committed to git)

### Running in Different Environments

```bash
# Development (default)
npm run dev

# QA environment
npm run dev:qa

# Production environment (local testing)
npm run dev:prod
```

For more details, see [ENVIRONMENTS.md](./ENVIRONMENTS.md).

## 🧮 Features & Usage

### Freight Rate Forecasting

The application uses historical rate data and market trends to predict future rates for specific lanes. Forecasts include confidence intervals and are presented with easy-to-understand visualizations.

### Lane Management

Create and manage lanes with detailed information:
- Origin and destination locations
- Equipment types
- Volume and frequency
- Historical rates
- Forecasted rates
- Custom tags and notes

### RFP Process Management

Streamline the RFP process:
- Create new RFPs
- Import lane data
- Process and analyze lanes
- Generate forecasts
- Export for distribution

## 🔑 Mock Data Mode

When `NEXT_PUBLIC_USE_MOCK_DATA` is set to `true`, the application uses robust mock data instead of connecting to Supabase. This is useful for:

- Development without database connectivity
- Offline development
- Testing and demonstrations
- CI/CD environments

The mock data includes realistic scenarios for:
- Users and companies
- RFPs and lanes
- Historical rates
- Locations and equipment types

## 🧪 Testing

```bash
# Run tests
npm run test
```

## 🚢 Deployment

The application supports deployment to various environments. For detailed deployment instructions, see the deployment guide.

## 📚 Documentation

Additional documentation is available:
- [Environment Configuration](./ENVIRONMENTS.md)
- [API Documentation](./docs/API.md) (coming soon)
- [Database Schema](./docs/SCHEMA.md) (coming soon)

## 🔧 Troubleshooting

### Next.js Configuration Issues

If you encounter warnings about invalid Next.js configuration options:

```
⚠ Invalid next.config.js options detected: 
⚠     Unrecognized key(s) in object: 'swcMinify'
```

This is because Next.js 15.x no longer supports the `swcMinify` option. You can:

1. Remove the `swcMinify` option from `next.config.js`
2. Or downgrade to Next.js 13.x using: `npm install next@13.5.6`

### Stylesheet Warnings

If you see warnings about stylesheets in Next.js:

```
Do not add stylesheets using next/head (see <link rel="stylesheet"> tag)
Use Document instead.
```

Move your stylesheet links from components using `next/head` to a custom `_document.js` file:

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### Supabase Connection Issues

If you see errors about missing Supabase credentials:

```
Error: supabaseUrl is required.
```

Ensure your `.env.local` file is properly configured with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Alternatively, set `NEXT_PUBLIC_USE_MOCK_DATA=true` to use the application with mock data.

### Port Already in Use

If ports are already in use (e.g., 3000, 3001), you can specify a port manually:

```bash
npm run dev -- -p 4000
```

### Missing npm Scripts

If you see errors like `Missing script: "dev"` when trying to run commands from the project root, make sure to:

1. Navigate to the correct directory first:
   ```bash
   cd Lane\ Zen/freight-forecast-app/frontend
   ```

2. Then run the npm command:
   ```bash
   npm run dev
   ```

## 📝 License

Copyright © 2025 Lane Zen. All rights reserved. 