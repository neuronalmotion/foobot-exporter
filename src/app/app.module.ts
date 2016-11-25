import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatePicker } from 'ng2-datepicker/ng2-datepicker';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DatapointComponent } from './datapoint/datapoint.component';
import { DevicesComponent } from './devices/devices.component';
import { FoobotService } from './foobot.service';
import { FoobotExporterComponent } from './foobot-exporter/foobot-exporter.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AuthenticationComponent,
    DatapointComponent,
    DatePicker,
    DevicesComponent,
    FoobotExporterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            component: FoobotExporterComponent
        },
        {
            path: 'about',
            component: AboutComponent
        }
    ])
  ],
  providers: [FoobotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
