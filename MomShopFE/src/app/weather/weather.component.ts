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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeatherData();
    this.tableData = [
      {
          firstname: 'David',
          lastname: 'ace',
          age: '40',
      },
      {
          firstname: 'AJne',
          lastname: 'west',
          age: '40',
      },
      {
          firstname: 'Mak',
          lastname: 'Lame',
          age: '40',
      },
      {
          firstname: 'Peter',
          lastname: 'raw',
          age: '40',
      },
      {
          firstname: 'Kane',
          lastname: 'James',
          age: '40',
      },
      {
          firstname: 'Peter',
          lastname: 'raw',
          age: '40',
      },
      {
          firstname: 'Kane',
          lastname: 'James',
          age: '40',
      },
      {
          firstname: 'Peter',
          lastname: 'raw',
          age: '40',
      },
      {
          firstname: 'Kane',
          lastname: 'James',
          age: '40',
      },
      {
          firstname: 'Peter',
          lastname: 'raw',
          age: '40',
      },
      {
          firstname: 'Kane',
          lastname: 'James',
          age: '40',
      },
      {
          firstname: 'Peter',
          lastname: 'raw',
          age: '40',
      },
      {
          firstname: 'Kane',
          lastname: 'James',
          age: '40',
      },
  ];
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
}
