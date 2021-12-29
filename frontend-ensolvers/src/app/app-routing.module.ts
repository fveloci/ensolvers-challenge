import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {FolderListComponent} from "./components/folder-list/folder-list.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";
import {FolderComponent} from "./components/folder/folder.component";
import {TaskComponent} from "./components/task/task.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'list', component: FolderListComponent, canActivate: [AuthGuardGuard]},
  {path: 'folder/:id', component: FolderComponent, canActivate: [AuthGuardGuard]},
  {path: 'task/:id', component: TaskComponent, canActivate: [AuthGuardGuard]},
  {path:'**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
