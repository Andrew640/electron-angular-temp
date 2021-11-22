import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    ipApi = "https://api.ipregistry.co/?key=ax1g584zm265zdhi";

    constructor(private http: HttpClient) {}

    getLocationData(): Observable<any> {
        return this.http.get<any>(this.ipApi);
    }

    getWeatherData(lat: number, long: number): Observable<any> {
        return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=71cae88bed7cb054e8b8b0a6ba95ca4d`);
    }
}
