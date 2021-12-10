import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.afAuth.signOut();
    const snackBarRef = this._snackBar.open('You have been logged out', '', {
      duration: 2500,
      panelClass: ['snackbar-success'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
    );
  }
}
