import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // FOLDERS
  getFolders(): Observable<any>{
    return this.http.get(environment.api_url+'/folder');
  }
  createFolder(folder: any): Observable<any>{
    return this.http.post(environment.api_url+'/folder', folder)
  }
  removeFolder(id: any): Observable<any>{
    return this.http.delete(environment.api_url+`/folder/${id}`);
  }

  // TASKS
  getFolderTasks(id: any): Observable<any>{
    return this.http.get(environment.api_url+`/folder/${id}/task`);
  }
  checkTask(isDone: any, taskId: any): Observable<any>{
    return this.http.put(environment.api_url+`/task/${taskId}/done`, isDone);
  }
  createNewTask(task: any, folderId: any): Observable<any>{
    return this.http.post(environment.api_url+`/folder/${folderId}/task`, task)
  }
  getTask(taskId: any): Observable<any>{
    return this.http.get(environment.api_url+`/task/${taskId}`)
  }
  modifyTask(task: any, taskId: any): Observable<any>{
    return this.http.put(environment.api_url+`/task/${taskId}`, task);
  }
  deleteTask(id: number): Observable<any>{
    return this.http.delete(environment.api_url+`/task/${id}`);
  }
}
