import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit, OnDestroy {
@Input() course: Course;
user: User;
destroy$ = new Subject<boolean>();
constructor(private route: ActivatedRoute,
            private authService: AuthService,
            private courseService: CourseService,
            private alertify: AlertifyService,
            private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addToFavourites(courseId: number) {
    this.user = this.authService.getLoggedUser();
    if (this.user.favourites) {
      const courseInFav = this.user.favourites.find(c => c.id === courseId);
      if (courseInFav) {
            this.alertify.error('This course is already added to favourites.');
            return;
          }
    }
    const existingFavCourse = this.user.favourites.find(c => c.id === courseId);
    if (existingFavCourse) {
      this.alertify.error('Course already added in favourites.');
      return;
    }
    this.user.favourites.push(this.course);
    this.userService.updateUser(this.user).subscribe(next => {
      this.alertify.success('Added to favourites.');
    });
    // using this to update the user saved in localStorage,
    // otherwise it will only show the favourite courses user had added before logging in.
    this.authService.setLoggedUser(this.user);
  }
  // to be implemented for admin user role.
  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(course => {
      this.alertify.success('Successfully deleted' + course.title);
    }, error => {
      this.alertify.error('There was a problem deleting the course');
    });
  }

}
