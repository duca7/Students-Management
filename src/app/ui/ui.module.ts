import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    NavBarComponent
  ]
})
export class UIModule { }
