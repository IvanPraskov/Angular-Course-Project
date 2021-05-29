import {UserService} from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
    let sut: UserService;
    let httpMock: HttpTestingController;

    const testUser = {
        id: 1,
        email: "test@test.com",
        password: "123423",
        firstName: "ivan",
        lastName: "test",
        favourites: null,
        role: "user"      
    }

    beforeEach(() => {
        //reset the object before each test.
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers: [
                UserService
            ]
        });

        sut = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
      });

      it('updateUser() should send PUT request with userId', () => {
          sut.updateUser(testUser).subscribe();
          const req = httpMock.expectOne(`http://localhost:3000/users/${testUser.id}`);
          expect(req.request.method).toBe(`PUT`);
      });
});