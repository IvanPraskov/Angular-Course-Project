import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { appRoutes } from './routes';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { CourseDetailedComponent } from './courses/course-detailed/course-detailed.component';
import { FavCoursesListComponent } from './courses/fav-courses-list/fav-courses-list.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';

@NgModule({
   declarations: [
      AppComponent,
      CourseListComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      CourseEditComponent,
      UserEditComponent,
      UserListComponent,
      CourseCardComponent,
      CourseDetailedComponent,
      FavCoursesListComponent,
      AddCourseComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      RxReactiveFormsModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
