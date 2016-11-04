import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatePicker } from 'ng2-datepicker/ng2-datepicker';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FoobotService } from './foobot.service';
import { DatapointComponent } from './datapoint/datapoint.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DatapointComponent,
    DatePicker
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FoobotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
