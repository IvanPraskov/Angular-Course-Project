import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../_models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  destroy$ = new Subject<boolean>();
  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onRegister() {
    const formData = this.form.value;
    this.authService.getUsers().pipe(
      map((user: User[]) => user.find(u => u.email === formData.email)),
      takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.alertify.error('Email is already in use. Please try another one.');
          return;
      }
        this.authService.register(this.form.value).pipe(
        takeUntil(this.destroy$))
        .subscribe(next => {
          this.alertify.success('Successfully registered.');
          this.router.navigate(['home']);
        });
      });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

}
