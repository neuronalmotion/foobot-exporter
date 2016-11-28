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
    @Output() datapointsEvent: EventEmitter<Blob> = new EventEmitter<Blob>(true);
    @Output() errorEvent: EventEmitter<string> = new EventEmitter<string>(true);
    @Output() hideErrorEvent: EventEmitter<any> = new EventEmitter<any>(true);

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
                devices => {
                    this.devicesChangeEvent.emit(devices);
                    this.hideErrorEvent.emit(null);
                },
                error => this.handleError('Could not authentication you', error)
            );
    }

    getDevicesMock(): Observable<Device[]> {
        return Observable.of(DEVICES);
    }

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

    loadDatapoints(uuid, period, averageBy, fileformat='application/json') {
        console.log(uuid);
        if (!uuid) {
            this.handleError('Could not load datapoints', 'no device is selected');
            return;
        }
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

        this.http.get(url, options)
            .map(response => response.blob())
            .subscribe(
                blob => {
                    this.datapointsEvent.emit(blob);
                    this.hideErrorEvent.emit(null);
                },
                err => this.handleError('Could not load datapoints', err)
            );
    }

    setSelectedDevice(device: Device): void {
        this.selectedDevice = device;
        this.selectedDeviceEvent.emit(device);
    }

    private handleError(actionMsg: string, error: Response | any): void {
        let errMsg: string;
        console.log(error);
        if (error instanceof Response) {
            let message: string;
            console.log(error.status);

            switch(error.status) {
                case 0:
                    message = 'foobot-exporter is unreachable. Try again in a few minutes';
                break;

                case 403:
                    message = 'invalid credentials, check your <strong>Username</strong> and <strong>Secrey Key</strong>';
                break;

                case 404:
                    message = 'resource not found';
                break;

                case 500:
                    message = 'something went wrong with foobot-exporter. Please contact us so we can fix this!'
                break;

                default:
                    message = error.statusText || '';
                break;
            }
            errMsg = `${actionMsg}: ${message}`;
        } else {
            errMsg = `${actionMsg}: ${error}`;
        }
        this.errorEvent.emit(errMsg);
    }

}
