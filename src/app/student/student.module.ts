
import { UIModule } from './../ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const routes : Routes =[
  {path: 'studentlist',component:StudentListComponent},
  {path: 'dashboard', component: DashBoardComponent},

]

@NgModule({
  declarations: [DashBoardComponent, StudentListComponent],
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    StudentListComponent,
    DashBoardComponent
  ]
})
export class StudentModule { }
