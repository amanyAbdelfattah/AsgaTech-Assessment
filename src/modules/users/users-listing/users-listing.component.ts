import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { GridColDefModel } from 'src/models/_common/GridColDefModel';
import { UsersModel } from 'src/models/user/UsersModel';
import { DataGridService } from 'src/services/data-grid.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: UsersModel[] = [];
  displayedUsers: UsersModel[] = [];
  gridCols: GridColDefModel[] = [
    {headerName: 'Name', field: 'Name'},
    {headerName: 'Email', field: 'Email'},
    {headerName: 'Address', field: 'Address'},
    {headerName: 'Phone', field: 'Phone'},
    {headerName: 'Register Date', field: 'RegisterDate'},
  ];
  pageSize = 10;
  currentPage = 1;

  constructor(
    private loaderService: LoadingSpinnerService,
    private usersService: UsersService,
    private dataGridService: DataGridService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.onGetUsers();
  }
  
  onPageChanged(pageNum: number) {
    this.currentPage = pageNum;
    this.onGetUsers();
  }

  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.onGetUsers();
  }

  onGetUsers() {
    this.loaderService.start();
    this.usersService.onGetAllUsers().pipe(finalize(() => {
      this.loaderService.stop();
    })).subscribe({
      next:(res: UsersModel[]) => {
        if(!localStorage.getItem('users')) {
          this.users = res;
        } else{
          this.users = JSON.parse(localStorage.getItem('users')!);
        }
        this.onUpdateUsersListing();
        localStorage.setItem('users', JSON.stringify(this.users));
        this.onUpdateDisplayedUsers();
      }
    });
  }

  onUpdateUsersListing() {
    this.users = this.users.map((user) => {
      return {
        RegisterDate: this.datePipe.transform(this.dataGridService.onFixDateFormat(user.RegisterDate), 'fullDate')!,
        Address: user.Address,
        Email: user.Email,
        Id: user.Id,
        Name: user.Name,
        Phone: user.Phone
      };
    });
  }

  onUpdateDisplayedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.users.slice(startIndex, endIndex);
  }
}
