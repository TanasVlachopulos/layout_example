import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ClientStatus, StatusService } from './../../services/status.service';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
})
export class StatusIndicatorComponent implements OnInit {
  indicatorClass$ = new BehaviorSubject<string[]>(['gray']);

  constructor(private readonly statusService: StatusService) {}

  ngOnInit(): void {
    this.statusService.status$.subscribe((status) => {
      console.log('Incoming indicator status ', status);
      switch (status) {
        case ClientStatus.Connected:
          this.indicatorClass$.next(['green']);
          break;
        case ClientStatus.Connecting:
          this.indicatorClass$.next(['orange']);
          break;
        case ClientStatus.Disconnected:
          this.indicatorClass$.next(['red']);
          break;
        case ClientStatus.Offline:
          this.indicatorClass$.next(['gray']);
          break;
        case ClientStatus.Error:
          this.indicatorClass$.next(['red', 'blink']);
          break;
        case ClientStatus.Processing:
          this.indicatorClass$.next(['blue', 'blink']);
          break;
      }
    });
  }
}
