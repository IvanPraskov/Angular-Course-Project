import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'http://localhost:3000/users';

constructor(private httpClient: HttpClient) { }

updateUser(user: User): Observable<User> {
  return this.httpClient.put<User>(`${this.url}/${user.id}`, user);
}

getUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(this.url);
}

}
