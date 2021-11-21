import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ipcRenderer, webFrame } from 'electron';

// const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root',
})
export class CpuTempService {
    cpuTemp = new BehaviorSubject<number>(0);
    ipcRenderer!: typeof ipcRenderer;
    webFrame!: typeof webFrame;

    // get isElectron(): boolean {
    //     return !!(window && window.process && window.process.type);
    // }

    constructor() {
        // if (this.isElectron) {
        this.ipcRenderer = window.require('electron').ipcRenderer;

        console.log(this.ipcRenderer);

        this.ipcRenderer.on('getTemp', (event: any, cpuTemp: number) => {
            this.cpuTemp.next(cpuTemp);
            this.cpuTemp.subscribe((temp) => {
                console.log('temp is: ', temp);
            });
        });
        // }
    }

    getTemp() {
        this.ipcRenderer.send('getTemp');
    }
}
