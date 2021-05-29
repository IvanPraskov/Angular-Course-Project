import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'http://localhost:3000/users';

constructor(private http: HttpClient) { }

updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.url}/${user.id}`, user);
}

}
