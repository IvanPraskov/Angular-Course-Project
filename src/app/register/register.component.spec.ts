import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { Component, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
            providers: [
                UserService,
                AuthService,
                AlertifyService,
                RxFormBuilder
            ],
            declarations: [
                RegisterComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('firstName should require validation', () => {
        const firstNameControl = component.form.get('firstName');
        const errors = firstNameControl.errors || {};
        expect(firstNameControl.valid).toBeFalsy();
        expect(errors.required).toBeTruthy();
    });

    it('password with less than 5 chars should be invalid', () => {
        const passwordControl = component.form.get('password');
        passwordControl.setValue('2412');
        const errors = passwordControl.errors || {};
        expect(passwordControl.valid).toBeFalsy();
        expect(errors.password).toBeTruthy();
    });

    it('password without a special char should be invalid', () => {
        const passwordControl = component.form.get('password');
        passwordControl.setValue('24122313213');
        const errors = passwordControl.errors || {};
        expect(passwordControl.valid).toBeFalsy();
        expect(errors.password).toBeTruthy();
    });

    it('password with a special char  and length > 5 should be valid', () => {
        const passwordControl = component.form.get('password');
        passwordControl.setValue('2313!23sa');
        const errors = passwordControl.errors || {};
        expect(passwordControl.valid).toBeTruthy();
        expect(errors.password).toBeUndefined();
    });

    it('invalid email should show a validation error', () => {
        const emailControl = component.form.get('email');
        emailControl.setValue('myTestEmail');
        const errors = emailControl.errors || {};
        expect(emailControl.valid).toBeFalsy();
        expect(errors.email).toBeTruthy();
    });

    it('valid email should be accepted', () => {
        const emailControl = component.form.get('email');
        emailControl.setValue('myTestEmail@test.com');
        const errors = emailControl.errors || {};
        expect(emailControl.valid).toBeTruthy();
        expect(errors.email).toBeUndefined();
    });

});
