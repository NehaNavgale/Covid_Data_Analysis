import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-cases-by-state',
  templateUrl: './cases-by-state.component.html',
  styleUrls: ['./cases-by-state.component.css']
})
export class CasesByStateComponent implements OnInit {
  covid_data: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/api/byCases').subscribe(data => {
      this.covid_data = data;
      this.createGraph(data);
    });
  }

  createGraph(data) {
    const chart = am4core.create('casesByState', am4charts.XYChart);
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

    // const labelTemplate = categoryAxis.renderer.labels.template;
    // // labelTemplate.rotation = -90;
    // labelTemplate.horizontalCenter = 'left';
    // labelTemplate.verticalCenter = 'middle';
    // labelTemplate.dy = 10; // moves it a bit down;
    // labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.strictMinMax = true;
    // valueAxis.min = 0;
    // valueAxis.extraMax = 0.1;
    // valueAxis.renderer.grid.template.disabled = true;


// Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'tot_cases';
    series.dataFields.categoryX = 'state';
    series.columns.template.tooltipText = '{valueY.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    // const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    // labelBullet.label.verticalCenter = 'bottom';
    // labelBullet.label.dy = -10;
    // labelBullet.label.text = '{values.valueY.workingValue.formatNumber("#.")}';

    chart.zoomOutButton.disabled = true;

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // setInterval(function () {
    //   am4core.array.each(chart.data, function (item) {
    //     item.tot_cases += Math.round(Math.random() * 200 - 100);
    //     item.tot_cases = Math.abs(item.tot_cases);
    //   });
    //   chart.invalidateRawData();
    // }, 2000);

    categoryAxis.sortBySeries = series;
    // categoryAxis.sortBySeries = series

    // const columnTemplate = series.columns.template;
    // columnTemplate.adapter.add('fill', (fill, target) => {
    //   return chart.colors.getIndex(target.dataItem.index);
    // });

    // columnTemplate.adapter.add('stroke', (stroke, target) => {
    //   return chart.colors.getIndex(target.dataItem.index);
    // });
  }

}
