import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseDetailedComponent } from './courses/course-detailed/course-detailed.component';
import { CourseDetailedResolver } from './_resolvers/course-detailed.resolver';
import { CourseListResolver } from './_resolvers/course-list.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { FavCoursesListComponent } from './courses/fav-courses-list/fav-courses-list.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '', // dummy route to apply a single guard to multiple routes
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'courses', component: CourseListComponent,
                resolve: {courses: CourseListResolver}},
            {path: 'course/:id', component: CourseDetailedComponent,
                resolve: {course: CourseDetailedResolver}},
            {path: 'course/edit', component: CourseEditComponent},
            {path: 'courses/favourites', component: FavCoursesListComponent},
            {path: 'users', component: UserListComponent},
            {path: 'user/:id', component: UserEditComponent},

        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
