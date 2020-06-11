import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  isUserLogged: boolean;
  loggedUser: User;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    if (this.loggedIn) {
      this.loggedUser = this.authService.getLoggedUser();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogin() {

    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    this.authService.login(email, password).pipe(
      takeUntil(this.destroy$))
      .subscribe(user => {
        if (!user) {
          this.alertify.error('Invalid email or password');
          return;
        }
        this.authService.setLoggedUser(user);

        console.log(this.loggedUser);
        this.form.reset();
        this.alertify.success('Successfully logged in!');
        this.router.navigate(['/courses']);
      });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.alertify.message('Logged out.');
  }

  loggedIn() {
    this.isUserLogged = this.authService.getHasLoggedIn();
    return this.isUserLogged;
  }


  private buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


}
