import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptor/jwt.interceptor";
import { FolderComponent } from './components/folder/folder.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderListComponent,
    LoginComponent,
    RegisterComponent,
    FolderComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
