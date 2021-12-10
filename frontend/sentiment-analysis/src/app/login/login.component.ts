import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router, private usersService: UsersService) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get email() {return this.loginForm.get('email')}
  get password() {return this.loginForm.get('password')}


    //Login Form: https://www.youtube.com/watch?v=vAglCz1F96Y
    loginError = '';
    userRole: any;
    user: User | undefined;

    wait = (ms: number) => { new Promise(resolve => setTimeout(resolve, ms)) }
    onLogin(){
      this.loginError = "";
      if(this.loginForm.valid){
        const {email, password} = this.loginForm.value;
        this.usersService.getUser(email).subscribe(user => {
          this.userRole = user;
        })
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email, password).then(userCredential => {
         const user = userCredential.user;
         //if we are going to have admin accounts, do it here
        //  localStorage.setItem('userRole', this.userRole.role);
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }).catch((error) => {
          console.log(error);
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
            case "auth/user-not-found":
            {
               this.loginError = "Wrong email address or password.";
              //  console.log(this.loginError);
               break;
            }
               default:
            {
                this.loginError = "Unexpected Error";
                // console.log(this.loginError);
                // console.log(error);
                break;
            }
       }
  });
      }else {
        this.loginError = "Please fill email and password fields."
      }
    }
    handleKeyUp(event: { keyCode: number; }) {
      if (event.keyCode === 13) {
        this.onLogin();
      }
    }
}
