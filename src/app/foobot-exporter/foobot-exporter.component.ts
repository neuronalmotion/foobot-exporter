import { Component, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';

@Component({
    selector: 'app-foobot-exporter',
    templateUrl: './foobot-exporter.component.html',
    styleUrls: ['./foobot-exporter.component.css']
})
export class FoobotExporterComponent implements OnInit {

    error: string;

    constructor(private foobotService: FoobotService) {
    }

    ngOnInit() {
        this.foobotService.errorEvent.subscribe(
            error => {
                console.log('Got an error in FoobotExporterComponent !' + error);
                this.error = error;
            });

        this.foobotService.hideErrorEvent.subscribe(
            any => {
                this.error = '';
            });
    }

}
