import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getFolders(): Observable<any>{
    return this.http.get(environment.api_url+'/folder');
  }

  createFolder(folder: any): Observable<any>{
    return this.http.post(environment.api_url+'/folder', folder)
  }

  removeFolder(id: any): Observable<any>{
    return this.http.delete(environment.api_url+`/folder/${id}`);
  }
}
