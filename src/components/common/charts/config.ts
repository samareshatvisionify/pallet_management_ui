import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register all Chart.js components that we might use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Common chart configuration options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
          weight: 'normal' as const,
        }
      }
    },
    title: {
      display: false, // We'll use custom titles
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      cornerRadius: 8,
      displayColors: true,
    }
  },
};

// Bar chart specific options
export const barChartOptions = {
  ...defaultChartOptions,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
          weight: 'normal' as const,
        },
        maxRotation: 45,
        minRotation: 0,
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      }
    }
  },
};

// Line chart specific options
export const lineChartOptions = {
  ...defaultChartOptions,
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        font: {
          size: 11,
          weight: 'normal' as const,
        },
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        font: {
          size: 11,
        },
      }
    }
  },
};

// Pie/Doughnut chart specific options
export const pieChartOptions = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      ...defaultChartOptions.plugins.legend,
      position: 'right' as const,
    }
  }
}; 