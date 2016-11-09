import { Component, Input, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';
import { Device } from '../device';

@Component({
  selector: 'app-datapoint',
  templateUrl: './datapoint.component.html',
  styleUrls: ['./datapoint.component.css']
})
export class DatapointComponent implements OnInit {

  @Input() device: Device;
  startDate : string;

  constructor(private foobotService: FoobotService) { }

  ngOnInit() {
  }

  onDownload(): void {
  	let date = new Date(this.startDate).getTime();
  	let now = Date.now();

  	let period = Math.round((now - date) / 1000);
  	let averageBy = 3600;
  	
  	// FIXME: provide the UUID from devices component
    let uuid = this.device.uuid;
    console.log('Request download on uuid: ' + uuid);

	let reader = new FileReader();
	  	this.foobotService.getDatapoints(uuid,
  		period,
  		averageBy)
  		.subscribe(blob => {
  			let link = document.createElement('a');
  			//link.style = 'display: none;';
  			document.body.appendChild(link);
  			let url = window.URL.createObjectURL(blob);
  			link.href = url;
  			link.download = 'footbot.json';
  			link.click();
  			window.URL.revokeObjectURL(url);

  		},
                  error => console.log("Error downloading the file."),
                  () => console.log('Completed file download.'));

  }
}
