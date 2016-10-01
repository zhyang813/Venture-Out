import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-interactive-helper',
  templateUrl: './interactive-helper.component.html',
  styleUrls: ['./interactive-helper.component.css']
})

export class InteractiveHelperComponent implements OnInit {
  myForm: FormGroup;
  isValid: Boolean = true;
  constructor(private router: Router) {
   }

  ngOnInit() {
    this.myForm = new FormGroup({
      'location': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(5)
        ]
      )
    });
  }
  onSubmit() {
    if (this.myForm.value.location && this.myForm.valid) {
      this.router.navigate(['category']);
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    console.log(this.myForm);
  };

}
