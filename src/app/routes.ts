import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'courses', component: CourseListComponent},
    {path: 'course/:id', component: CourseEditComponent},
    {path: 'users', component: UserListComponent},
    {path: 'user/:id', component: UserEditComponent},
    {path: '', component: HomeComponent},
];
