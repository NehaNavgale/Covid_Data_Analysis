import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-cases-by-date',
  templateUrl: './cases-by-date.component.html',
  styleUrls: ['./cases-by-date.component.css']
})
export class CasesByDateComponent implements OnInit {
  covid_data: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/api/byDateKS').subscribe(data => {
      this.createGraph(data);
    });
  }

  createGraph(data) {
    const chart = am4core.create('casesByDate', am4charts.XYChart);

// Add data
    chart.data =  data;
    console.log(chart.data);

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'tot_cases';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';

    series.tooltip.pointerOrientation = 'vertical';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    chart.scrollbarX = new am4core.Scrollbar();

// Create axes
//     const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//     categoryAxis.dataFields.category = 'Date';
//
//     const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//
// // Create series
//     const series = chart.series.push(new am4charts.LineSeries());
//     series.name = 'Units';
//     series.stroke = am4core.color('#CDA2AB');
//     series.strokeWidth = 3;
//     series.dataFields.valueY = 'positive';
//     series.dataFields.categoryX = 'date';
  }

}
