/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoobotService } from './foobot.service';

describe('Service: Foobot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoobotService]
    });
  });

  it('should ...', inject([FoobotService], (service: FoobotService) => {
    expect(service).toBeTruthy();
  }));
});
