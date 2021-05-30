import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
    let sut: AuthService;
    let userServiceMock: UserService;
    let httpMock: HttpTestingController;

    const testUser = {
        id: 1,
        email: 'test@test.com',
        password: '123423',
        firstName: 'ivan',
        lastName: 'test',
        favourites: null,
        role: 'user'
    };

    const testUsersResponse = [
        {
            id: 1,
            email: 'test@test.com',
            password: '444441231321',
            firstName: 'ivan',
            lastName: 'test',
            favourites: null,
            role: 'user'
        },
        {
            id: 2,
            email: 'asdsad@test.com',
            password: '4121312',
            firstName: 'sasho',
            lastName: 'sadasd',
            favourites: null,
            role: 'user'
        },
        {
            id: 3,
            email: '421441t@test.com',
            password: '5331',
            firstName: 'addd',
            lastName: 'texxaxast',
            favourites: null,
            role: 'user'
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                UserService
            ]
        });

        sut = TestBed.inject(AuthService);
        userServiceMock = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

        let store = {};
        spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
            return store[key] || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = value as string;
        });
        spyOn(localStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('login() should call userService.getUser()', () => {
        sut.login(testUsersResponse[0].email, testUsersResponse[0].password).subscribe((response) => {
            expect(response).toBeDefined();
            expect(response.email).toEqual(testUsersResponse[0].email);
            expect(response.password).toEqual(testUsersResponse[0].password);
        });
        const req = httpMock.expectOne(`http://localhost:3000/users`);
        expect(req.request.method).toBe(`GET`);
        req.flush(testUsersResponse);
    });

    it('login() should return undefined if there is no matching user email and password', () => {
        sut.login('randomemail@sad.com', '21321321311').subscribe((response) => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne(`http://localhost:3000/users`);
        expect(req.request.method).toBe(`GET`);
        req.flush(testUsersResponse);
    });

    it('getHasLoggedIn() should return true if there setLoggedUser has been called', () => {
        sut.setLoggedUser(testUser);
        expect(sut.getHasLoggedIn()).toBeTruthy();
    });

    it('getLoggedUser() should return a user if setLoggedUser() has been called.', () => {
        sut.setLoggedUser(testUser);
        expect(sut.getLoggedUser()).toEqual(testUser);
    });

    it('register() should send POST request', () => {
        sut.register(testUser).subscribe((response) => {
            expect(response).toBeDefined();
        });

        const req = httpMock.expectOne(`http://localhost:3000/users`);
        expect(req.request.method).toBe(`POST`);

    });

});
