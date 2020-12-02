import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-deceased',
  templateUrl: './deceased.component.html',
  styleUrls: ['./deceased.component.css']
})
export class DeceasedComponent implements OnInit {
  settings = {
    columns: {
      state: {
        title: 'state'
      },
      death: {
        title: 'deceased'
      }
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    }
  };
  data;
  // private tweets: any;
  // public filterData: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get('http://127.0.0.1:5000/api/byDeath').subscribe(data => {
      this.data = data;
      /*console.log(data)*/
      // this.createGraph(data);
    });
  }

    // createGraph(data) {
    //   const chart = am4core.create('deceased', am4charts.PieChart);
    //   chart.data =  data;

      // const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      // categoryAxis.dataFields.category = 'state';
      // categoryAxis.title.text = 'State';
      //
      // const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.title.text = 'deceased';
      // const series = chart.series.push(new am4charts.ColumnSeries());
      // series.dataFields.valueY = 'death';
      // series.dataFields.categoryX = 'state';
    //   const pieSeries = chart.series.push(new am4charts.PieSeries());
    //   pieSeries.dataFields.value = 'death';
    //   pieSeries.dataFields.category = 'state';
    // }

}
