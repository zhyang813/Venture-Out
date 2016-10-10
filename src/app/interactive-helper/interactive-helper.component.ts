import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UserPageService } from '../user-page/user-page.service';




@Component({
  selector: 'app-interactive-helper',
  templateUrl: './interactive-helper.component.html',
  styleUrls: ['./interactive-helper.component.css']
})

export class InteractiveHelperComponent implements OnInit {

  myForm: FormGroup;
  isValid: Boolean = true;

  constructor(
    private http: Http,
    private router: Router,
    private userService: UserPageService
  ) {}

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
