import { Student } from './../../model/student.model';
import { StudentService } from './../../service/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students : Observable<Student[]>
  constructor(
    private studentService : StudentService
  ){}

  ngOnInit(){
    this.students = this.studentService.getStudents();
  }

  headers = ["Class Name", "Student ID", "First Name", "Last Name", "DOB", "Gender", "Phone Number", "Address", "Edit"];
}

