import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-covid-policy',
  templateUrl: './covid-policy.component.html',
  styleUrls: ['./covid-policy.component.css']
})
export class CovidPolicyComponent implements OnInit {
  policy_data: any = [];
  settings = {
    columns: {
      location: {
        title: 'state'
      },
      Status_of_Reopening: {
        title: 'Reopen policy'
      },
      Stay_at_Home_Order: {
        title: 'Stay at home order'
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

  quarantine_data: any = [];
  settingsQ = {
    columns: {
      location: {
        title: 'state'
      },
      Mandatory_Quarantine: {
        title: 'Mandatory Quarantine'
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

  barOpen_data: any = [];
  settingsB = {
    columns: {
      location: {
        title: 'state'
      },
      Large_Gatherings_Ban: {
        title: 'Large Gathering'
      },
      Face_Covering_Requirement: {
        title: 'Face Covering'
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
    this.http.get('http://127.0.0.1:5000/api/byPolicy').subscribe(data => {
      this.policy_data = data;
    });
    this.http.get('http://127.0.0.1:5000/api/byQuarantine').subscribe(data => {
      this.quarantine_data = data;
    });
    this.http.get('http://127.0.0.1:5000/api/byPolicyOfBarReopen').subscribe(data => {
      this.barOpen_data = data;
    });
  }

}
