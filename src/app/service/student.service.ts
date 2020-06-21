import { Student } from './../../app/model/student.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentCollection: AngularFirestoreCollection<Student>;
  studentDoc: AngularFirestoreDocument<Student>;
  successMsg = 'Data successfully saved.';
  // student:Observable<Student>

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

  async getAllStudent() {
    let allStudent =[];
    // return await this.db.collection('students').get();
    await this.studentCollection.get().pipe().subscribe((data)=>{
      data.docs.map(a=>{
        allStudent.push(a.data());
        console.log(a.data());
      })
      
    });
    return allStudent;
  }

  getStudentData() { //get id of the one by one list student
    // this.studentDoc = this.db.doc<Student>(`students/${id}`);
    return this.studentDoc.valueChanges();
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

  async deleteStudent(id: string) {
    let isExist = await this.checkExistStudent(id);
    if (isExist === true) {
      this.getStudent(id).delete();
      return alert('Delete succesfull');
    } else {
      return alert('Cannot find student');
    }
  }

  updateStudent(id: string, formData) {
    return this.getStudent(id).update(formData);
  }

}
