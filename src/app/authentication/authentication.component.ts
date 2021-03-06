import { Component, OnInit } from '@angular/core';

import { FoobotService } from '../foobot.service';
import { Device } from '../device';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  username: string;
  secretKey: string;
  devices: Device[];

  constructor(private foobotService: FoobotService) {
    this.username = localStorage.getItem('username');
    this.secretKey = localStorage.getItem('secretKey');
  }

  ngOnInit() {
  }

  onConnect(): void {
    localStorage.setItem('username', this.username);
    localStorage.setItem('secretKey', this.secretKey);

    this.foobotService.setCredentials(this.username, this.secretKey);
  }
}
