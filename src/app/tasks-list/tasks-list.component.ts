import {Component, TemplateRef} from '@angular/core';
import {UsersListService} from '../services/users-list.service';
import {UsersList} from '../users-list/users-list';
import {ActivatedRoute} from '@angular/router';
import {Task} from './task';
import {TasksListService} from '../services/tasks-list.service';
import {BaseChartDirective} from 'ng2-charts';
import {ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  user: UsersList;
  tasksList: Task[];
  selectedAllTasks: boolean;
  selectedCompletedTasks: boolean;
  selectedUncompletedTasks: boolean;
  completedTasks: Task[];
  unCompletedTasks: Task[];
  pieChartLabels: string[] = ['Completed', 'In-progress'];
  pieChartData: number[] = [0, 0];
  pieChartType = 'pie';
  modalRef: BsModalRef;
  taskModal: Task;
  newTask: Task;
  pageID: number;

  @ViewChild(BaseChartDirective) private _chart;

  constructor(private route: ActivatedRoute,
              private usersListService: UsersListService,
              private tasksListService: TasksListService,
              private modalService: BsModalService) {

    this.route.params.subscribe(params => {
      this.pageID = params['id'];
    });

    this.usersListService.getUser(this.pageID).subscribe(
      (data: UsersList) => {
        this.user = data;
        this.showAllTasks();
      });

  }

  showAllTasks() {
    this.tasksListService.getAllUserTasks(this.pageID).subscribe(
      (data: Task[]) => {
        this.tasksList = data;
        this.completedTasks = this.tasksList.filter(task => task.completed === true);
        this.unCompletedTasks = this.tasksList.filter(task => task.completed === false);

        this.pieChartData[0] = this.completedTasks.length;
        this.pieChartData[1] = this.unCompletedTasks.length;

        this._chart.refresh();
      });

    this.selectedAllTasks = true;
    this.selectedCompletedTasks = false;
    this.selectedUncompletedTasks = false;
  }

  filterTasks(completed: boolean) {
    this.tasksListService.getFilteredUserTasks(this.pageID, completed).subscribe(
      (data: Task[]) => {
        this.tasksList = data;
      }
    );

    this.selectedCompletedTasks = completed ? true : false;
    this.selectedUncompletedTasks = !completed ? true : false;
    this.selectedAllTasks = false;
  }

  deleteTask(taskId: number) {
    this.tasksListService.deleteTask(taskId).subscribe();
    this.showAllTasks();
  }

  editTask(editedTask: Task) {
    this.tasksListService.updateTask(editedTask).subscribe();
    this.showAllTasks();
  }

  createTask(newTask: Task) {
    this.tasksListService.createTask(newTask).subscribe();
  }

  openModal(template: TemplateRef<any>, taskModal: Task) {
    if (!taskModal) {
      taskModal = new Task();
      taskModal.userId = this.user.id;
    }

    this.taskModal = Object.assign({}, taskModal);
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }
}
