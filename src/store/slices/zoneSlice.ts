import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { demoZones } from '@/demoData';

export interface Station {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  currentCount: number;
  targetCount: number;
  efficiency: number;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  currentCount: number;
  targetCount: number;
  efficiency: number;
  stations: Station[];
  performanceChange: number; // Percentage change from last period
  status: 'active' | 'inactive' | 'warning';
  lastUpdated: string;
}

export interface ZoneStats {
  totalZones: number;
  avgEfficiency: number;
  targetAchieved: number; // Percentage
  zonesMetTarget: number; // Count of zones that met their target
}

interface ZoneState {
  zones: Zone[];
  stats: ZoneStats;
  loading: boolean;
  error: string | null;
}

const initialState: ZoneState = {
  zones: [],
  stats: {
    totalZones: 0,
    avgEfficiency: 0,
    targetAchieved: 0,
    zonesMetTarget: 0
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchZones = createAsyncThunk(
  'zones/fetchZones',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return demoZones;
    } catch (error) {
      return rejectWithValue('Failed to fetch zones');
    }
  }
);

export const fetchZoneStats = createAsyncThunk(
  'zones/fetchZoneStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const state = getState() as RootState;
      const zones = state.zones.zones.length > 0 ? state.zones.zones : demoZones;
      
      const totalZones = zones.length;
      const avgEfficiency = zones.reduce((sum: number, zone: Zone) => sum + zone.efficiency, 0) / totalZones;
      const totalCurrent = zones.reduce((sum: number, zone: Zone) => sum + zone.currentCount, 0);
      const totalTarget = zones.reduce((sum: number, zone: Zone) => sum + zone.targetCount, 0);
      const targetAchieved = (totalCurrent / totalTarget) * 100;

      return {
        totalZones,
        avgEfficiency: Math.round(avgEfficiency * 10) / 10,
        targetAchieved: Math.round(targetAchieved * 10) / 10,
        zonesMetTarget: zones.filter(zone => zone.currentCount >= zone.targetCount).length
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch zone statistics');
    }
  }
);

export const refreshZones = createAsyncThunk(
  'zones/refreshZones',
  async (_, { dispatch }) => {
    await dispatch(fetchZones());
    await dispatch(fetchZoneStats());
  }
);

const zoneSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateZoneStatus: (state, action: PayloadAction<{ zoneId: string; status: Zone['status'] }>) => {
      const zone = state.zones.find(z => z.id === action.payload.zoneId);
      if (zone) {
        zone.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch zones
      .addCase(fetchZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZones.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload;
        state.error = null;
      })
      .addCase(fetchZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch zone stats
      .addCase(fetchZoneStats.pending, (state) => {
        // Don't set loading for stats to avoid UI flicker
      })
      .addCase(fetchZoneStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchZoneStats.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Refresh zones
      .addCase(refreshZones.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshZones.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { clearError, updateZoneStatus } = zoneSlice.actions;

// Selectors
export const selectZones = (state: RootState) => state.zones.zones;
export const selectZoneStats = (state: RootState) => state.zones.stats;
export const selectZonesLoading = (state: RootState) => state.zones.loading;
export const selectZonesError = (state: RootState) => state.zones.error;
export const selectZoneById = (id: string) => (state: RootState) => 
  state.zones.zones.find(zone => zone.id === id);

export default zoneSlice.reducer; 