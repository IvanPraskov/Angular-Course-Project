import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../_models/user';
import { RxwebValidators, RxFormBuilder } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  @Output() successfullRegister = new EventEmitter();
  destroy$ = new Subject<boolean>();
  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: RxFormBuilder
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', RxwebValidators.required()],
      lastName: ['', RxwebValidators.required()],
      email: ['', [RxwebValidators.required(), RxwebValidators.email()]],
      password: ['', [RxwebValidators.required(),
      RxwebValidators.password({ validation: { minLength: 5, digit: true, specialCharacter: true } })]],
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRegister() {
    const formData = this.form.value;
    if (this.form.valid) {
      this.userService.getUsers().pipe(
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
              this.successfullRegister.emit(false);
            });
        });
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

  private buildForm() {
    this.form = this.fb.group({
      firstName: ['', RxwebValidators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

}
