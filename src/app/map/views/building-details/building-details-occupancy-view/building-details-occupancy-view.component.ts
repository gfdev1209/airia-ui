import { EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BuildingAnalytics, Occupancy } from '@map/models';

import { ChartComponent } from 'ng-apexcharts';

import * as moment from 'moment';
import { LineChartOptions } from '@shared/constants';
import { groupBy } from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-building-details-occupancy-view',
    templateUrl: './building-details-occupancy-view.component.html',
    styleUrls: ['./building-details-occupancy-view.component.scss'],
})
export class BuildingDetailsOccupancyViewComponent implements OnInit, OnChanges {
    @Input() analytics?: BuildingAnalytics | null;
    @Input() occupancy?: Occupancy | null;
    @Input() loading?: boolean | null;
    @Input() maximized!: boolean;
    @Input() tabChange: any;

    @Output() occupancyDateChanged = new EventEmitter<Date>();
    @Output() historicDateRangeChanged = new EventEmitter<Date[]>();

    @ViewChild('chart', { static: false }) chart?: ChartComponent;
    public chartOptions?: Partial<LineChartOptions>;

    chartData: {data:{hour:string,x:string,y:number}[]}[] = [];
    currentDate: Date = new Date();
    selectedDateRange:any;

    series: any[] = [];

    dateRange = [
        // {
        //   name: 'This Month',
        //   range: [
        //     moment(new Date()).subtract(1, 'months').startOf('month').toDate(),
        //     new Date(),
        //   ],
        // },
        // {
        //   name: 'Last Month',
        //   range: [
        //     moment(new Date()).subtract(1, 'months').startOf('month').toDate(),
        //     moment(new Date()).subtract(1, 'months').endOf('month').toDate(),
        //   ],
        // },
        {
            name: 'Last Week',
            range: [
                moment(new Date()).subtract(1, 'week').startOf('week').utc().toDate(),
                moment(new Date()).subtract(1, 'week').endOf('week').utc().toDate(),
            ],
        },
        {
            name: '2 Weeks Ago',
            range: [
              moment(new Date())
                .subtract(2, 'week')
                .startOf('week')
                .utc()
                .toDate(),
              moment(new Date())
                .subtract(2, 'week')
                .endOf('week')
                .utc()
                .toDate(),
            ],
        },
        {
            name: '3 Weeks Ago',
            range: [
               moment(new Date())
                .subtract(3, 'week')
                .startOf('week')
                .utc()
                .toDate(),
               moment(new Date())
                .subtract(3, 'week')
                .endOf('week')
                .utc()
                .toDate(),
            ],
        },
        {
            name: '4 Weeks Ago',
            range: [
               moment(new Date())
                .subtract(4, 'week')
                .startOf('week')
                .utc()
                .toDate(),
               moment(new Date())
                .subtract(4, 'week')
                .endOf('week')
                .utc()
                .toDate(),
            ],
        },
    ];
    historicDataRange: any;
    maxDateValue = new Date();
    occupancyDate: Date = new Date();

    maxOccupancy = 3000;
    occupancyLevels = [{ date: new Date(2021, 7, 1, 0), occupancy: 100 }];

    sampleData: any;
    sampleOptions: any;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.analytics && !changes.analytics.firstChange) {
            console.log(changes.analytics?.currentValue);
        }
        if (changes.occupancy && changes.occupancy.currentValue) {
            let occupancyData = this.mapOccupancyData(changes.occupancy.currentValue);
            
            this.chartData = Object.values(occupancyData).reverse();
            this.chartData?.map((item: any)=>{
                if(item['data'].length < 7){
                    for(let i = item['data']?.length; i < 7; i++){
                        item['data'].push({x:moment().day(i).format('ddd'), y:-1, hour:item['name']});
                    } 
                }
            })
            this.chartData.forEach(entry=>{
              const tranformedData=  entry.data.reduce((prev,curr,index)=>{
                   const dayEntry = prev.find(pre=>pre.x===curr.x);
                   if(dayEntry){
                       dayEntry.y = dayEntry.y + curr.y
                   }else{
                       prev.push(curr)
                   }
                    return prev
                },[] as {  hour: string;
                    x: string;
                    y: number;}[])

                   

                    tranformedData.map(t_data=>{
                        const totalDay = entry.data.reduce((prev,curr,index)=>{
                            if(curr.x===t_data.x){
                                prev = prev + 1;
                            
                            }
                            return prev
                        },0)

                        t_data.y = t_data.y/totalDay
                    })


                    entry.data = tranformedData;

            })
        }
        if ((changes.maximized && !changes.maximized?.firstChange) || changes.tabChange) {
            window.dispatchEvent(new Event('resize'));
        }
    }

    mapOccupancyData(occupancyDataResponse: Occupancy): { [id: string]: any } {
        let occupancyDataArray = occupancyDataResponse.occupancyStats as any;
        // Group data by the hour
        occupancyDataArray = Object.values(groupBy(occupancyDataArray, (i) => i.hour));
        // Create empty dictionary to store data
        const occupancyData: { [id: string]: any } = {};
        // Loop through each set of hourly data
        for (const key in occupancyDataArray) {
            if (key) {
                const data = occupancyDataArray[key];
                // Group hourly data by date
                const dataByDay = groupBy(
                    data,
                    (i) => i.day
                    // moment(new Date(i.year, i.month, i.day)).format('ddd')
                );
                // Convert to an array
                const dataArray: any = Object.values(dataByDay);
                occupancyData[key] = { name: key, data: dataArray };
                // dataArray.sort(
                //   (a: any, b: any) =>
                //     new Date(b[0].year, b[0].month - 1, b[0].day, b[0].hour).valueOf() -
                //     new Date(a[0].year, a[0].month - 1, a[0].day, a[0].hour).valueOf()
                // );
                // Go through each day
                for (const dayKey in dataArray) {
                    if (dayKey) {
                        const days = dataArray[dayKey];
                        // Calculate the average occupancy for all days in this hour
                        const average =
                            days.reduce((total: any, next: any) => {
                                const avg =
                                    next.averageOccupancy > 0
                                        ? (next.averageOccupancy / occupancyDataResponse.maxOccupancyHistoric) * 100
                                        : 0;
                                return total + avg;
                            }, 0) / days.length;
                        // Update dictionary value
                        dataArray[dayKey] = {
                            x: moment().day(dayKey).format('ddd'),
                            y: average,
                            hour: key,
                        };
                    }
                }
            }
        }
        return occupancyData;
    }

    ngOnInit(): void {
        this.currentDate = new Date();
    }

    updateChartData(): void {}

    onOccupancyCalendarSelect(newDate: Date): void {
        this.occupancyDate = newDate;
        this.occupancyDateChanged.emit(newDate);
    }
    onHistoricDateSelected(data: any): void {
        if(!this.selectedDateRange?.some((date:any)=>date==null)){
            this.historicDateRangeChanged.emit(this.selectedDateRange);
          }
    }
    onHistoricWeekSelected(data: any): void {
        console.log("data", data.value);
        this.historicDateRangeChanged.emit(data.value);
    }
    onCalendarOpen(event: any): void {
        this.currentDate = new Date();
    }

    onRefresh(){
        this.historicDataRange = this.dateRange[0];
        console.log("historicDataRange",this.historicDataRange);
        this.historicDateRangeChanged.emit(this.historicDataRange['range']);
        this.selectedDateRange = null;
    }

    stopPropagation($event: MouseEvent): void {
        $event.stopPropagation();
    }
}
