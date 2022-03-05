import {} from 'ng-apexcharts';

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
  ChartType,
} from 'ng-apexcharts';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  grid: ApexGrid;
  fill: ApexFill;
  annotations?: ApexAnnotations;
  theme: ApexTheme;
  forecastDataPoints: any;
  tooltip: ApexTooltip;
};

export const chartOptionsConfig: LineChartOptions = {
  series: [
    {
      name: 'Occupancy',
      data: [1, 1, 1, 1],
    },
  ],
  fill: {
    type: 'gradient',
    colors: ['#9F64D1'],
    gradient: {
      gradientToColors: ['#9F64D1'],
      shadeIntensity: 0.5,
      opacityFrom: 1,
      opacityTo: 0.75,
      stops: [0, 100],
    },
  },
  forecastDataPoints: {
    count: 7,
  },
  annotations: {
    xaxis: [
      {
        x: new Date('27 Feb 2022 4:00').getTime(),
        strokeDashArray: 2,
        borderColor: '#ee4057',
        label: {
          offsetY: -10,
          // offsetX: 12,
          textAnchor: 'middle',
          orientation: 'horizontal',
          borderColor: '#ee4057',
          style: {
            color: '#fff',
            background: '#ee4057',
            fontSize: '8px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          },
          text: 'LIVE',
        },
      },
    ],
  },
  tooltip: {
    enabled: true,
    followCursor: true,
    style: {
      fontSize: '12px',
      fontFamily: undefined,
    },
    x: {
      show: true,
      format: 'MMM dd, yyyy H:mm:ss',
    },
    y: {
      title: {
        formatter: (seriesName: any) => seriesName,
      },
      formatter: (value: any) => (value >= 0 ? value.toFixed(2) + '%' : 'n/a'),
    },
    // y: {
    //   formatter: (value: any, options: FormatterOptions) => {
    //     return `Hour ${
    //       options.w.config.series[options.seriesIndex].data[
    //         options.dataPointIndex
    //       ].hour
    //     }:   ${value.toFixed(2)}%`;
    //   },
    // },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ['#000'],
    },
    formatter: (val: any) => {
      return val > -1 ? val.toFixed(0) + '%' : '';
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 4,
      borderRadius: 2,
      borderWidth: 0,
      borderColor: '#fff',
      opacity: 0.5,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 0,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
  },
  theme: {
    mode: 'dark' as 'dark',
    palette: 'palette1',
    monochrome: {
      enabled: true,
      color: '#9F64D1',
      shadeTo: 'dark' as 'dark',
      shadeIntensity: 0.65,
    },
  },
  chart: {
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
    type: 'area' as ChartType,
    height: 160,
    offsetY: -20,
    background: '#1d1522',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    colors: ['#E1C6F9c2'],
    curve: 'smooth' as 'smooth',
    width: 3,
  },

  title: {},
  subtitle: {
    align: 'left' as 'left',
  },
  labels: ['a', 'b', 'c', 'd'],
  xaxis: {
    type: 'datetime' as 'datetime',
    tickAmount: 0,
    labels: {
      show: true,
      datetimeUTC: false,
      offsetY: -4,
      style: {
        fontSize: '9px',
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    min: 0,
    max: 100,
    seriesName: 'occupancy',
    tickAmount: 2,
    forceNiceScale: false,
    labels: {
      show: true,
      maxWidth: 20,
      style: {
        fontSize: '9px',
      },
      formatter: (value: any) => {
        return value.toFixed(0) + '%';
      },
    },
  },
  legend: {
    horizontalAlign: 'left' as 'left',
  },
  grid: {
    borderColor: '#aaaaaaab',
    row: {
      opacity: 1,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
};
