import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  folder: any = {}
  tasks: any = [];
  id: string | null;
  folderName: string = '';
  addTask: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getFolderTasks();
  }

  getFolderTasks(){
    this.userService.getFolderTasks(this.id).subscribe(async (res) => {
      this.tasks = await res.tasks;
      this.folderName = await res.folder;
    }, err => {
      console.log(err)
    })
  }

  createNewTask(task: any){
    this.userService.createNewTask(task, this.id).subscribe(res => {
      this.getFolderTasks();
      this.addTask.reset();
    }, err => {
      console.log(err)
    })
  }

  checkTask(task: any){
    task.done = !task.done
    const done = {
      done: task.done
    }
    this.userService.checkTask(done, task.id).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

}
