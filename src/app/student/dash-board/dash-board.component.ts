import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  data: Student;

  constructor(
    public studentService: StudentService,
    public router : Router
  ) {
    this.data = {
      firstName: null,
      lastName: null,
      DOB: null,
      sex: null,
      className: null,
      address: null,
      phoneNumber: null
    }
  }

  ngOnInit(): void {
  }


  createStudent() {
    this.studentService.createStudent(this.data);
    this.router.navigate(['/studentlist']);

  }

  deleteStudent() {
    this.studentService.deleteStudent(this.data.id);
    this.router.navigate(['/studentlist']);
  }

  removeNullNode() {
    for (var i in this.data) {
      if (this.data[i] === null) {
        delete this.data[i];
      }
    }
  }

  async updateStudent() {
    await this.removeNullNode();
    let cleanData = this.data
    console.log(cleanData);

    this.studentService.updateStudent(this.data.id,cleanData)
    this.router.navigate(['/studentlist']);
  }

}
