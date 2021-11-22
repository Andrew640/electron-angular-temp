import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CpuTempService } from './services/cpu-temp/cpu-temp.service';
import { WeatherService } from './services/weather/weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    cpuTemp: number = 0;
    weatherTemp: number = 0;

    constructor(
        private cpuTempService: CpuTempService,
        private weatherService: WeatherService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cpuTempService.cpuTemp.subscribe((value) => {
            this.cpuTemp = value;
            this.cdr.detectChanges();
        });

        this.cpuTempService.getTemp();
        this.getWeatherTemp()
    }

    getWeatherTemp(): void {
        this.weatherService.getLocationData().subscribe(ipInfo => {
            this.weatherService.getWeatherData(ipInfo.location.latitude, ipInfo.location.longitude).subscribe(data => {
                this.weatherTemp = data.main.temp;
            });
        });
    }

    getHowHot(): string {
        if (this.cpuTemp < 35) {
            return 'normal';
        } else if (this.cpuTemp >= 35 && this.cpuTemp <= 65) {
            return 'warm'
        } else if (this.cpuTemp > 65 && this.cpuTemp <= 85) {
            return 'hot'
        } else if (this.cpuTemp > 85) {
            return 'veryHot'
        }
    }
}
