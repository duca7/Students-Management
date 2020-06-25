import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'Login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: '', redirectTo: '/studentlist', pathMatch: 'full',

  },

  { path: '', loadChildren: './student/student.module#StudentModule',

  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
