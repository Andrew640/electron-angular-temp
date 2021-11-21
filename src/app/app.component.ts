import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CpuTempService } from './services/cpu-temp/cpu-temp.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    cpuTemp: number = 0;

    constructor(
        private cpuTempService: CpuTempService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cpuTempService.cpuTemp.subscribe((value) => {
            this.cpuTemp = value;
            this.cdr.detectChanges();
        });

        this.cpuTempService.getTemp();

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
        });
    }
}
