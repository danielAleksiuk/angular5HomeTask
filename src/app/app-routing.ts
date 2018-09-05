import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {UsersListComponent} from './users-list/users-list.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';

export const AppRoutes: Routes = [
  {
    path: '*', redirectTo: 'usersList'
  },
  {
    path: '', redirectTo: 'usersList', pathMatch: 'full'
  },
  {
    path: 'usersList', component: UsersListComponent
  },
  {
    path: 'usersList/:id', component: TasksListComponent
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);

