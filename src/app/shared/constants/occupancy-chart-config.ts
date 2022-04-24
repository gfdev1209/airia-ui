import {} from 'ng-apexcharts';

import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexGrid,
    ApexFill,
    ApexAnnotations,
    ApexTheme,
    ApexTooltip,
} from 'ng-apexcharts';

export type OccupancyChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
    theme: ApexTheme;
    tooltip: ApexTooltip;
    fill: ApexFill;
    annotations: ApexAnnotations;
};

export const occupancyChartOptionsConfig: any = {
    series: [
        {
            name: 'High Threshold',
            type: 'area',
            data: [1, 1, 1, 1],
        },
        {
            name: 'Low Threshold',
            type: 'area',
            data: [1, 1, 1, 1],
        },
        {
            name: 'Occupancy',
            type: 'line',
            data: [1, 1, 1, 1],
        },
    ],
    theme: {
        mode: 'dark' as 'dark',
    },
    chart: {
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        type: 'area',
        height: 350,
        stacked: false,
        background: '#1d1522',
        animations: {
            enabled: true,
        },
        selection: {
            enabled: true,
            type: 'x',
            fill: {
                color: '#ff0000',
                opacity: 0.5,
            },
            stroke: {
                width: 1,
                dashArray: 3,
                color: '#24292e',
                opacity: 0.4,
            },
            xaxis: {
                min: new Date('11 Feb 2022 GMT').getTime(),
                max: new Date('11 Feb 2022 GMT').getTime() + 600000 * 3,
            },
        },
        events: {
            selection: (chart: any, e: any) => {
                console.log(new Date(e.xaxis.min));
            },
        },
    },
    annotations: {
        xaxis: [
            {
                x: 1644540600000,
                x2: 1644542400000,
                borderColor: '#000',
                fillColor: '#ff0000',
                label: {
                    text: 'a',
                    borderColor: 'transparent',
                    style: {
                        color: 'transparent',
                        background: 'transparent',
                    },
                },
            },
        ],
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [2],
        formatter: (val: any, opts: any) => {
            return val;
        },
        style: {
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#000'],
        },
    },
    colors: ['rgba(255, 0, 0, .5)', 'rgba(103, 64, 230, .75)', '#ffffff'],
    fill: {
        colors: ['rgba(255, 0, 0, .1)', 'rgba(103, 64, 230, 0.5)', '#ffffff'],
        opacity: 1,
        type: 'solid',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.5,
            opacityFrom: 1,
            opacityTo: 1,
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
    },
    xaxis: {
        type: 'datetime',
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
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: (y: any) => {
                if (typeof y !== 'undefined') {
                    return y.toFixed(0) + ' points';
                }
                return y;
            },
        },
    },
};