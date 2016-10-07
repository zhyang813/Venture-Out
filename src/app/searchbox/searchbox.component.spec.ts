/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SearchboxComponent } from './searchbox.component';

import { Router } from '@angular/router';


describe('Component: Searchbox', () => {

  class RouterStub {
    navigate(url: Array<string>) { return url; }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchboxComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents()
  });

  it('should render searchbox heading in a h5 tag', async(() => {
    let fixture = TestBed.createComponent(SearchboxComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Search For Your Next Event');
  }));

});
