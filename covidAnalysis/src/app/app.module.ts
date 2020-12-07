import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule} from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule} from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { DeceasedComponent } from './deceased/deceased.component';
import { USASummaryComponent } from './usasummary/usasummary.component';
import { CasesByDateComponent } from './cases-by-date/cases-by-date.component';
import { CasesByStateComponent } from './cases-by-state/cases-by-state.component';
import { CovidPolicyComponent } from './covid-policy/covid-policy.component';
import { HospitalizedDataComponent } from './hospitalized-data/hospitalized-data.component';
import { TestingDataComponent } from './testing-data/testing-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DeceasedComponent,
    USASummaryComponent,
    CasesByDateComponent,
    CasesByStateComponent,
    CovidPolicyComponent,
    HospitalizedDataComponent,
    TestingDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ChartsModule,
    HttpClientModule,
    GoogleChartsModule.forRoot('AIzaSyAohWG1VqFhEHkxpXRV77aHYoGyRZB1ktU')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
