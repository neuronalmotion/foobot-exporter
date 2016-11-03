import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class FoobotService {

  private baseUrl = 'http://localhost:8001';

  constructor(private http: Http) { }

  getDevices(): Promise<Device[]> {
    const secretKey = '';
    const username = '';
    const headers = new Headers({
      'Content-Type': 'application/json'
      //'X-API-KEY-TOKEN': secretKey
    });
    const url = `${this.baseUrl}/devices/`;
    console.log(url);

    return this.http.get(url, {headers: headers})
      .toPromise()
      .then(response => response.json() as Device[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }


}
