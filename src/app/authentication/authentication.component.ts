import { Component, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  username : string;
  secretKey : string;

  constructor(private foobotService: FoobotService) { }

  ngOnInit() {
  }

  onStart(): void {
    console.log("username:" + this.username + "  " + "secretKey:" + this.secretKey);

    this.foobotService.setCredentials(this.username, this.secretKey);
    this.foobotService.getDevices()
      .then(devices => console.log(devices));
  }
}
