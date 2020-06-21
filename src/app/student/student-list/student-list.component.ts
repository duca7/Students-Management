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

  students: Student;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {

  this.studentService.getAllStudent();
  }

  headers = ["Class Name", "Student ID", "First Name", "Last Name", "DOB", "Gender", "Phone Number", "Address", "Edit"];


}

