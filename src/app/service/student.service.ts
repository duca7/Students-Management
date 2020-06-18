import { Student } from './../../app/model/student.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentCollection: AngularFirestoreCollection<Student>;
  studentDoc: AngularFirestoreDocument<Student>;
  successMsg = 'Data successfully saved.';

  constructor(private db: AngularFirestore) {
    this.studentCollection = this.db.collection<Student>('students')
  }

  getStudents() {
    return this.studentCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as Student;
        let id =  a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  getStudentData(id: string) { //get id of the one by one list student
    this.studentDoc = this.db.doc<Student>(`students/${id}`);
    return this.studentDoc.valueChanges();
  }

  getStudent(id: string) {
    return this.db.doc<Student>(`students/${id}`);
  }

  createStudent(data: Student) {
    this.studentCollection.doc(data.id).set(data);
  }

  deleteStudent(id: string) {
    return this.getStudent(id).delete();
  }

  updateStudent(id: string, formData) {
    return this.getStudent(id).update(formData);
  }

}
