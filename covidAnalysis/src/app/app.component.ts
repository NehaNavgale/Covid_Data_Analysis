import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from './locationData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covidAnalysis';
  constructor(private http: HttpClient) {}
}
