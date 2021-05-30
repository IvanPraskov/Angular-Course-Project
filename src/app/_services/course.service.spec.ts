import {CourseService} from './course.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('CourseService', () => {
    let sut: CourseService;
    let httpMock: HttpTestingController;

    const testCourse = {
        id: 1,
        title: "TestCourse",
        description: "Test description hashd sad",
        addedAt: 5131,
        rating: 3,
        imageUrl: "testsa.com"     
    }

    const testCoursesResponse = [
        {
            id: 1,
            title: "TestCourse",
            description: "Test description hashd sad",
            addedAt: 12,
            rating: 2,
            imageUrl: "testsa.com"
        },
        {
            id: 3,
            title: "ASdasdaDsada",
            description: "Test description hashd sad",
            addedAt: 412,
            rating: 4,
            imageUrl: "testsa.com"
        },
        {
            id: 4,
            title: "cxkmcixckka",
            description: "Test description hashd sad",
            addedAt: 123,
            rating: 12,
            imageUrl: "testsa.com"     
        }       
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers: [
                CourseService
            ]
        });

        sut = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
      });

      it('addCourse() should send POST request ', () => {
          sut.addCourse(testCourse).subscribe();
          const req = httpMock.expectOne(`http://localhost:3000/courses`);
          expect(req.request.method).toBe(`POST`);
      });

      it('getCourses() should return 4 items', () => {
        sut.getCourses().subscribe((response) => {
            expect(response).toBeDefined();
            expect(testCoursesResponse.length).toEqual(response.length);
        })

        const req = httpMock.expectOne(`http://localhost:3000/courses`);
        expect(req.request.method).toBe('GET');
        req.flush(testCoursesResponse);
      });

      it('getCourse() should return a matching course', () => {
        

        sut.getCourse(testCourse.id).subscribe((response) => {
            expect(response).toBeDefined();
            expect(testCourse.description).toEqual(response.description);
            expect(testCourse.title).toEqual(response.title);
        })

        const req = httpMock.expectOne(`http://localhost:3000/courses/${testCourse.id}`);
        expect(req.request.method).toBe('GET');
      });

      it('deleteCourse() should send a DELETE request', () => {      
        sut.deleteCourse(testCourse.id).subscribe();
        const req = httpMock.expectOne(`http://localhost:3000/courses/${testCourse.id}`);
        expect(req.request.method).toBe('DELETE');
      });

      it('updateCourse() should send a PUT request', () => {      
        sut.updateCourse(testCourse).subscribe();
        const req = httpMock.expectOne(`http://localhost:3000/courses/${testCourse.id}`);
        expect(req.request.method).toBe('PUT');
      });
});
