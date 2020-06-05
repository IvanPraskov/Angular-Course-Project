import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-fav-courses-list',
  templateUrl: './fav-courses-list.component.html',
  styleUrls: ['./fav-courses-list.component.css']
})
export class FavCoursesListComponent implements OnInit {
user: User;
favCourses: Course[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadFavouriteCourses();
  }

  loadFavouriteCourses() {
    this.user = this.authService.getLoggedUser();
    this.favCourses = this.user.favourites;
  }

}
