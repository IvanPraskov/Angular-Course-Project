import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detailed',
  templateUrl: './course-detailed.component.html',
  styleUrls: ['./course-detailed.component.css']
})
export class CourseDetailedComponent implements OnInit {
  course: Course;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.course = data.course;
    });
  }

}
