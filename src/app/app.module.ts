import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AppRouting } from './/app-routing';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
