import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PalletData } from '@/demoData';

// Types
export interface PalletState {
  pallets: PalletData[];
  filteredPallets: PalletData[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string | null;
  selectedPallet: PalletData | null;
}

// Initial state
const initialState: PalletState = {
  pallets: [],
  filteredPallets: [],
  loading: false,
  error: null,
  searchTerm: '',
  statusFilter: null,
  selectedPallet: null,
};

// Async thunks for API calls (using demo data for now)
export const fetchPallets = createAsyncThunk(
  'pallets/fetchPallets',
  async () => {
    // Simulate API call with demo data
    const { demopalletData } = await import('@/demoData');
    return new Promise<PalletData[]>((resolve) => {
      setTimeout(() => resolve(demopalletData), 1000);
    });
  }
);

export const createPallet = createAsyncThunk(
  'pallets/createPallet',
  async (palletData: Omit<PalletData, 'id'>) => {
    // Simulate API call
    const newPallet: PalletData = {
      ...palletData,
      id: Math.random().toString(36).substr(2, 9),
    };
    return new Promise<PalletData>((resolve) => {
      setTimeout(() => resolve(newPallet), 500);
    });
  }
);

export const updatePallet = createAsyncThunk(
  'pallets/updatePallet',
  async ({ id, updates }: { id: string; updates: Partial<PalletData> }) => {
    // Simulate API call
    return new Promise<{ id: string; updates: Partial<PalletData> }>((resolve) => {
      setTimeout(() => resolve({ id, updates }), 500);
    });
  }
);

export const deletePallet = createAsyncThunk(
  'pallets/deletePallet',
  async (id: string) => {
    // Simulate API call
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  }
);

// Slice
const palletSlice = createSlice({
  name: 'pallets',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPallets = filterPallets(state.pallets, action.payload, state.statusFilter);
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.statusFilter = action.payload;
      state.filteredPallets = filterPallets(state.pallets, state.searchTerm, action.payload);
    },
    setSelectedPallet: (state, action: PayloadAction<PalletData | null>) => {
      state.selectedPallet = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.statusFilter = null;
      state.filteredPallets = state.pallets;
    },
  },
  extraReducers: (builder) => {
    // Fetch pallets
    builder
      .addCase(fetchPallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPallets.fulfilled, (state, action) => {
        state.loading = false;
        state.pallets = action.payload;
        state.filteredPallets = filterPallets(action.payload, state.searchTerm, state.statusFilter);
      })
      .addCase(fetchPallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pallets';
      })
      
    // Create pallet
      .addCase(createPallet.fulfilled, (state, action) => {
        state.pallets.push(action.payload);
        state.filteredPallets = filterPallets(state.pallets, state.searchTerm, state.statusFilter);
      })
      
    // Update pallet
      .addCase(updatePallet.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const index = state.pallets.findIndex(p => p.id === id);
        if (index !== -1) {
          state.pallets[index] = { ...state.pallets[index], ...updates };
        }
        state.filteredPallets = filterPallets(state.pallets, state.searchTerm, state.statusFilter);
      })
      
    // Delete pallet
      .addCase(deletePallet.fulfilled, (state, action) => {
        state.pallets = state.pallets.filter(p => p.id !== action.payload);
        state.filteredPallets = filterPallets(state.pallets, state.searchTerm, state.statusFilter);
      });
  },
});

// Helper function to filter pallets
const filterPallets = (pallets: PalletData[], searchTerm: string, statusFilter: string | null): PalletData[] => {
  let filtered = pallets;

  if (searchTerm) {
    filtered = filtered.filter(pallet => 
      pallet.palletNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pallet.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pallet.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pallet.origin?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter) {
    filtered = filtered.filter(pallet => pallet.status === statusFilter);
  }

  return filtered;
};

// Actions
export const { setSearchTerm, setStatusFilter, setSelectedPallet, clearFilters } = palletSlice.actions;

// Selectors
export const selectPallets = (state: { pallets: PalletState }) => state.pallets.pallets;
export const selectFilteredPallets = (state: { pallets: PalletState }) => state.pallets.filteredPallets;
export const selectPalletsLoading = (state: { pallets: PalletState }) => state.pallets.loading;
export const selectPalletsError = (state: { pallets: PalletState }) => state.pallets.error;
export const selectSearchTerm = (state: { pallets: PalletState }) => state.pallets.searchTerm;
export const selectStatusFilter = (state: { pallets: PalletState }) => state.pallets.statusFilter;
export const selectSelectedPallet = (state: { pallets: PalletState }) => state.pallets.selectedPallet;

export default palletSlice.reducer; 