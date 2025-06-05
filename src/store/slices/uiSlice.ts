import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: string;
}

export interface Modal {
  id: string;
  type: string;
  isOpen: boolean;
  data?: any;
}

export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: Modal[];
  loading: {
    global: boolean;
    [key: string]: boolean;
  };
  breadcrumbs: Array<{ label: string; path?: string }>;
}

// Initial state
const initialState: UIState = {
  sidebarCollapsed: false,
  theme: 'light',
  notifications: [],
  modals: [],
  loading: {
    global: false,
  },
  breadcrumbs: [],
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      
      // Keep only last 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Modals
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      const { type, data } = action.payload;
      const existingModal = state.modals.find(m => m.type === type);
      
      if (existingModal) {
        existingModal.isOpen = true;
        existingModal.data = data;
      } else {
        state.modals.push({
          id: Math.random().toString(36).substr(2, 9),
          type,
          isOpen: true,
          data,
        });
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modal = state.modals.find(m => m.type === action.payload);
      if (modal) {
        modal.isOpen = false;
      }
    },
    closeAllModals: (state) => {
      state.modals.forEach(modal => {
        modal.isOpen = false;
      });
    },

    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      const { key, loading } = action.payload;
      state.loading[key] = loading;
    },
    clearLoading: (state, action: PayloadAction<string>) => {
      delete state.loading[action.payload];
    },

    // Breadcrumbs
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path?: string }>>) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action: PayloadAction<{ label: string; path?: string }>) => {
      state.breadcrumbs.push(action.payload);
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
  },
});

// Actions
export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setGlobalLoading,
  setLoading,
  clearLoading,
  setBreadcrumbs,
  addBreadcrumb,
  clearBreadcrumbs,
} = uiSlice.actions;

// Selectors
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebarCollapsed;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectModals = (state: { ui: UIState }) => state.ui.modals;
export const selectModal = (type: string) => (state: { ui: UIState }) => 
  state.ui.modals.find(m => m.type === type);
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.loading.global;
export const selectLoading = (key: string) => (state: { ui: UIState }) => 
  state.ui.loading[key] || false;
export const selectBreadcrumbs = (state: { ui: UIState }) => state.ui.breadcrumbs;

export default uiSlice.reducer; 