import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(user: any){
    this.authService.register(user).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('login');
    }, err => {
      console.log(err)
    })
  }

}
