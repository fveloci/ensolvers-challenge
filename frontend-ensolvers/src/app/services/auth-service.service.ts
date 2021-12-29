import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }


  login(user: any): Observable<any>{
    return this.http.post(environment.api_url+'/auth/login', user);
  }

  register(user: any): Observable<any>{
    return this.http.post(environment.api_url+'/auth/register', user);
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
