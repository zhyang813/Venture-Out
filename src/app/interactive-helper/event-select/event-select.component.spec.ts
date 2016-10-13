/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EventSelectComponent } from './event-select.component';

describe('Component: EventSelect', () => {


  class RouterStub {
    navigate(url: Array<string>) { return url; }
  }
  // Aysnc Before Each to Compile Component with HTML Template and CSS
  beforeEach( async( () => {
    TestBed.configureTestingModule({
        declarations: [
          EventSelectComponent
        ],
        providers: [

        ]
      }).compileComponents();
    })
  );

  describe('onLike Method', () => {
    it('should add liked titles to key terms array', () => {
      // let fixture = TestBed.createComponent(EventSelectComponent);
      // let comp = fixture.componentInstance;
      // expect(comp.recommended.length).toBe(0);
      // comp.onLike('Event Title Here');
      // comp.onLike('123 Event @ place');
      // comp.onLike('---events--- here');
      // expect(comp.keyWords.indexOf(['event', 2])).toBe;
      // [['event', 2],['title', 1], ['here', 2], ['123', 1],['@', 1], [place, 0],['---events---']]
    });
  });

  describe('goToNextPage Method', () => {
    it('should add terms to array when next button is clicked', () => {
    });
  });
});


