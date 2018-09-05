import {Component} from '@angular/core';
import {UsersListService} from '../services/users-list.service';
import {UsersList} from './users-list';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  usersList: UsersList[];

  constructor(private userListService: UsersListService) {
    this.userListService.getUsersList().subscribe(
      (data: UsersList[]) => {
        this.usersList = data;
      });
  }
}
