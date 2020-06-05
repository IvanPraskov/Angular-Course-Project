import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { Course } from 'src/app/_models/course';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
courses: Course[];
user: User;
course: Course;
destroy$ = new Subject<boolean>();
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private courseService: CourseService,
              private alertify: AlertifyService ) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courses = data.courses;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  addToFavourites(courseId: number) {
    this.user = this.authService.getLoggedUser();
    this.courseService.getCourse(courseId).subscribe(course => {
      this.course = course;
    });
    this.courseService.getCourses().pipe(
      map((response: Course[]) => response.find(c => c.id === courseId)),
      takeUntil(this.destroy$))
      .subscribe(course => {
        if (course) {
          this.alertify.error('This course is already added to favourites.');
          return;
        }
        this.user.favourites.push(this.course);
        this.alertify.success('Added to favourites.');
      });
  }
}
