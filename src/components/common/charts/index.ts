// Chart configurations
export {
  defaultChartOptions,
  barChartOptions,
  lineChartOptions,
  pieChartOptions,
} from './config';

// Chart colors and palettes
export {
  chartColors,
  chartPalettes,
  getColorWithOpacity,
  generateDatasetColors,
} from './colors';

// Chart types
export type {
  BaseChartProps,
  ChartDataset,
  ChartData,
  TooltipCallbacks,
  ChartConfig,
  ZoneChartData,
  ComparisonChartProps,
} from './types';

// Chart utilities
export {
  convertZonesToChartData,
  generateComparisonDatasets,
  generateEfficiencyDataset,
  comparisonTooltipCallbacks,
  formatChartValue,
  calculatePercentageChange,
  getStatusColor,
  generateChartLabels,
  // New station utilities
  convertStationsToChartData,
  generateTargetComparisonDatasets,
  generateStationChartLabels,
} from './utils';

// Zone Chart Components
export { default as ZoneComparisonChart } from './ZoneComparisonChart';
export { default as ZoneEfficiencyChart } from './ZoneEfficiencyChart';
export { default as ZoneStatusChart } from './ZoneStatusChart';

// Generic Chart Components
export { default as ComparisonChart } from './ComparisonChart';

// Camera Chart Components
export { default as CameraActivityTimelineChart } from './CameraActivityTimelineChart';
export { default as CameraHourlyActivityChart } from './CameraHourlyActivityChart';
export { default as CameraWeeklyTrendChart } from './CameraWeeklyTrendChart'; 