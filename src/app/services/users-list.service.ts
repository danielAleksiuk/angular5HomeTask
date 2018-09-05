import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {UsersList} from '../users-list/users-list';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private url = 'https://jsonplaceholder.typicode.com';
  private endpoint = 'users';

  constructor(private  http: HttpClient) {
  }

  getUser(id: number): Observable<UsersList> {
    return this.http
      .get<UsersList>(`${this.url}/${this.endpoint}/${id}`);
  }

  getUsersList(): Observable<UsersList[]> {
    return this.http
      .get<UsersList[]>(`${this.url}/${this.endpoint}`);
  }
}
