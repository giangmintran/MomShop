import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';

@Component({
  selector: 'app-app-admin-management-user',
  templateUrl: './app-admin-management-user.component.html',
  styleUrls: ['./app-admin-management-user.component.scss'],
})
export class AppAdminManagementUserComponent implements OnInit {
  @ViewChild('createUser', { static: true })
  modalUser: CreateOrEditUserComponent;
  cols;
  tableData;
  selectedRow;
  ngOnInit(): void {}
  constructor(private http: HttpClient) {
    this.cols = [
      {
        field: 'id',
        header: '#Id',
      },
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'category',
        header: 'Category',
      },
      {
        field: 'quantity',
        header: 'Quantity',
      },
    ];
    this.getProductData();
  }
  getProductData(): void {
    const url = 'http://localhost:5001/api/product/find-all';
    this.http.get(url).subscribe((data) => {
      this.tableData = data;
    });
  }
  onSelectionChange(event) {}
  createUsers() {
    this.modalUser.show();
  }
  editUser() {}
  deleteUser() {
    const url =
      'http://localhost:5001/api/product/delete/' + this.selectedRow.id;
    this.http.delete(url).subscribe(
      // (data1) => {
      //   this.getProductData();
      // },
      // (error) => {
      //   // console.error(error);
      // },
      // ()=>{
      // }
      {
        next: () => {
          this.getProductData();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      }
    );
  }
}
