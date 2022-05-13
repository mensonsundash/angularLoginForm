import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  //Form Validables
  registerForm:any = FormGroup;
  submitted = false;

  //Add User form actions
  get f() { return this.registerForm.controls;}
  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if(this.registerForm.invalid) {
      return;
    }
    //true if all the fields are filled
    if(this.submitted) {
      alert("Congrats!");
    }
  }

  //login Form
  ngOnInit(): void {
    //Add User Validation
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
  }

}
