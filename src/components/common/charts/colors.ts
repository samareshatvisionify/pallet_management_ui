// Application color scheme for charts
export const chartColors = {
  primary: '#484848',
  secondary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  light: '#E5E7EB',
  info: '#06B6D4',
  purple: '#8B5CF6',
  pink: '#EC4899',
  orange: '#F97316',
  gray: '#6B7280',
};

// Chart color palettes for different chart types
export const chartPalettes = {
  // Primary palette for most charts
  primary: [
    chartColors.primary,
    chartColors.secondary,
    chartColors.success,
    chartColors.warning,
    chartColors.danger,
    chartColors.info,
    chartColors.purple,
    chartColors.pink,
  ],
  
  // Status colors for zone/station status
  status: {
    active: chartColors.success,
    warning: chartColors.warning,
    inactive: chartColors.danger,
    maintenance: chartColors.orange,
  },
  
  // Performance colors for efficiency metrics
  performance: {
    excellent: chartColors.success,
    good: chartColors.secondary,
    average: chartColors.warning,
    poor: chartColors.danger,
  },
  
  // Comparison colors for current vs previous
  comparison: {
    current: chartColors.secondary,
    previous: chartColors.light,
    target: chartColors.success,
  },
  
  // Gradient colors for backgrounds
  gradients: {
    blue: ['#3B82F6', '#1D4ED8'],
    green: ['#10B981', '#047857'],
    orange: ['#F59E0B', '#D97706'],
    red: ['#EF4444', '#DC2626'],
    purple: ['#8B5CF6', '#7C3AED'],
  },
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Helper function to generate chart dataset colors
export const generateDatasetColors = (count: number, palette: string[] = chartPalettes.primary) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(palette[i % palette.length]);
  }
  return colors;
}; 