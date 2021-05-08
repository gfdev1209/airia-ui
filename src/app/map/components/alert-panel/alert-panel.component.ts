import {
  Component,
  ElementRef,
  AfterContentInit,
  Input,
  OnInit,
} from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent implements OnInit {
  height: number = 0;
  overviewPanelHeight$ = this.mapService.overviewPanelHeight$;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}
}
