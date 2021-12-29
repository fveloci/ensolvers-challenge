import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task: any = {};
  id: any;
  editTask: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getTask()
  }


  getTask(){
    this.userService.getTask(this.id).subscribe(async (res) => {
      this.task = await res;
      this.buildForm();
    })
  }

  buildForm() {
    this.editTask.setValue({
      name: this.task.name
    })
  }

  modifyTask(data: any){

    this.userService.modifyTask(data, this.task.id).subscribe(res => {
      this.editTask.reset();
      this.router.navigateByUrl(`/folder/${this.task.folderId}`)
    }, err => {
      this.editTask.reset();
    })
  }

}
