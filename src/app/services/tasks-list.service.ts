import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Task} from '../tasks-list/task';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  private url = 'https://jsonplaceholder.typicode.com';
  private endpoint = 'todos';
  private headers = new HttpHeaders();

  constructor(private  http: HttpClient) {
    this.headers.append('Content-Type', 'application/json; charset=UTF-8');
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.url}/${this.endpoint}/${taskId}`);
  }

  updateTask(task: Task) {
    return this.http
      .put(`${this.url}/${this.endpoint}/${task.id}`, JSON.stringify(task), {headers: this.headers});
  }

  createTask(task: Task) {
    return this.http
      .post(`${this.url}/${this.endpoint}`, JSON.stringify(task), {headers: this.headers});
  }

  getAllUserTasks(userId: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/${this.endpoint}?userId=${userId}`);
  }

  getFilteredUserTasks(userId: number, completed: boolean): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/${this.endpoint}?userId=${userId}&completed=${completed}`);
  }
}
