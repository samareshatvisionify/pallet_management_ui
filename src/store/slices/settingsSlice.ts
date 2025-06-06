import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface AISettings {
  confidenceThreshold: number;
  detectionSensitivity: number;
  qualityThreshold: number;
  enableAutoProcessing: boolean;
  enableQualityCheck: boolean;
}

export interface CameraSettings {
  recordingEnabled: boolean;
  fps: number;
  storageRetentionDays: number;
  autoBackup: boolean;
  enableMotionDetection: boolean;
  compressionLevel: number;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  emailAddress: string;
  smsEnabled: boolean;
  smsNumber: string;
  alertThreshold: number;
  enableDailyReports: boolean;
}

export interface SystemSettings {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  enableDebugMode: boolean;
  maxConcurrentProcessing: number;
  apiTimeout: number;
}

export interface PerformanceSettings {
  enableGPUAcceleration: boolean;
  maxMemoryUsage: number;
  processingThreads: number;
  enableCaching: boolean;
  cacheSize: number;
}

export interface SecuritySettings {
  sessionTimeout: number;
  passwordExpiry: number;
  enableTwoFactor: boolean;
  enableAuditLog: boolean;
  maxLoginAttempts: number;
}

export interface SettingsState {
  ai: AISettings;
  camera: CameraSettings;
  notifications: NotificationSettings;
  system: SystemSettings;
  performance: PerformanceSettings;
  security: SecuritySettings;
  loading: boolean;
  saving: boolean;
  error: string | null;
  lastSaved: string | null;
  isDirty: boolean;
}

// Initial state
const initialState: SettingsState = {
  ai: {
    confidenceThreshold: 85,
    detectionSensitivity: 75,
    qualityThreshold: 90,
    enableAutoProcessing: true,
    enableQualityCheck: true,
  },
  camera: {
    recordingEnabled: true,
    fps: 30,
    storageRetentionDays: 30,
    autoBackup: true,
    enableMotionDetection: true,
    compressionLevel: 80,
  },
  notifications: {
    emailEnabled: true,
    emailAddress: 'admin@company.com',
    smsEnabled: false,
    smsNumber: '',
    alertThreshold: 90,
    enableDailyReports: true,
  },
  system: {
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    enableDebugMode: false,
    maxConcurrentProcessing: 4,
    apiTimeout: 30000,
  },
  performance: {
    enableGPUAcceleration: true,
    maxMemoryUsage: 4096,
    processingThreads: 4,
    enableCaching: true,
    cacheSize: 1024,
  },
  security: {
    sessionTimeout: 30,
    passwordExpiry: 90,
    enableTwoFactor: false,
    enableAuditLog: true,
    maxLoginAttempts: 5,
  },
  loading: false,
  saving: false,
  error: null,
  lastSaved: null,
  isDirty: false,
};

// Async thunks
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be an API call
      return initialState;
    } catch (error) {
      return rejectWithValue('Failed to fetch settings');
    }
  }
);

export const saveSettings = createAsyncThunk(
  'settings/saveSettings',
  async (settings: Partial<SettingsState>, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would be an API call to save settings
      console.log('Saving settings:', settings);
      
      return {
        ...settings,
        lastSaved: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue('Failed to save settings');
    }
  }
);

export const resetSettings = createAsyncThunk(
  'settings/resetSettings',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return initialState;
    } catch (error) {
      return rejectWithValue('Failed to reset settings');
    }
  }
);

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // AI Settings
    updateAISettings: (state, action: PayloadAction<Partial<AISettings>>) => {
      state.ai = { ...state.ai, ...action.payload };
      state.isDirty = true;
    },

    // Camera Settings
    updateCameraSettings: (state, action: PayloadAction<Partial<CameraSettings>>) => {
      state.camera = { ...state.camera, ...action.payload };
      state.isDirty = true;
    },

    // Notification Settings
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
      state.isDirty = true;
    },

    // System Settings
    updateSystemSettings: (state, action: PayloadAction<Partial<SystemSettings>>) => {
      state.system = { ...state.system, ...action.payload };
      state.isDirty = true;
    },

    // Performance Settings
    updatePerformanceSettings: (state, action: PayloadAction<Partial<PerformanceSettings>>) => {
      state.performance = { ...state.performance, ...action.payload };
      state.isDirty = true;
    },

    // Security Settings
    updateSecuritySettings: (state, action: PayloadAction<Partial<SecuritySettings>>) => {
      state.security = { ...state.security, ...action.payload };
      state.isDirty = true;
    },

    // General actions
    clearError: (state) => {
      state.error = null;
    },

    markAsClean: (state) => {
      state.isDirty = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch settings
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.ai = action.payload.ai;
        state.camera = action.payload.camera;
        state.notifications = action.payload.notifications;
        state.system = action.payload.system;
        state.performance = action.payload.performance;
        state.security = action.payload.security;
        state.isDirty = false;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Save settings
      .addCase(saveSettings.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.saving = false;
        state.lastSaved = action.payload.lastSaved;
        state.isDirty = false;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })

      // Reset settings
      .addCase(resetSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.ai = action.payload.ai;
        state.camera = action.payload.camera;
        state.notifications = action.payload.notifications;
        state.system = action.payload.system;
        state.performance = action.payload.performance;
        state.security = action.payload.security;
        state.isDirty = false;
        state.lastSaved = null;
      })
      .addCase(resetSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const {
  updateAISettings,
  updateCameraSettings,
  updateNotificationSettings,
  updateSystemSettings,
  updatePerformanceSettings,
  updateSecuritySettings,
  clearError,
  markAsClean,
  setLoading,
} = settingsSlice.actions;

// Selectors
export const selectSettings = (state: { settings: SettingsState }) => state.settings;
export const selectAISettings = (state: { settings: SettingsState }) => state.settings.ai;
export const selectCameraSettings = (state: { settings: SettingsState }) => state.settings.camera;
export const selectNotificationSettings = (state: { settings: SettingsState }) => state.settings.notifications;
export const selectSystemSettings = (state: { settings: SettingsState }) => state.settings.system;
export const selectPerformanceSettings = (state: { settings: SettingsState }) => state.settings.performance;
export const selectSecuritySettings = (state: { settings: SettingsState }) => state.settings.security;
export const selectSettingsLoading = (state: { settings: SettingsState }) => state.settings.loading;
export const selectSettingsSaving = (state: { settings: SettingsState }) => state.settings.saving;
export const selectSettingsError = (state: { settings: SettingsState }) => state.settings.error;
export const selectSettingsLastSaved = (state: { settings: SettingsState }) => state.settings.lastSaved;
export const selectSettingsIsDirty = (state: { settings: SettingsState }) => state.settings.isDirty;

export default settingsSlice.reducer; 