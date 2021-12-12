import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Building, BuildingAnalytics } from '@map/models';
import { Subject } from 'rxjs';
import { slidePanelAnimation } from 'src/app/app.animations';

@Component({
  selector: 'app-building-details-view',
  templateUrl: './building-details-view.component.html',
  styleUrls: ['./building-details-view.component.scss'],
  animations: [slidePanelAnimation],
})
export class BuildingDetailsViewComponent implements OnInit {
  @Input() building?: Building | null;
  @Input() showDetails?: boolean | null = false;

  @Output() closed = new EventEmitter();

  private tabChange: Subject<number> = new Subject();
  tabChange$ = this.tabChange.asObservable();

  maximized = false;

  constructor() {}

  ngOnInit(): void {}

  onTabChange(event: any): void {
    this.tabChange.next(event.index);
  }

  onHide(): void {
    this.maximized = false;
    this.closed.emit();
  }

  onMaximize(evt: any): void {
    this.maximized = evt.maximized;
  }
}
