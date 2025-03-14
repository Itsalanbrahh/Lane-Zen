/**
 * Database utility functions for the Lane Zen Freight Forecasting Application
 * 
 * This module provides functions to interact with the database.
 * It uses the Supabase client for database operations.
 */

import supabase from './supabase';
import { USE_MOCK_DATA, log } from './config';
import { 
  getMockData, 
  getMockItemById, 
  getRelatedMockData 
} from './mockData';

// Error handling wrapper
const handleDbOperation = async (operation, mockReturnValue = null) => {
  try {
    // If we're using mock data, return the mock value
    if (USE_MOCK_DATA && mockReturnValue !== null) {
      return { data: mockReturnValue, error: null };
    }
    
    // Otherwise, perform the actual operation
    const { data, error } = await operation();
    
    if (error) {
      log('error', 'Database operation failed', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    log('error', 'Unexpected error during database operation', err);
    return { data: null, error: err };
  }
};

// -------------------------
// User-related functions
// -------------------------

export const getCurrentUser = async () => {
  return handleDbOperation(
    async () => await supabase.auth.getUser(),
    { user: getMockItemById('users', '1') }
  );
};

export const getUserProfile = async (userId) => {
  return handleDbOperation(
    async () => await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single(),
    getMockItemById('users', userId)
  );
};

export const updateUserProfile = async (userId, updates) => {
  return handleDbOperation(
    async () => await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single(),
    { ...getMockItemById('users', userId), ...updates }
  );
};

// -------------------------
// RFP-related functions
// -------------------------

export const getRFPs = async (companyId) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfps')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false }),
    getRelatedMockData('rfps', 'company_id', companyId)
  );
};

export const getRFPById = async (rfpId) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfps')
      .select(`
        *,
        lanes(count),
        created_by:users(name),
        tags(*)
      `)
      .eq('id', rfpId)
      .single(),
    {
      ...getMockItemById('rfps', rfpId),
      lanes: { count: getRelatedMockData('lanes', 'rfp_id', rfpId).length },
      created_by: getMockItemById('users', getMockItemById('rfps', rfpId)?.created_by || '1'),
      tags: []
    }
  );
};

export const createRFP = async (rfpData) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfps')
      .insert(rfpData)
      .select()
      .single(),
    { ...rfpData, id: `mock-${Date.now()}`, created_at: new Date().toISOString() }
  );
};

export const updateRFP = async (rfpId, updates) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfps')
      .update(updates)
      .eq('id', rfpId)
      .select()
      .single(),
    { ...getMockItemById('rfps', rfpId), ...updates }
  );
};

export const deleteRFP = async (rfpId) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfps')
      .delete()
      .eq('id', rfpId),
    {}
  );
};

// -------------------------
// Lane-related functions
// -------------------------

export const getLanesByRFP = async (rfpId) => {
  return handleDbOperation(
    async () => await supabase
      .from('lanes')
      .select(`
        *,
        origin:locations!origin_id(*),
        destination:locations!destination_id(*),
        equipment_type:equipment_types(*),
        rates(*)
      `)
      .eq('rfp_id', rfpId)
      .order('created_at', { ascending: false }),
    getRelatedMockData('lanes', 'rfp_id', rfpId).map(lane => ({
      ...lane,
      origin: getMockItemById('locations', lane.origin_id),
      destination: getMockItemById('locations', lane.destination_id),
      equipment_type: getMockItemById('equipment_types', lane.equipment_type_id),
      rates: getRelatedMockData('rates', 'lane_id', lane.id)
    }))
  );
};

export const getLaneById = async (laneId) => {
  return handleDbOperation(
    async () => await supabase
      .from('lanes')
      .select(`
        *,
        origin:locations!origin_id(*),
        destination:locations!destination_id(*),
        equipment_type:equipment_types(*),
        rates(*),
        rfp:rfps(*),
        tags(*)
      `)
      .eq('id', laneId)
      .single(),
    {
      ...getMockItemById('lanes', laneId),
      origin: getMockItemById('locations', getMockItemById('lanes', laneId)?.origin_id),
      destination: getMockItemById('locations', getMockItemById('lanes', laneId)?.destination_id),
      equipment_type: getMockItemById('equipment_types', getMockItemById('lanes', laneId)?.equipment_type_id),
      rates: getRelatedMockData('rates', 'lane_id', laneId),
      rfp: getMockItemById('rfps', getMockItemById('lanes', laneId)?.rfp_id),
      tags: []
    }
  );
};

export const createLane = async (laneData) => {
  return handleDbOperation(
    async () => await supabase
      .from('lanes')
      .insert(laneData)
      .select()
      .single(),
    { ...laneData, id: `mock-${Date.now()}`, created_at: new Date().toISOString() }
  );
};

export const updateLane = async (laneId, updates) => {
  return handleDbOperation(
    async () => await supabase
      .from('lanes')
      .update(updates)
      .eq('id', laneId)
      .select()
      .single(),
    { ...getMockItemById('lanes', laneId), ...updates }
  );
};

