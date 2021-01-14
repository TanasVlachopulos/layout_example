import { Component, OnInit } from '@angular/core';
import { IpcRendererEvent } from 'electron';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { FakeMeterlogicService } from './../../services/fake-meterlogic.service';

@Component({
  selector: 'app-meterlogic',
  templateUrl: './meterlogic.component.html',
  styleUrls: ['./meterlogic.component.scss'],
})
export class MeterlogicComponent implements OnInit {
  volume = new BehaviorSubject<string>('0000.000');
  totalPrice = new BehaviorSubject<string>('0000.000');
  pricePerLiter = new BehaviorSubject<string>('0000.000');
  measureUnit: string;
  currency: string;

  constructor(private electronService: ElectronService, private configService: ConfigService, private fakeMeterlogic: FakeMeterlogicService) {
    this.measureUnit = this.configService.config.measureUnit || '-/-';
    this.currency = this.configService.config.currency || '-';
  }
  ngOnInit(): void {
    if (this.electronService.isElectronApp) {
      this.readDataFromElectron();
    } else {
      this.generateFakeData();
    }
  }

  updateData(totalPrice: number, volume: number, pricePerVolume: number) {
    this.totalPrice.next(totalPrice.toFixed(3).padStart(8, ' '));
    this.volume.next(volume.toFixed(3).padStart(8, ' '));
    this.pricePerLiter.next(pricePerVolume.toFixed(3).padStart(8, ' '));
  }

  readDataFromElectron() {
    this.electronService.ipcRenderer.on('meterlogic-data', (event: IpcRendererEvent, arg: string) => {
      if (arg) {
        const meterlogicValues = arg.split(',');
        if (meterlogicValues.length === 3) {
          this.updateData(Number(meterlogicValues[0]), Number(meterlogicValues[1]), Number(meterlogicValues[2]));
        }
      }
    });
  }

  /**
   * Generate fake readings when is not electron app
   */
  generateFakeData() {
    setInterval(() => {
      this.updateData(this.fakeMeterlogic.getTotalPrice(), this.fakeMeterlogic.getVolume(), this.fakeMeterlogic.pricePerVolume);
    }, 500);
  }
}
