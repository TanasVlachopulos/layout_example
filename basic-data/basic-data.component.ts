import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
})
export class BasicDataComponent implements OnInit {
  showDate: boolean = true;
  time: string;
  day: string;
  month: string;
  date: string;
  standNumber: string;

  constructor(private configService: ConfigService) {
    this.standNumber = configService.config.standNumber || '00';
  }

  ngOnInit(): void {
    if (new Date(Date.now()).getFullYear() > 2000) {
      setInterval(() => {
        const date = DateTime.local().setLocale('pl');
        this.time = date.toLocaleString(DateTime.TIME_SIMPLE)
        this.date = date.toFormat('dd.MM.yyyy')
      }, 1);
    } else {
      this.showDate = false;
    }
  }
}
