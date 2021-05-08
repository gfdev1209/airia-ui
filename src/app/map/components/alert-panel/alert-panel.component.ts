import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit {
  overviewPanelHeight$ = this.mapService.overviewPanelHeight$;
  alerts$ = this.mapService.alerts$;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}
}
