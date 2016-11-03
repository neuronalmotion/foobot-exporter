import { Component, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private foobotService: FoobotService) { }

  ngOnInit() {
  }

  onStart(): void {
    console.log("onStart!!!");
    this.foobotService.getDevices()
      .then(devices => console.log(devices));
  }

}
