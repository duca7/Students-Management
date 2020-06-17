import { Student } from './../student-list/student';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentCollection: AngularFirestoreCollection<Student>
  studentDoc: AngularFirestoreDocument<Student>

  constructor(private db: AngularFirestore) {
    this.studentCollection = this.db.collection('students', ref =>
      ref.orderBy('addBuy', 'desc')
    )
  }

  getStudents() {
    return this.studentCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Student
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
  }

  getStudentData(id: string) { //get id of the one by one list student
    this.studentDoc = this.db.doc<Student>(`students/${id}`)
    return this.studentDoc.valueChanges()
  }

  getStudent(id: string) {
    return this.db.doc<Student>(`students/${id}`)
  }

  createStudent(data: Student) {
    this.studentCollection.add(data)
  }

  deleteStudent(id: string) {
    return this.getStudent(id).delete()
  }

  updateStudent(id: string, formData) {
    return this.getStudent(id).update(formData)
  }

}
