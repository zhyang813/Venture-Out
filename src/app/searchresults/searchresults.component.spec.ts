/* tslint:disable:no-unused-variable */

import { EventService } from './searchresults.service.ts';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';


describe('EventService', () => {

  beforeEach(function() {
    this.eventService = new EventService();
  })
  describe('eventTitleToString', () => {
    it('should break titles to words', () => {
      this.eventService.eventTitlesToWords('string')
    });

  });

});
