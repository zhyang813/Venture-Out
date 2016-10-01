import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-interactive-helper',
  templateUrl: './interactive-helper.component.html',
  styleUrls: ['./interactive-helper.component.css']
})

export class InteractiveHelperComponent implements OnInit {
  myForm: FormGroup;
  constructor() {
   }

  ngOnInit() {
    this.myForm = new FormGroup({
      'location': new FormControl('',
        [
          Validators.pattern('^\d{5}(?:[-\s]\d{4})?$')
        ]
      )
    });
  }
  onSubmit() {
    console.log(this.myForm);
  };

}
