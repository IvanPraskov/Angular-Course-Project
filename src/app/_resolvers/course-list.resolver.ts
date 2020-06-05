import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';

@Injectable({
    providedIn: 'root'
})

export class CourseListResolver implements Resolve<Course[]> {
    // used so that we don't have to use safe navigation operators everywhere and before loading the page we have the data.
    constructor(private courseService: CourseService,
                private router: Router,
                private alertify: AlertifyService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<Course[]> {
        return this.courseService.getCourses().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
