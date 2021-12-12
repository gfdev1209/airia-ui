import { ApexPlotOptions, ChartType } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid,
  ApexFill,
  ApexAnnotations,
  ApexTheme,
  ApexTooltip,
} from 'ng-apexcharts';

export type HeatmapChartOptions = {
  grid: ApexGrid;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors: any;
};

export const heatMapChartConfig = {
  grid: {
    show: false,
    row: {
      colors: ['#1d1522'],
      opacity: 1,
    },
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['#1d1522'],
  },
  legend: {
    show: false,
  },
  plotOptions: {
    heatmap: {
      radius: 0,
      distributed: false,
      enableShades: false,
      reverseNegativeShade: false,
      shadeIntensity: 0.5,
      useFillColorAsStroke: false,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 16,
            color: '#2a1d32',
          },
          {
            from: 16,
            to: 32,
            color: '#3f2a50',
          },
          {
            from: 32,
            to: 48,
            color: '#55376d',
          },
          {
            from: 48,
            to: 64,
            color: '#6a448b',
          },
          {
            from: 64,
            to: 80,
            color: '#8151a7',
          },
          {
            from: 80,
            to: 100,
            color: '#965ec5',
          },
        ],
        inverse: false,
        min: 0,
        max: 0,
      },
    },
  },
  series: [
    {
      name: 'Occupancy',
      data: [1, 1, 1, 1],
    },
  ],
  xaxis: {
    offsetY: 0,
    position: 'top' as 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      maxHeight: 28,
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'normal',
        colors: '#A29AA9',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
      },
    },
  },
  chart: {
    height: 120,
    redrawOnParentResize: true,
    type: 'heatmap' as 'heatmap',
    toolbar: {
      show: false,
    },
    background: '#1d1522',
    animations: {
      enabled: false,
    },
  },
  theme: {
    mode: 'dark' as 'dark',
    monochrome: {
      enabled: true,
      color: '#9F64D1',
      shadeTo: 'dark' as 'dark',
      shadeIntensity: 1,
    },
  },
  tooltip: {
    y: {
      formatter: (val: any) => {
        return val > -1 ? val + '%' : '';
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'normal',
    },
    formatter: (val: any) => {
      return val > -1 ? val + '%' : '';
    },
  },
};
