// Common chart prop types
export interface BaseChartProps {
  loading?: boolean;
  height?: number;
  className?: string;
}

// Chart data types
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// Tooltip callback types
export interface TooltipCallbacks {
  title?: (tooltipItems: any[]) => string;
  label?: (context: any) => string;
  afterLabel?: (context: any) => string;
  beforeLabel?: (context: any) => string;
}

// Chart configuration types
export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
  data: ChartData;
  options?: any;
}

// Zone-specific chart data
export interface ZoneChartData {
  zoneName: string;
  currentCount: number;
  previousCount: number;
  targetCount: number;
  efficiency: number;
  status: 'active' | 'warning' | 'inactive';
}

// Comparison chart props
export interface ComparisonChartProps extends BaseChartProps {
  data: ZoneChartData[];
  showTarget?: boolean;
  showChange?: boolean;
} 