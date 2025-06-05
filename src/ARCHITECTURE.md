# VisionAI Pallet Management - Architecture Guide

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (imports dashboard container)
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Layout/           # Layout components
│   │   ├── MainLayout.tsx # Main app layout with sidebar
│   │   └── index.ts      # Layout exports
│   └── index.ts          # All component exports
├── containers/           # Page-level containers (business logic)
│   ├── DashboardContainer.tsx # Dashboard page logic
│   └── index.ts          # Container exports
├── lib/                 # Shared utilities and configurations
│   ├── AntdRegistry.tsx # Ant Design SSR registry
│   ├── AntdProvider.tsx # Ant Design provider
│   └── index.ts         # Lib exports
└── demoData/           # Sample data for development
    ├── palletData.ts   # Pallet and activity data
    └── index.ts        # Demo data exports
```

## Architecture Rules

### 1. **Containers** (`/containers`)
- **Purpose**: Define page layouts and business logic
- **Responsibility**: 
  - Handle page-level state management
  - Orchestrate data flow
  - Import and compose reusable components
  - Define page structure and layout
- **Import Pattern**: 
  ```tsx
  import { MainLayout } from '@/components';
  import { SomeComponent } from '@/components';
  ```

### 2. **Components** (`/components`)
- **Purpose**: Reusable UI components
- **Responsibility**:
  - Pure UI components with minimal business logic
  - Receive data via props
  - Emit events via callbacks
  - Focus on reusability and composition
- **Export Pattern**: Always export through index files for clean imports

### 3. **App Router** (`/app`)
- **Purpose**: Next.js routing and page rendering
- **Responsibility**:
  - Import containers for specific routes
  - Handle routing logic
  - Minimal to no business logic
- **Pattern**:
  ```tsx
  // app/page.tsx
  import { DashboardContainer } from '@/containers';
  export default function Home() {
    return <DashboardContainer />;
  }
  ```

### 4. **Demo Data** (`/demoData`)
- **Purpose**: Development and testing data
- **Responsibility**:
  - Provide mock data for development
  - Define data interfaces/types
  - Simulate API responses

## Common Layout with Sidebar

The application uses a persistent layout (`MainLayout`) that is configured at the root level:

### Key Benefits:
- **Persistent Navigation**: Sidebar and header remain static during page transitions
- **Performance**: Only page content re-renders, not the entire layout
- **Smooth UX**: No layout flicker between page navigations
- **State Persistence**: Sidebar collapse state maintained across routes

### Implementation:
The `MainLayout` is wrapped at the root level in `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AntdProvider>
            <MainLayout>
              {children}  {/* Only this content changes on navigation */}
            </MainLayout>
          </AntdProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
```

### Features:
- **Collapsible Sidebar**: Can be toggled via hamburger menu
- **Navigation Menu**: Links to different sections of the app
- **Header**: Contains toggle button and user info
- **Content Area**: Renders page-specific content (children)
- **Responsive Design**: Works on desktop and mobile

### Navigation Structure:
- Dashboard (/)
- Pallet Management (/pallets)
- Analytics (/analytics)
- Vision AI (/vision-ai)
- Profile (/profile)
- Settings (/settings)

### Usage in Containers:
```tsx
// Containers DO NOT wrap with MainLayout anymore
const YourContainer = () => {
  return (
    <div>
      {/* Your page content here - no MainLayout wrapper needed */}
    </div>
  );
};
```

## Development Workflow

### Adding a New Page:
1. **Create Container**: `src/containers/YourPageContainer.tsx`
   ```tsx
   const YourPageContainer = () => {
     return (
       <div>
         {/* Page content - MainLayout is already at root level */}
         <Title level={2}>Your Page</Title>
         {/* Your components here */}
       </div>
     );
   };
   ```

2. **Export Container**: Add to `src/containers/index.ts`
   ```tsx
   export { default as YourPageContainer } from './YourPageContainer';
   ```

3. **Create Route**: Add to `src/app/your-route/page.tsx`
   ```tsx
   import { YourPageContainer } from '@/containers';
   export default function YourPage() {
     return <YourPageContainer />;
   }
   ```

### Adding Reusable Components:
1. **Create Component**: `src/components/YourComponent/YourComponent.tsx`
2. **Export Component**: Add to `src/components/YourComponent/index.ts`
3. **Add to Main Export**: Add to `src/components/index.ts`

### Adding Demo Data:
1. **Create Data File**: `src/demoData/yourData.ts`
2. **Export Data**: Add to `src/demoData/index.ts`

## Best Practices

### Import Organization:
```tsx
// 1. External libraries
import React from 'react';
import { Button, Card } from 'antd';

// 2. Internal components/containers
import { MainLayout } from '@/components';
import { SomeContainer } from '@/containers';

// 3. Demo data and utilities
import { demoData } from '@/demoData';
```

### Component Structure:
```tsx
'use client'; // Only if needed for client-side features

import React from 'react';
// imports...

interface ComponentProps {
  // props definition
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // component logic
  
  return (
    // JSX
  );
};

export default Component;
```

### Type Safety:
- Define interfaces for all data structures
- Use TypeScript for all components
- Export types from demo data for reuse

## Ant Design Integration

- **Provider**: Configured in `src/lib/AntdProvider.tsx`
- **SSR Support**: Handled by `src/lib/AntdRegistry.tsx`
- **Theme**: Customized to match project design
- **Components**: Import directly from 'antd' or through component re-exports

This architecture ensures:
- ✅ **Separation of Concerns**: Clear boundaries between UI and business logic
- ✅ **Reusability**: Components can be used across multiple containers
- ✅ **Maintainability**: Easy to locate and modify specific functionality
- ✅ **Scalability**: Structure supports growth and new features
- ✅ **Consistency**: Common layout ensures uniform user experience 