import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-hospitalized-data',
  templateUrl: './hospitalized-data.component.html',
  styleUrls: ['./hospitalized-data.component.css']
})
export class HospitalizedDataComponent implements OnInit {
  hosp_data: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/api/byHospitalizationTotal').subscribe(data => {
      this.createGraph(data);
    });
  }

  createGraph(data) {
    const chart = am4core.create('hospRecords', am4charts.XYChart);
    chart.data = data;
    chart.paddingBottom = 30;
    chart.padding(40, 40, 40, 40);
    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'state';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inversed = false;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.maxZoomCount = 10;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.strictMinMax = true;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'totalHospitalizations';
    series.dataFields.categoryX = 'state';
    series.columns.template.tooltipText = '{valueY.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    chart.zoomOutButton.disabled = true;

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
  }

}
