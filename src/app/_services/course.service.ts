import { Injectable } from '@angular/core';
import { Course } from '../_models/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
readonly url = 'http://localhost:3000/courses';
constructor(private http: HttpClient) { }

addCourse(course: Course): Observable<Course> {
  return this.http.post<Course>(this.url, course);
}

deleteCourse(id: number): Observable<Course> {
  return this.http.delete<Course>(`${this.url}/${id}`);
}

getCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(this.url);
}

getCourse(id: number): Observable<Course> {
  return this.http.get<Course>(`${this.url}/${id}`);
}

updateCourse(course: Course): Observable<Course> {
  return this.http.put<Course>(`${this.url}/${course.id}`, course);
}

}
