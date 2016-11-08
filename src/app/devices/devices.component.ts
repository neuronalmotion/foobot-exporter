import { Component, Input, OnInit } from '@angular/core';

import { Device } from '../device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  @Input() devices: Device[];
  selectedDevice: Device;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(device: Device) {
  	this.selectedDevice = device;
  	console.log("selectedDevice is now " + this.selectedDevice.name);
  }
}
