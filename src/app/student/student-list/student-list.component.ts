import { Student } from './../../model/student.model';
import { StudentService } from './../../service/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getAllStudents();
    // console.log(this.students);


  }
  async getAllStudents() {

    await this.studentService.getAllStudent().then(a => this.students = a);
    console.log(this.students);


  }

  headers = ["Class Name", "Student ID", "First Name", "Last Name", "DOB", "Gender", "Phone Number", "Address"];


}

