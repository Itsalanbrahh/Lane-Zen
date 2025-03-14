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

## 📝 License

Copyright © 2025 Lane Zen. All rights reserved. 