import { SingupComponent } from './../singup/singup.component';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from 'firebase';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

    hide= true;
  ngOnInit(): void {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a password' :
        this.password.hasError('minLength') ? 'You password must have 8 characters' :
          '';
  }


  loginOnClick() {
    this.dialog.open(SingupComponent,{
      width: '33vw',
      height: '60vh',
    });
  }

  signin() {
    this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value).then(() => {
      this.snackBar.open('Success!', 'OK', {duration: 2000});
      this.router.navigate(['/studentlist']);
    }).catch((err) => {
      this.snackBar.open(err, 'OK', {duration: 2000});
    });

  }

  async loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credetial = await this.afAuth.signInWithPopup(provider);
    return this.authService.updateUserData(credetial.user)
    .then(() => {
      this.snackBar.open('Welcome', 'OK', {duration:2000});
      this.router.navigate(['/studentlist']);
    })
    .catch((err) => {
      this.snackBar.open(err, 'OK', {duration: 2000});
    });
  }



}
