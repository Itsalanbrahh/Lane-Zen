/**
 * Application Configuration
 * 
 * This module centralizes access to all environment variables and configuration settings.
 * Instead of accessing process.env directly throughout the application, import settings from here.
 */

// Application info
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Lane Zen';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

// Determine if we're in a production environment
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_QA = ENVIRONMENT === 'qa';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development' || !ENVIRONMENT;

// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10);

// Supabase Configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Debug settings
export const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
export const LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL || 'info';

// Feature flags
export const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
export const FEATURE_EXPERIMENTAL = process.env.NEXT_PUBLIC_FEATURE_EXPERIMENTAL === 'true';

// Storage settings
export const LOCAL_STORAGE_PREFIX = process.env.NEXT_PUBLIC_LOCAL_STORAGE_PREFIX || 'lanezen_';

// Logging utility
export const log = (level, ...args) => {
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };
  
  const currentLevel = levels[LOG_LEVEL] || levels.info;
  
  if (levels[level] <= currentLevel) {
    if (level === 'error') {
      console.error(`[${ENVIRONMENT.toUpperCase()}]`, ...args);
    } else if (level === 'warn') {
      console.warn(`[${ENVIRONMENT.toUpperCase()}]`, ...args);
    } else if (level === 'info') {
      console.info(`[${ENVIRONMENT.toUpperCase()}]`, ...args);
    } else if (level === 'debug') {
      console.debug(`[${ENVIRONMENT.toUpperCase()}]`, ...args);
    }
  }
};

// Export a config object for convenience
export default {
  APP_NAME,
  APP_VERSION,
  ENVIRONMENT,
  IS_PRODUCTION,
  IS_QA,
  IS_DEVELOPMENT,
  API_URL,
  API_TIMEOUT,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  USE_MOCK_DATA,
  DEBUG_MODE,
  LOG_LEVEL,
  ENABLE_ANALYTICS,
  ANALYTICS_ID,
  FEATURE_EXPERIMENTAL,
  LOCAL_STORAGE_PREFIX,
  log
}; 