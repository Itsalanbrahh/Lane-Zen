/**
 * Mock Data Provider
 * 
 * This module provides mock data for development and testing purposes.
 * It's used when:
 * 1. Supabase credentials are not configured
 * 2. USE_MOCK_DATA is set to true in the environment
 * 3. As a fallback when API calls fail
 */

import { USE_MOCK_DATA, log } from './config';

// Sample users
export const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    company_id: '1',
    role: 'admin',
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    company_id: '1',
    role: 'user',
    created_at: '2023-01-02T00:00:00.000Z',
  },
];

// Sample companies
export const mockCompanies = [
  {
    id: '1',
    name: 'Acme Logistics',
    industry: 'Transportation',
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'XYZ Shipping',
    industry: 'Freight',
    created_at: '2023-01-01T00:00:00.000Z',
  },
];

// Sample equipment types
export const mockEquipmentTypes = [
  { id: '1', name: 'Dry Van', description: 'Standard enclosed trailer' },
  { id: '2', name: 'Refrigerated', description: 'Temperature-controlled trailer' },
  { id: '3', name: 'Flatbed', description: 'Open trailer with no sides or roof' },
  { id: '4', name: 'Tanker', description: 'For liquid or gas transport' },
];

// Sample locations
export const mockLocations = [
  { id: '1', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'USA' },
  { id: '2', city: 'New York', state: 'NY', zip: '10001', country: 'USA' },
  { id: '3', city: 'Chicago', state: 'IL', zip: '60007', country: 'USA' },
  { id: '4', city: 'Dallas', state: 'TX', zip: '75001', country: 'USA' },
  { id: '5', city: 'Atlanta', state: 'GA', zip: '30301', country: 'USA' },
];

// Sample RFPs
export const mockRFPs = [
  {
    id: '1',
    title: 'Annual Carrier Bid 2023',
    description: 'Annual bid for all lanes in the western region',
    company_id: '1',
    status: 'active',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    created_at: '2022-11-15T00:00:00.000Z',
    created_by: '1',
  },
  {
    id: '2',
    title: 'Spot Market Q1 2023',
    description: 'Spot market rates for Q1 2023',
    company_id: '1',
    status: 'completed',
    start_date: '2023-01-01',
    end_date: '2023-03-31',
    created_at: '2022-12-15T00:00:00.000Z',
    created_by: '2',
  },
];

// Sample lanes
export const mockLanes = [
  {
    id: '1',
    rfp_id: '1',
    origin_id: '1',
    destination_id: '2',
    equipment_type_id: '1',
    miles: 2800,
    volume: 10,
    frequency: 'weekly',
    notes: 'High priority lane',
    created_at: '2022-11-16T00:00:00.000Z',
  },
  {
    id: '2',
    rfp_id: '1',
    origin_id: '1',
    destination_id: '3',
    equipment_type_id: '2',
    miles: 2100,
    volume: 5,
    frequency: 'weekly',
    notes: 'Temperature sensitive goods',
    created_at: '2022-11-16T00:00:00.000Z',
  },
  {
    id: '3',
    rfp_id: '2',
    origin_id: '3',
    destination_id: '4',
    equipment_type_id: '1',
    miles: 900,
    volume: 3,
    frequency: 'daily',
    notes: 'Regular shipments',
    created_at: '2022-12-16T00:00:00.000Z',
  },
];

// Sample rates
export const mockRates = [
  {
    id: '1',
    lane_id: '1',
    rate: 3500,
    effective_date: '2023-01-01',
    expiration_date: '2023-12-31',
    type: 'contracted',
    created_at: '2022-11-20T00:00:00.000Z',
  },
  {
    id: '2',
    lane_id: '2',
    rate: 4200,
    effective_date: '2023-01-01',
    expiration_date: '2023-12-31',
    type: 'contracted',
    created_at: '2022-11-20T00:00:00.000Z',
  },
  {
    id: '3',
    lane_id: '3',
    rate: 1800,
    effective_date: '2023-01-01',
    expiration_date: '2023-03-31',
    type: 'spot',
    created_at: '2022-12-20T00:00:00.000Z',
  },
];

// Sample forecasts
export const mockForecasts = [
  {
    id: '1',
    lane_id: '1',
    forecast_date: '2023-02-01',
    predicted_rate: 3600,
    confidence: 0.85,
    model_version: '1.0',
    created_at: '2023-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    lane_id: '1',
    forecast_date: '2023-03-01',
    predicted_rate: 3650,
    confidence: 0.82,
    model_version: '1.0',
    created_at: '2023-01-15T00:00:00.000Z',
  },
  {
    id: '3',
    lane_id: '2',
    forecast_date: '2023-02-01',
    predicted_rate: 4250,
    confidence: 0.88,
    model_version: '1.0',
    created_at: '2023-01-15T00:00:00.000Z',
  },
];

// Sample market indices
export const mockMarketIndices = [
  {
    id: '1',
    index_name: 'DAT Van National',
    value: 2.45,
    date: '2023-01-15',
    created_at: '2023-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    index_name: 'DAT Van National',
    value: 2.48,
    date: '2023-01-22',
    created_at: '2023-01-22T00:00:00.000Z',
  },
  {
    id: '3',
    index_name: 'DAT Reefer National',
    value: 2.95,
    date: '2023-01-15',
    created_at: '2023-01-15T00:00:00.000Z',
  },
];

// Sample fuel prices
export const mockFuelPrices = [
  {
    id: '1',
    region: 'National',
    price: 4.25,
    date: '2023-01-15',
    created_at: '2023-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    region: 'National',
    price: 4.30,
    date: '2023-01-22',
    created_at: '2023-01-22T00:00:00.000Z',
  },
  {
    id: '3',
    region: 'West Coast',
    price: 4.85,
    date: '2023-01-15',
    created_at: '2023-01-15T00:00:00.000Z',
  },
];

// Sample tags
export const mockTags = [
  { id: '1', name: 'High Priority', color: 'red' },
  { id: '2', name: 'Cost Saving', color: 'green' },
  { id: '3', name: 'Seasonal', color: 'blue' },
  { id: '4', name: 'Problem Lane', color: 'orange' },
];

// Utility function to get mock data
export const getMockData = (type) => {
  if (!USE_MOCK_DATA) {
    log('debug', 'Mock data requested but USE_MOCK_DATA is false');
    return [];
  }

  log('debug', `Returning mock data for ${type}`);
  
  switch (type) {
    case 'users':
      return [...mockUsers];
    case 'companies':
      return [...mockCompanies];
    case 'equipment_types':
      return [...mockEquipmentTypes];
    case 'locations':
      return [...mockLocations];
    case 'rfps':
      return [...mockRFPs];
    case 'lanes':
      return [...mockLanes];
    case 'rates':
      return [...mockRates];
    case 'forecasts':
      return [...mockForecasts];
    case 'market_indices':
      return [...mockMarketIndices];
    case 'fuel_prices':
      return [...mockFuelPrices];
    case 'tags':
      return [...mockTags];
    default:
      log('warn', `Unknown mock data type: ${type}`);
      return [];
  }
};

// Utility function to get a single mock item by ID
export const getMockItemById = (type, id) => {
  const items = getMockData(type);
  return items.find(item => item.id === id) || null;
};

// Utility function to get related mock data
export const getRelatedMockData = (type, field, value) => {
  const items = getMockData(type);
  return items.filter(item => item[field] === value);
};

export default {
  getMockData,
  getMockItemById,
  getRelatedMockData,
}; 