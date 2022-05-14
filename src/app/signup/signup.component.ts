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

   confirmMatch(firstPassword:string, matchingPassword:string){
    return(formGroup:FormGroup)=> {
      const fPassword = formGroup.controls[firstPassword];
      const mPassword = formGroup.controls[matchingPassword];

      if(mPassword.errors && !mPassword.errors['confirmMatch']) {
        return
      }
      if(fPassword.value !== mPassword.value) {
        mPassword.setErrors({confirmMatch:true});
      }
      else{
        mPassword.setErrors(null);
      }
    }
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
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirm_password: ['',[Validators.required]]
    },
    {
      validators: this.confirmMatch('password', 'confirm_password')
    }
    );
  }

}
