import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  folders: any = [];
  addFolder: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getFolders();
  }

  getFolders(){
    this.userService.getFolders().subscribe(async (res) => {
      this.folders = await res;
    }, err => {
      console.log(err)
    })
  }

  removeFolder(id: number){
    this.userService.removeFolder(id).subscribe(res => {
      console.log('Folder removed successfully');
      this.getFolders();
    }, err => {
      console.log(err)
    })
  }

  createNewFolder(value: any){
    console.log(value.name);
    this.userService.createFolder(value).subscribe(res => {
      this.getFolders();
      this.addFolder.reset();
    }, err => {
      console.log(err)
    })

  }

}
