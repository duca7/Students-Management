import { Student } from './../../model/student.model';
import { StudentService } from './../../service/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { timer, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  student
  allStudents;
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  searchInput;

  columnsToDisplay = ['userName', 'age'];

  constructor(
    private studentService: StudentService,
    public db: AngularFirestore,
    public router: Router,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    // this.getAllStudents().subscribe((data) => {
    //   this.students = data;

    // })
    // console.log(this.students);

    this.getAllStudents();

  }

  searchStudent() {
    this.firequery().subscribe((result) => {
      this.allStudents = result;
      console.log(result);
    })
  }

  firequery() {
    return this.db.collection('/students', ref => ref.where('id', '==', this.searchInput)).valueChanges();
  }

  getAllStudents() {
    return this.studentService.getAllStudent().subscribe(data => {
      this.allStudents = data.map(e => e.payload.doc.data());
    });
  }


  delete(id: string) {
    this.studentService.deleteStudent(id);
  }



  async update(data: Student) {
    await this.studentService.sendStudentData(data);
    this.router.navigate(["/update"]);
  }

  headers = ["Class Name", "Student ID", "First Name", "Last Name", "DOB", "Gender", "Phone Number", "Address"];


}

