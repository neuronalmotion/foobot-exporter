import { Component, Input, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';
import { Device } from '../device';
import { FileFormat } from '../file-format';
import { FILEFORMATS } from '../file-format'

@Component({
    selector: 'app-datapoint',
    templateUrl: './datapoint.component.html',
    styleUrls: ['./datapoint.component.css']
})
export class DatapointComponent implements OnInit {

    device: Device;
    startDate : string;
    fileformats : FileFormat[];
    selectedFileformat: FileFormat;

    constructor(private foobotService: FoobotService) {
        this.fileformats = FILEFORMATS;
        this.selectedFileformat = this.fileformats[0];
    }

    ngOnInit() {
        this.foobotService.selectedDeviceEvent.subscribe(
            device => this.device = device);

        this.foobotService.datapointsEvent.subscribe(
            blob => this.generateDownloadLink(blob));
    }

    onDownload(): void {
        let date = new Date(this.startDate).getTime();
        let now = Date.now();

        let period = Math.round((now - date) / 1000);
        let averageBy = 3600;

        let uuid = this.device ? this.device.uuid : '';

        this.foobotService.loadDatapoints(
            uuid,
            period,
            averageBy,
            this.selectedFileformat.mime
        );
    }

    generateDownloadLink(blob: Blob) : void {
        let link = document.createElement('a');
        document.body.appendChild(link);
        let url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'footbot-data' + this.selectedFileformat.extension;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    onFileFormatSelected(fileformat: FileFormat): void {
        this.selectedFileformat = fileformat;
    }
}
