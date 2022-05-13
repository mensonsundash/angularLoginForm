import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) {  }
    //form validations
    signupForm:any = FormGroup;
    submitted = false;
   

   get f() {
     return this.signupForm.controls;
   }
   onSubmit(){
     this.submitted = true;
     //if form invalid stop here
     if(this.signupForm.invalid){
       return;
     }
     //if form validates
     if(this.submitted) {
      alert("Congrats!");
     }
   }

  ngOnInit(): void {
    //add new user validation
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]]
    });
  }

}
