import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UserPageService } from '../user-page/user-page.service';

/*
  This component is used when the user initially signs in.
  The component asks the user for their zip code that will be stored
  in the database.
*/

@Component({
  selector: 'app-interactive-helper',
  templateUrl: './interactive-helper.component.html',
  styleUrls: ['./interactive-helper.component.css']
})

export class InteractiveHelperComponent implements OnInit {
  // store all form data as an myForm object
  myForm: FormGroup;
  // this variable is used to see if the zipcode is valid
  isValid: Boolean = true;

  constructor(
    private http: Http,
    private router: Router,
    private userService: UserPageService
  ) {}

  ngOnInit() {
    // when the component is initialized a new form object is created
    // location references the location input where the user will type in
    // their zipcode
    this.myForm = new FormGroup({
      'location': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(5)
        ]
      )
    });
  };

  // when the user submits the form by hitting enter we will set
  // the userService.zipcode variable and then use the user service method
  // addZipToDB to add the zip to the database. they will be redirected to the
  // category select page
  public onSubmit() {
    if (this.myForm.value.location && this.myForm.valid) {
      this.userService.zipCode = this.myForm.value.location;
      this.userService.addZipToDB();
      this.router.navigate(['category']);
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  };

}
