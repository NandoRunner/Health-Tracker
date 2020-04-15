import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { GlucoseService } from '../../services/glucose.service';
import { Glucose } from '../../models/glucose.model';
import { BaseChartPage } from '../base-chart';

@Component({
  selector: 'app-glucose-chart',
  templateUrl: './glucose-chart.page.html',
  styleUrls: ['./glucose-chart.page.scss'],
})
export class GlucoseChartPage extends BaseChartPage {

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private service: GlucoseService
  ) {
    super();
    this.lists$ = new Observable<Glucose[]>();
  }

  async ngOnInit(): Promise<void> {
    this.splitMin = 100;
    this.splitMax = 140;
    this.measure = "mg/dL";
    this.listLabels = [`< ${this.splitMin} ${this.measure}`, `entre ${this.splitMin} e ${this.splitMax} ${this.measure}`, `>= ${this.splitMax} ${this.measure}`];
    await this.loadData();
    this.changeType("0");
  }

  async loadData() {
    const loading = await this.overlayService.loading();
    this.lists$ = this.service.getAll();
    this.lists$.pipe(take(1)).subscribe(lists => loading.dismiss());
  }
  
  changeType(param: any) {
    this.showBar = this.showPie = false;

    if (param === "1")
    {
      this.createPieChart();
    }
    else
    {
      this.createBarChart();
    }
  }

  private createBarChart() {
    this.myBarChart = this.createChart('bar', this.viewBarChart);
    this.prepareBarChart(10);
    this.showBar = true;
    this.subTitle = "Bar Chart";
    this.title = "Last 10 glucose tests";
  }

  private createPieChart() {
    this.myPieChart = this.createChart('pie', this.viewPieChart);
    this.preparePieChart();
    this.showPie = true;
    this.subTitle = "Pie Chart";
    this.title = "Glucose tests count per group";
  }
}
