import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
 tableData;
 colDef: any[];
 cols;
 selectedProduct;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
  ];
    this.getWeatherData();
    this.colDef = [
     {
       field: 'name',
       header: 'Name'
     },
     {
       field: 'category',
       header: 'category'
     },
     {
       field: 'quantity',
       header: 'quantity'
     }
    ]
  }
  getWeatherData(): void {
    const url = 'http://localhost:5000/api/product/find-all';
    this.http.get(url).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error(error);
      }
    );
  }
  onSelectionChange(event){
    console.log(event);
  }
}
