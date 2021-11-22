import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ipcRenderer } from 'electron';

@Injectable({
    providedIn: 'root',
})
export class CpuTempService {
    cpuTemp = new BehaviorSubject<number>(0);
    ipcRenderer: typeof ipcRenderer;

    constructor() {
        this.ipcRenderer = window.require('electron').ipcRenderer;

        this.ipcRenderer.on('getTemp', (event: any, cpuTemp: number) => {
            this.cpuTemp.next(cpuTemp);
        });
    }

    getTemp() {
        this.ipcRenderer.send('getTemp');
    }
}