export const deleteLane = async (laneId) => {
  return handleDbOperation(
    async () => await supabase
      .from('lanes')
      .delete()
      .eq('id', laneId),
    {}
  );
};

// -------------------------
// Rate-related functions
// -------------------------

export const getRatesByLane = async (laneId) => {
  return handleDbOperation(
    async () => await supabase
      .from('rates')
      .select('*')
      .eq('lane_id', laneId)
      .order('effective_date', { ascending: false }),
    getRelatedMockData('rates', 'lane_id', laneId)
  );
};

export const addRate = async (rateData) => {
  return handleDbOperation(
    async () => await supabase
      .from('rates')
      .insert(rateData)
      .select()
      .single(),
    { ...rateData, id: `mock-${Date.now()}`, created_at: new Date().toISOString() }
  );
};

export const updateRate = async (rateId, updates) => {
  return handleDbOperation(
    async () => await supabase
      .from('rates')
      .update(updates)
      .eq('id', rateId)
      .select()
      .single(),
    { ...getMockItemById('rates', rateId), ...updates }
  );
};

// -------------------------
// Forecast-related functions
// -------------------------

export const getForecastsByLane = async (laneId) => {
  return handleDbOperation(
    async () => await supabase
      .from('forecasts')
      .select('*')
      .eq('lane_id', laneId)
      .order('forecast_date', { ascending: true }),
    getRelatedMockData('forecasts', 'lane_id', laneId)
  );
};

export const addForecast = async (forecastData) => {
  return handleDbOperation(
    async () => await supabase
      .from('forecasts')
      .insert(forecastData)
      .select()
      .single(),
    { ...forecastData, id: `mock-${Date.now()}`, created_at: new Date().toISOString() }
  );
};

// -------------------------
// Location-related functions
// -------------------------

export const searchLocations = async (query) => {
  return handleDbOperation(
    async () => await supabase
      .from('locations')
      .select('*')
      .or(`city.ilike.%${query}%,state.ilike.%${query}%,zip.ilike.%${query}%`)
      .limit(10),
    getMockData('locations').filter(
      loc => loc.city.toLowerCase().includes(query.toLowerCase()) || 
             loc.state.toLowerCase().includes(query.toLowerCase()) ||
             loc.zip.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10)
  );
};

export const createLocation = async (locationData) => {
  return handleDbOperation(
    async () => await supabase
      .from('locations')
      .insert(locationData)
      .select()
      .single(),
    { ...locationData, id: `mock-${Date.now()}` }
  );
};

// -------------------------
// Equipment type functions
// -------------------------

export const getAllEquipmentTypes = async () => {
  return handleDbOperation(
    async () => await supabase
      .from('equipment_types')
      .select('*')
      .order('name'),
    getMockData('equipment_types')
  );
};

// -------------------------
// Market data functions
// -------------------------

export const getRecentMarketIndices = async (limit = 10) => {
  return handleDbOperation(
    async () => await supabase
      .from('market_indices')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit),
    getMockData('market_indices').slice(0, limit)
  );
};

export const getRecentFuelPrices = async (limit = 10) => {
  return handleDbOperation(
    async () => await supabase
      .from('fuel_prices')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit),
    getMockData('fuel_prices').slice(0, limit)
  );
};

// -------------------------
// Tag-related functions
// -------------------------

export const getAllTags = async () => {
  return handleDbOperation(
    async () => await supabase
      .from('tags')
      .select('*')
      .order('name'),
    getMockData('tags')
  );
};

export const createTag = async (tagData) => {
  return handleDbOperation(
    async () => await supabase
      .from('tags')
      .insert(tagData)
      .select()
      .single(),
    { ...tagData, id: `mock-${Date.now()}` }
  );
};

export const addTagToRFP = async (rfpId, tagId) => {
  return handleDbOperation(
    async () => await supabase
      .from('rfp_tags')
      .insert({ rfp_id: rfpId, tag_id: tagId })
      .select(),
    { rfp_id: rfpId, tag_id: tagId, id: `mock-${Date.now()}` }
  );
};

export const addTagToLane = async (laneId, tagId) => {
  return handleDbOperation(
    async () => await supabase
      .from('lane_tags')
      .insert({ lane_id: laneId, tag_id: tagId })
      .select(),
    { lane_id: laneId, tag_id: tagId, id: `mock-${Date.now()}` }
  );
};

export default {
  // User functions
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  
  // RFP functions
  getRFPs,
  getRFPById,
  createRFP,
  updateRFP,
  deleteRFP,
  
  // Lane functions
  getLanesByRFP,
  getLaneById,
  createLane,
  updateLane,
  deleteLane,
  
  // Rate functions
  getRatesByLane,
  addRate,
  updateRate,
  
  // Forecast functions
  getForecastsByLane,
  addForecast,
  
  // Location functions
  searchLocations,
  createLocation,
  
  // Equipment type functions
  getAllEquipmentTypes,
  
  // Market data functions
  getRecentMarketIndices,
  getRecentFuelPrices,
  
  // Tag functions
  getAllTags,
  createTag,
  addTagToRFP,
  addTagToLane,
}; 