# Ant Design Configuration

This directory contains the complete Ant Design setup for the VisionAI Pallet Management project.

## Structure

```
lib/
├── index.ts                 # Main exports file
├── antd-config.tsx          # Theme and provider configuration
├── AntdRegistry.tsx         # SSR style registry
├── antd-locale.ts           # Internationalization settings
├── antd-utils.ts           # Common utilities and helpers
└── README.md               # This documentation
```

## Files Overview

### `antd-config.tsx`
- **Purpose**: Central theme configuration and provider setup
- **Features**:
  - Custom theme with design tokens
  - Component-specific styling
  - Geist font integration
  - Locale support
  - App wrapper for static functions

### `AntdRegistry.tsx`
- **Purpose**: Server-side rendering support
- **Features**:
  - CSS-in-JS cache management
  - Style extraction for SSR
  - Prevents FOUC (Flash of Unstyled Content)

### `antd-locale.ts`
- **Purpose**: Internationalization configuration
- **Features**:
  - Locale settings
  - Expandable for multiple languages
  - Type-safe locale handling

### `antd-utils.ts`
- **Purpose**: Common utilities and configurations
- **Features**:
  - Notification helpers
  - Message helpers
  - Modal configurations
  - Table/Form defaults
  - Responsive breakpoints
  - Color and size utilities

### `index.ts`
- **Purpose**: Clean exports and re-exports
- **Features**:
  - Centralized imports
  - Common component re-exports
  - Icon re-exports
  - Utility re-exports

## Usage

### Basic Import
```tsx
import { AntdProvider, StyledComponentsRegistry } from '@/app/lib';
```

### Component Usage
```tsx
import { Button, Card, Table } from '@/app/lib';
// or
import { Button, Card, Table } from 'antd';
```

### Utilities Usage
```tsx
import { 
  showSuccessMessage, 
  showConfirmModal,
  defaultTableProps 
} from '@/app/lib';
```

## Theme Customization

The theme is configured in `antd-config.tsx` with the following structure:

- **Token System**: Global design tokens (colors, spacing, typography)
- **Component Tokens**: Component-specific customizations
- **Algorithm**: Theme algorithm (default, dark, compact)

### Customizing Colors
```tsx
// In antd-config.tsx
token: {
  colorPrimary: '#1890ff',    // Primary brand color
  colorSuccess: '#52c41a',    // Success states
  colorWarning: '#faad14',    // Warning states
  colorError: '#f5222d',      // Error states
}
```

### Customizing Components
```tsx
// In antd-config.tsx
components: {
  Button: {
    borderRadius: 6,
    controlHeight: 32,
    fontWeight: 500,
  },
}
```

## Best Practices

1. **Import Organization**: Use the centralized exports from `@/app/lib`
2. **Theme Consistency**: All customizations should go through the theme system
3. **Utility Functions**: Use provided utilities for common operations
4. **Type Safety**: Leverage TypeScript types for theme and component props
5. **Performance**: The SSR registry ensures optimal loading performance

## Adding New Configurations

### New Locale
1. Import locale from `antd/locale/[locale]`
2. Add to `locales` object in `antd-locale.ts`
3. Update provider with dynamic locale switching if needed

### New Utility Functions
1. Add to `antd-utils.ts`
2. Export from `index.ts`
3. Follow existing patterns for consistency

### Theme Updates
1. Modify `antdTheme` in `antd-config.tsx`
2. Use design tokens over hardcoded values
3. Test across all components

## Compatibility

- **Next.js**: 15.3.3+ with App Router
- **React**: 19.0.0+
- **Ant Design**: 5.25.4+
- **TypeScript**: 5+

## Troubleshooting

### SSR Issues
- Ensure `StyledComponentsRegistry` wraps the app
- Check for client-only code in server components

### Theme Not Applied
- Verify `AntdProvider` wraps your components
- Check theme token names against Ant Design documentation

### Performance Issues
- Use dynamic imports for large components
- Optimize bundle size with tree shaking 