import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface DashboardStats {
  totalPallets: number;
  activeScans: number;
  processedToday: number;
  aiAccuracy: number;
}

export interface SystemStatus {
  visionAI: number;
  databaseConnection: number;
  apiServices: number;
  storageUsage: number;
}

export interface DashboardState {
  stats: DashboardStats;
  systemStatus: SystemStatus;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// Initial state
const initialState: DashboardState = {
  stats: {
    totalPallets: 0,
    activeScans: 0,
    processedToday: 0,
    aiAccuracy: 0,
  },
  systemStatus: {
    visionAI: 100,
    databaseConnection: 100,
    apiServices: 95,
    storageUsage: 68,
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    // Simulate API call
    const { dashboardStats } = await import('@/demoData');
    return new Promise<DashboardStats>((resolve) => {
      setTimeout(() => resolve(dashboardStats), 800);
    });
  }
);

export const fetchSystemStatus = createAsyncThunk(
  'dashboard/fetchSystemStatus',
  async () => {
    // Simulate API call for system status
    const systemStatus: SystemStatus = {
      visionAI: Math.floor(Math.random() * 5) + 95, // 95-100%
      databaseConnection: Math.floor(Math.random() * 5) + 95, // 95-100%
      apiServices: Math.floor(Math.random() * 10) + 90, // 90-100%
      storageUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
    };
    
    return new Promise<SystemStatus>((resolve) => {
      setTimeout(() => resolve(systemStatus), 500);
    });
  }
);

export const refreshDashboard = createAsyncThunk(
  'dashboard/refresh',
  async (_, { dispatch }) => {
    // Refresh both stats and system status
    await Promise.all([
      dispatch(fetchDashboardStats()),
      dispatch(fetchSystemStatus()),
    ]);
  }
);

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateStat: (state, action: PayloadAction<{ key: keyof DashboardStats; value: number }>) => {
      const { key, value } = action.payload;
      state.stats[key] = value;
      state.lastUpdated = new Date().toISOString();
    },
    updateSystemStatus: (state, action: PayloadAction<Partial<SystemStatus>>) => {
      state.systemStatus = { ...state.systemStatus, ...action.payload };
      state.lastUpdated = new Date().toISOString();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      })
      
    // Fetch system status
      .addCase(fetchSystemStatus.fulfilled, (state, action) => {
        state.systemStatus = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      
    // Refresh dashboard
      .addCase(refreshDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshDashboard.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

// Actions
export const { updateStat, updateSystemStatus, clearError } = dashboardSlice.actions;

// Selectors
export const selectDashboardStats = (state: { dashboard: DashboardState }) => state.dashboard.stats;
export const selectSystemStatus = (state: { dashboard: DashboardState }) => state.dashboard.systemStatus;
export const selectDashboardLoading = (state: { dashboard: DashboardState }) => state.dashboard.loading;
export const selectDashboardError = (state: { dashboard: DashboardState }) => state.dashboard.error;
export const selectLastUpdated = (state: { dashboard: DashboardState }) => state.dashboard.lastUpdated;

export default dashboardSlice.reducer; 