import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private formBuilder: FormBuilder,
              private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {

  }

  loginUser(data:any){
    console.log(data);
    this.authService.login(data).subscribe(async (res: any) => {
      const data = await res;
      console.log('Res: '+ data);
      this.authService.saveToken(await data.token);
      this.router.navigateByUrl('list');
    }, err => {
      console.log(err)
    })
  }


}
