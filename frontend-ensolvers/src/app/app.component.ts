import { Component } from '@angular/core';
import {AuthServiceService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-ensolvers';
  constructor(private authService: AuthServiceService) {
  }

  checkToken(){
    const token = localStorage.getItem('token');
    if(!token) return false;
    return true;
  }
  logout() {
    this.authService.logout();
  }
}
