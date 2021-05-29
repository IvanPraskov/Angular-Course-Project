import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = 'http://localhost:3000/users';
  readonly loggedUserStorageKey = 'loggerUser';
  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find(user => user.email === email && user.password === password)));
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }

  logout() {
    localStorage.removeItem(this.loggedUserStorageKey);
  }

  setLoggedUser(user: User) {
    localStorage.setItem(this.loggedUserStorageKey, JSON.stringify(user));

    this.setHasLoggedIn(true);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(this.loggedUserStorageKey));
  }

  setHasLoggedIn(isLogged: boolean): void {
    this.hasLoggedIn$.next(isLogged);
  }

  getHasLoggedIn(): boolean {
    return this.getLoggedUser() ? true : false;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

}
