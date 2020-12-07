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
  covid_data_state: any = [];
  covid_data: any = [];
  death_data: any = [];
  rise_data: any = [];
  settings = {
    columns: {
      state: {
        title: 'state'
      },
      tot_cases: {
        title: 'cases'
      },
      tot_death: {
        title: 'deceased'
      }
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    attr: {
      class: 'table table-bordered'
    }
  };

  settingsD = {
    columns: {
      state: {
        title: 'state'
      },
      death: {
        title: 'deceased'
      },
      date: {
        title: 'date'
      }
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    attr: {
      class: 'table table-bordered'
    }
  };

  settingsC = {
    columns: {
      state: {
        title: 'state'
      },
      new_case: {
        title: 'case'
      },
      date: {
        title: 'date'
      }
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    attr: {
      class: 'table table-bordered'
    }
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/api/byCasesTop10State').subscribe(data => {
      this.covid_data_state = data;
      this.createGraph(data);
    });

    this.http.get('http://127.0.0.1:5000/api/byCases').subscribe(data => {
      this.covid_data = data;
    });

    this.http.get('http://127.0.0.1:5000/api/byDeath').subscribe(data => {
      this.death_data = data;
    });

    this.http.get('http://127.0.0.1:5000/api/bySingleDayRise').subscribe(data => {
      this.rise_data = data;
    });

    this.http.get('http://127.0.0.1:5000/api/byNovUSACases').subscribe(data => {
      this.createUSAGraph(data);
    });
  }
  createGraph(data) {
    const chart = am4core.create('casesByTop10State', am4charts.XYChart);
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

  createUSAGraph(data) {
    const chartUSA = am4core.create('USANovCases', am4charts.XYChart);
    chartUSA.data =  data;
    console.log(chartUSA.data);

    chartUSA.colors.step = 2;
    const dateAxis = chartUSA.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    this.createAxisAndSeries(chartUSA, 'total_cases', 'total_cases', false);
    this.createAxisAndSeries(chartUSA, 'total_deaths', 'total_deaths', true);
  }

  createAxisAndSeries(chart, field, name, opposite) {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // if (this.chartUSA.yAxes.indexOf(valueAxis) !== 0) {
    //    valueAxis.syncWithAxis = this.chartUSA.yAxes.getIndex(0);
    // }

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = '{name}: [bold]{valueY}[/]';
    series.tensionX = 0.8;
    series.showOnInit = true;

    const interfaceColors = new am4core.InterfaceColorSet();
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  }

}
