import { Component, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';
import { Device } from '../device';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

    devices: Device[];
    selectedDevice: Device;

    constructor(private foobotService: FoobotService) {
    }

    ngOnInit() {
        this.foobotService.devicesChangeEvent.subscribe(
            devices => this.devices = devices);
    }

    onSelect(device: Device) {
        this.selectedDevice = device;
        this.foobotService.setSelectedDevice(device);
        console.log("selectedDevice is now " + this.selectedDevice.name);
    }
}
