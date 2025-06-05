# Common Components

## StatCard

A reusable statistical card component that can be used throughout the application for displaying key metrics and statistics.

### Features
- **Consistent Design**: Unified look and feel across the application
- **Interactive**: Optional click handlers for navigation
- **Responsive**: Adapts to different screen sizes
- **Loading States**: Built-in loading support
- **Flexible**: Customizable colors, icons, and content

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The main title/label for the statistic |
| `value` | `string \| number` | ✅ | - | The main value to display |
| `suffix` | `string` | ❌ | - | Optional suffix (e.g., "%", "units") |
| `subtitle` | `string` | ❌ | - | Optional subtitle/description |
| `icon` | `ReactNode` | ✅ | - | Icon to display (usually from Ant Design icons) |
| `iconColor` | `string` | ❌ | `#484848` | Color for the icon |
| `backgroundColor` | `string` | ❌ | `#F8FAFC` | Background color of the card |
| `onClick` | `() => void` | ❌ | - | Click handler (makes card interactive) |
| `loading` | `boolean` | ❌ | `false` | Shows loading state |
| `className` | `string` | ❌ | `''` | Additional CSS classes |

### Usage Examples

#### Basic Usage
```tsx
import { StatCard } from '@/components';
import { UserOutlined } from '@ant-design/icons';

<StatCard
  title="Total Users"
  value={1250}
  icon={<UserOutlined />}
  iconColor="#1890ff"
/>
```

#### With Suffix and Subtitle
```tsx
<StatCard
  title="Efficiency"
  value={87.5}
  suffix="%"
  subtitle="Overall system performance"
  icon={<TrophyOutlined />}
  iconColor="#52c41a"
/>
```

#### Interactive Card
```tsx
<StatCard
  title="Active Zones"
  value={12}
  subtitle="Click to view details"
  icon={<EnvironmentOutlined />}
  iconColor="#722ed1"
  onClick={() => router.push('/zones')}
/>
```

#### With Loading State
```tsx
<StatCard
  title="Processing"
  value={processing ? '...' : processedCount}
  icon={<LoadingOutlined />}
  loading={processing}
/>
```

### Used In
- **Dashboard**: Main statistics cards
- **Zones**: Zone statistics overview
- **Other containers**: Can be reused anywhere statistics need to be displayed

### Benefits
- ✅ **DRY Principle**: Eliminates code duplication
- ✅ **Consistency**: Uniform appearance across the app
- ✅ **Maintainability**: Single source of truth for stat card styling
- ✅ **Flexibility**: Highly customizable while maintaining consistency
- ✅ **Accessibility**: Built-in focus states and semantic structure 