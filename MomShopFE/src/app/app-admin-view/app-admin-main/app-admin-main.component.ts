import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './app-admin-main.component.html',
  styleUrls: ['./app-admin-main.component.scss']
})
export class AppAdminMainComponent {
  cols;
  tableData
  weatherData
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.cols = [
      {
          field: 'id',
          header: '#Id'
      },
      {
          field: 'name',
          header: 'Name'
      },
      {
          field: 'category',
          header: 'Category'
      },
      {
        field: 'quantity',
        header: 'Quantity'
    },
  ];
    this.getProductData();
  }

  getWeatherData(): void {
    const url = 'http://localhost:5000/WeatherForecast';
    this.http.get(url).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  getProductData(): void {
    const url = 'http://localhost:5001/api/product/find-all';
    this.http.get(url).subscribe(
      data => {
        this.tableData = data;
        console.log(this.tableData);
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
  onSelectionChange(event){}
}
