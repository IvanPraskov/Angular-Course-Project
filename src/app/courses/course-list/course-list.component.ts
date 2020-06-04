import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { Course } from 'src/app/_models/course';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
courses: Course[];
  constructor(private courseService: CourseService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadCourses();
  }

  addCourse() {
  }
  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    }, error => {
      this.alertify.error(error);
    });
  }
}
