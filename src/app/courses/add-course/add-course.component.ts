import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Course } from 'src/app/_models/course';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();

  constructor(private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.buildForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onAddCourse() {
    const formData = this.form.value;
    if (this.form.valid) {
      this.courseService.getCourses().pipe(
        map((course: Course[]) => course.find(c => c.title === formData.title)),
        takeUntil(this.destroy$))
        .subscribe(user => {
          if (user) {
            this.alertify.error('Course with that name already exists.');
            return;
          }
          this.courseService.addCourse(formData).pipe(
            takeUntil(this.destroy$)
          ).subscribe(() => {
            this.alertify.success('Successfully added a new course.');
            this.router.navigate(['/courses']);
          });
        });
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

}
