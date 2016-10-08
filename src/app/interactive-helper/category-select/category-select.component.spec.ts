/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategorySelectComponent } from './category-select.component';
import { By }              from '@angular/platform-browser';
// import { routing } from '../../app.routing';
import { Router } from '@angular/router';


describe('Component: CategorySelect', () => {

  class RouterStub {
    navigate(url: Array<string>) { return url; }
  }
  // Aysnc Before Each to Compile Component with HTML Template and CSS
  beforeEach( async( () => {
    TestBed.configureTestingModule({
        declarations: [
          CategorySelectComponent
        ],
        providers: [
          { provide: Router, useClass: RouterStub }
        ]
      }).compileComponents();
    })
  );

  describe('onLike Method', () => {
    it('should add liked categories to liked array', () => {
      let fixture = TestBed.createComponent(CategorySelectComponent);
      let comp = fixture.componentInstance;
      expect(comp.liked.length).toBe(0);
      comp.onLike('food');
      comp.onLike('music');
      comp.onLike('dance');
      expect(comp.liked[0]).toBe('food');
      expect(comp.liked[1]).toBe('music');
      expect(comp.liked[2]).toBe('dance');
    });

  });

  describe('goToNextPage Method', () => {
    it('should call router.navigate when user clicks next zip code', () => {
      let fixture = TestBed.createComponent(CategorySelectComponent);
      let comp = fixture.componentInstance;
      let nextEl = fixture.debugElement.query(By.css('#next')); // find next El

      inject([Router], (router: Router) => { // ...

      const spy = spyOn(router, 'navigate');

      // trigger click on div with id next
      nextEl.triggerEventHandler('click', null);

      // args passed to router.navigate()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to event-select page
      const id = 'event-select';

      expect(navArgs).toBe('/' + id,
        'should nav to the category event select page');
      });
    });

  });
});
