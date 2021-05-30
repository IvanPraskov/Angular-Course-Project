import { AuthService } from '../_services/auth.service';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
    let sut: AuthGuard;
    let authServiceMock: AuthService;

    const testUser = {
        id: 1,
        email: 'test@test.com',
        password: '123423',
        firstName: 'ivan',
        lastName: 'test',
        favourites: null,
        role: 'user'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                AuthService
            ]
        });

        sut = TestBed.inject(AuthGuard);
        authServiceMock = TestBed.inject(AuthService);
    });

    it('canActivate() should return false and navigate to auth/login page when user is not logged', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigate');
        authServiceMock.logout();
        expect(sut.canActivate()).toBeFalsy();

        expect(spy).toHaveBeenCalledWith(['auth/login']);
    });

    it('canActivate() should return true if user is logged', () => {
        authServiceMock.setLoggedUser(testUser);
        expect(sut.canActivate()).toBeTruthy();
    });



});
