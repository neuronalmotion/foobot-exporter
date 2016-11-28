import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Device } from './device';
import { DEVICES } from './mock-devices'
import { environment } from '../environments/environment'

@Injectable()
export class FoobotService {

    @Output() devicesChangeEvent: EventEmitter<Device[]> = new EventEmitter<Device[]>(true);
    @Output() selectedDeviceEvent: EventEmitter<Device> = new EventEmitter<Device>(true);

    private baseUrl: string;
    private username: string;
    private secretKey: string;
    private selectedDevice: Device;

    constructor(private http: Http) {
        this.baseUrl = environment.baseUrl;
    }

    setCredentials(username, secretKey): void {
        this.username = username;
        this.secretKey = secretKey;

        this.getDevices()
            .subscribe(
                devices => this.devicesChangeEvent.emit(devices),
                error => this.handleError(error)
            );
    }

    // FIXME repair Mock with Observable
    //getDevicesMock(): Promise<Device[]> {
        //return Promise.resolve(DEVICES);
    //}

    getDevices(): Observable<Device[]> {
        const secretKey = '';
        const username = encodeURIComponent(this.username);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Api-Key-Token': this.secretKey
        });
        const url = `${this.baseUrl}/owners/${username}/devices/`;
        console.log(url);

        return this.http.get(url, {headers: headers})
            .map(response => response.json() as Device[])
    }

    getDatapoints(uuid, period, averageBy, fileformat='application/json') {
        const secretKey = '';
        const username = encodeURIComponent(this.username);

        const headers = new Headers({
            'responseType': 'blob',
            'Accept': fileformat,
            'X-Api-Key-Token': this.secretKey
        });

        const options = new RequestOptions({
            headers: headers,
            responseType: ResponseContentType.Blob
        });

        const url = `${this.baseUrl}/devices/${uuid}/datapoints/${period}/last/${averageBy}/`;
        console.log(url);

        return this.http.get(url, options)
            .map(response => {
                console.log(response.blob());
                return response.blob();
            });
    }

    setSelectedDevice(device: Device): void {
        this.selectedDevice = device;
        this.selectedDeviceEvent.emit(device);
    }

    private handleError(error: any): void {
        console.error('An error occured', error);
    }

}
