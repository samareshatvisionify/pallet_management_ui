# Redux Store Documentation

This directory contains the complete Redux Toolkit setup for the VisionAI Pallet Management application.

## Structure

```
store/
├── index.ts                 # Store configuration and typed hooks
├── ReduxProvider.tsx        # Provider component
├── slices/
│   ├── palletSlice.ts      # Pallet management state
│   ├── dashboardSlice.ts   # Dashboard stats and metrics
│   └── uiSlice.ts          # UI state (sidebar, modals, notifications)
└── README.md               # This documentation
```

## Store Configuration

The store is configured using Redux Toolkit's `configureStore` with:

- **TypeScript Support**: Full type safety with `RootState` and `AppDispatch`
- **Dev Tools**: Enabled in development
- **Serializable Check**: Configured for potential persistence
- **Typed Hooks**: `useAppDispatch` and `useAppSelector`

## State Structure

```typescript
RootState = {
  pallets: PalletState,      // Pallet data, filters, loading states
  dashboard: DashboardState, // Dashboard metrics and system status
  ui: UIState               // UI state management
}
```

## Slices Overview

### 1. **Pallet Slice** (`palletSlice.ts`)

Manages all pallet-related state and operations.

**State:**
- `pallets`: Array of all pallets
- `filteredPallets`: Filtered/searched pallets
- `loading`: Loading state for async operations
- `searchTerm`: Current search filter
- `statusFilter`: Current status filter
- `selectedPallet`: Currently selected pallet

**Async Actions:**
- `fetchPallets()`: Load pallets from API
- `createPallet(data)`: Create new pallet
- `updatePallet({ id, updates })`: Update existing pallet
- `deletePallet(id)`: Delete pallet

**Sync Actions:**
- `setSearchTerm(term)`: Update search filter
- `setStatusFilter(status)`: Update status filter
- `setSelectedPallet(pallet)`: Set selected pallet
- `clearFilters()`: Clear all filters

### 2. **Dashboard Slice** (`dashboardSlice.ts`)

Manages dashboard statistics and system metrics.

**State:**
- `stats`: Dashboard statistics (totals, accuracy)
- `systemStatus`: System health metrics
- `loading`: Loading state
- `lastUpdated`: Last update timestamp

**Async Actions:**
- `fetchDashboardStats()`: Load dashboard statistics
- `fetchSystemStatus()`: Load system health status
- `refreshDashboard()`: Refresh all dashboard data

**Sync Actions:**
- `updateStat({ key, value })`: Update specific statistic
- `updateSystemStatus(status)`: Update system status
- `clearError()`: Clear error state

### 3. **UI Slice** (`uiSlice.ts`)

Manages global UI state and user interactions.

**State:**
- `sidebarCollapsed`: Sidebar visibility state
- `theme`: Application theme (light/dark)
- `notifications`: Array of notifications
- `modals`: Array of modal states
- `loading`: Loading states for different operations
- `breadcrumbs`: Navigation breadcrumbs

**Actions:**
- `toggleSidebar()`: Toggle sidebar collapse
- `addNotification(notification)`: Add notification
- `openModal({ type, data })`: Open modal
- `setTheme(theme)`: Change theme
- `setBreadcrumbs(crumbs)`: Set navigation breadcrumbs

## Usage Examples

### 1. **Basic Hook Usage**

```tsx
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPallets, selectFilteredPallets } from '@/store/slices/palletSlice';

const Component = () => {
  const dispatch = useAppDispatch();
  const pallets = useAppSelector(selectFilteredPallets);
  
  useEffect(() => {
    dispatch(fetchPallets());
  }, [dispatch]);
  
  return <div>{pallets.length} pallets</div>;
};
```

### 2. **Search Functionality**

```tsx
import { setSearchTerm, selectSearchTerm } from '@/store/slices/palletSlice';

const SearchComponent = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  
  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };
  
  return (
    <Input 
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};
```

### 3. **Loading States**

```tsx
import { selectPalletsLoading } from '@/store/slices/palletSlice';

const Component = () => {
  const loading = useAppSelector(selectPalletsLoading);
  
  return <Spin spinning={loading}>Content</Spin>;
};
```

### 4. **UI State Management**

```tsx
import { toggleSidebar, selectSidebarCollapsed } from '@/store/slices/uiSlice';

const SidebarToggle = () => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectSidebarCollapsed);
  
  return (
    <Button onClick={() => dispatch(toggleSidebar())}>
      {collapsed ? 'Expand' : 'Collapse'}
    </Button>
  );
};
```

### 5. **Notifications**

```tsx
import { addNotification } from '@/store/slices/uiSlice';

const Component = () => {
  const dispatch = useAppDispatch();
  
  const showSuccess = () => {
    dispatch(addNotification({
      type: 'success',
      title: 'Success',
      message: 'Operation completed successfully'
    }));
  };
  
  return <Button onClick={showSuccess}>Show Success</Button>;
};
```

## Selectors

Each slice exports selectors for accessing specific state:

```typescript
// Pallet selectors
selectPallets(state)           // All pallets
selectFilteredPallets(state)   // Filtered pallets
selectPalletsLoading(state)    // Loading state
selectSearchTerm(state)        // Current search term

// Dashboard selectors
selectDashboardStats(state)    // Dashboard statistics
selectSystemStatus(state)      // System health metrics
selectDashboardLoading(state)  // Loading state

// UI selectors
selectSidebarCollapsed(state)  // Sidebar state
selectTheme(state)            // Current theme
selectNotifications(state)     // All notifications
```

## Integration with Components

### Container Pattern

Containers connect to Redux and manage state:

```tsx
const DashboardContainer = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);
  
  return <DashboardView stats={stats} />;
};
```

### Component Pattern

Components receive data via props:

```tsx
interface DashboardViewProps {
  stats: DashboardStats;
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats }) => {
  return <Statistic value={stats.totalPallets} />;
};
```

## Async Operations

All async operations use Redux Toolkit's `createAsyncThunk`:

```typescript
export const fetchPallets = createAsyncThunk(
  'pallets/fetchPallets',
  async () => {
    const response = await api.getPallets();
    return response.data;
  }
);
```

**States handled automatically:**
- `pending`: Sets loading to true
- `fulfilled`: Updates data, sets loading to false
- `rejected`: Sets error, sets loading to false

## Best Practices

1. **Use Typed Hooks**: Always use `useAppDispatch` and `useAppSelector`
2. **Selector Memoization**: Selectors are automatically memoized
3. **Immutable Updates**: Redux Toolkit uses Immer for immutable updates
4. **Error Handling**: Always handle rejected states in async thunks
5. **Loading States**: Use loading states for better UX
6. **Normalization**: Consider normalizing data for complex relationships

## Testing

```typescript
import { store } from '@/store';
import { fetchPallets } from '@/store/slices/palletSlice';

// Dispatch actions in tests
store.dispatch(fetchPallets());

// Access state in tests
const state = store.getState();
expect(state.pallets.loading).toBe(true);
```

## DevTools

Redux DevTools are enabled in development for:
- Action history
- State inspection
- Time travel debugging
- Action replay

This Redux setup provides a robust foundation for state management that scales with the application's complexity. 