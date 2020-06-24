import { Student } from './../../model/student.model';
import { StudentService } from './../../service/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { timer, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


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
  constructor(
    private studentService: StudentService,
    public db: AngularFirestore
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
      console.log(this.allStudents);
    });
  }


  delete(id:string){
    this.studentService.deleteStudent(id);
  }

  headers = ["Class Name", "Student ID", "First Name", "Last Name", "DOB", "Gender", "Phone Number", "Address"];


}

