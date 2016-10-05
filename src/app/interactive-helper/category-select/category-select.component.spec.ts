/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CategorySelectComponent } from './category-select.component';
// import { routing } from '../../app.routing';
import { Router } from '@angular/router';


describe('Component: CategorySelect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategorySelectComponent
      ],
      imports: [
        Router
      ]
    });
  });

  describe('onLike Method', () => {
    it('should add liked categories to liked array', () => {
      let fixture = TestBed.createComponent(CategorySelectComponent);
      let comp = fixture.componentInstance;
      expect(comp.liked.length).toBe(0)
      // component.onLike('food')
      // component.onLike('music')
      // component.onLike('dance')
      // expect(component.liked[0]).toBe('food')
      // expect(component.liked[1]).toBe('music')
      // expect(component.liked[2]).toBe('dance')

    })
  })
});
