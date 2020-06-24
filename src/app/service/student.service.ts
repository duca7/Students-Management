import { Student } from './../../app/model/student.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class StudentService {

  studentCollection: AngularFirestoreCollection<Student> = null;
  studentDoc: AngularFirestoreDocument<Student>;
  successMsg = 'Data successfully saved.';
  allStudent: Student[] = [];
  studentData:Student;
  // student:Observable<Student>
  private studentSubscription: Subscription;

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) {
    this.studentCollection = this.db.collection<Student>('students')
  }

  getStudents() {
    return this.studentCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as Student;
        let id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }



  getAllStudent() {
    return this.db.collection('students').snapshotChanges();
  }

  sendStudentData(data:Student) { //get id of the one by one list student
    this.studentData=data;
  }
  getStudentData(){
    return this.studentData;
  }

  getStudent(id: string) {
    return this.studentCollection.doc(id);
  }

  checkExistStudent(id: string) {
    return new Promise((resolve, reject) => {
      this.getStudent(id).get().toPromise().then((doc) => {
        if (doc.exists) {
          // console.log(doc.data());
          resolve(true);
        } else {
          // console.log('false');
          resolve(false)
        }
      });
    });

  }

  async createStudent(data: Student) {
    let isExist = await this.checkExistStudent(data.id);
    if (isExist != true) {
      return this.studentCollection.doc(data.id).set(data).then(_ =>
        alert(this.successMsg));
    } else {
      return alert('Your account is already exsit');
    }
  }

  async deleteStudent(id: string): Promise<void> {
    let isExist = await this.checkExistStudent(id);
    if (isExist === true) {
      await this.getStudent(id).delete();
      alert('Delete succesfull');
    } else {
      return alert('Cannot find student');
    }
  }

  async updateStudent(id: string, formData: Student) :Promise<void>{
    let isExist = await this.checkExistStudent(id);
    try {
      if (isExist === true) {
        await this.getStudent(id).update(formData);
        return alert('Update succecful');
      } else {
        return alert('Cannot find student');
      }
    } catch (error) {
      console.log(error);

    }
  }
}
