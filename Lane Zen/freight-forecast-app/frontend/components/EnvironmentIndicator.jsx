import React from 'react';
import { IS_DEVELOPMENT, IS_QA, IS_PRODUCTION, ENVIRONMENT, DEBUG_MODE } from '../lib/config';

/**
 * EnvironmentIndicator component
 * 
 * Displays a visual indicator of the current environment (development, QA, production)
 * Only shown in development and QA environments by default
 */
const EnvironmentIndicator = ({ showInProduction = false, position = 'bottom-right' }) => {
  // Don't show in production unless explicitly requested
  if (IS_PRODUCTION && !showInProduction) {
    return null;
  }

  // Calculate the styles based on the environment and position
  const getStyles = () => {
    const positionStyles = {
      'top-right': { top: '10px', right: '10px' },
      'top-left': { top: '10px', left: '10px' },
      'bottom-right': { bottom: '10px', right: '10px' },
      'bottom-left': { bottom: '10px', left: '10px' },
    };

    const colorScheme = {
      development: {
        backgroundColor: '#2563eb', // Blue
        color: '#ffffff',
      },
      qa: {
        backgroundColor: '#ca8a04', // Yellow
        color: '#ffffff',
      },
      production: {
        backgroundColor: '#dc2626', // Red
        color: '#ffffff',
      },
    };

    const scheme = colorScheme[ENVIRONMENT] || colorScheme.development;

    return {
      position: 'fixed',
      zIndex: 9999,
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      ...positionStyles[position],
      ...scheme,
    };
  };

  // Include debug mode indicator if enabled
  const getLabel = () => {
    let label = ENVIRONMENT.toUpperCase();
    if (DEBUG_MODE) {
      label += ' (DEBUG)';
    }
    return label;
  };

  return <div style={getStyles()}>{getLabel()}</div>;
};

export default EnvironmentIndicator; 