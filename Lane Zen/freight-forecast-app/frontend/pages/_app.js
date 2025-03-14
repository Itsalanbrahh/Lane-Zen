import '../styles/globals.css';
import '../styles/fallback.css';
import Head from 'next/head';
import EnvironmentIndicator from '../components/EnvironmentIndicator';
import { IS_PRODUCTION } from '../lib/config';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lane Zen - Freight Forecasting Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Freight rate forecasting and RFP management platform" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
      {/* Only show the environment indicator in non-production or during development */}
      <EnvironmentIndicator showInProduction={!IS_PRODUCTION || process.env.NODE_ENV === 'development'} />
    </>
  );
}

export default MyApp;