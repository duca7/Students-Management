import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  data: Student;
  date = null;
  constructor(
    public studentService: StudentService,
    ) {
    this.data = {
      firstName: '',
      lastName: '',
      DOB: null,
      sex: '',
      className: '',
      address: '',
      phoneNumber: ''
    }
  }

  ngOnInit(): void {
  }



  createStudent() {
    this.studentService.createStudent(this.data);

  }
}
