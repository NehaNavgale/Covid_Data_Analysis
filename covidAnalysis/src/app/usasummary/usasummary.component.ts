import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-usasummary',
  templateUrl: './usasummary.component.html',
  styleUrls: ['./usasummary.component.css']
})
export class USASummaryComponent implements OnInit {
  covid_data: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/api/byUSATotal').subscribe(data => {
      this.covid_data = data;
      console.log(this.covid_data[0].totalDeath);
    });
  }

}
