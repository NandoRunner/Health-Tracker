import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { WeightService } from '../../services/weight.service';
import { Weight } from '../../models/weight.model';
import { BaseChartPage } from '../base-chart';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.page.html',
  styleUrls: ['./weight-chart.page.scss'],
})
export class WeightChartPage extends BaseChartPage {

 constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private service: WeightService
  ) {
    super();
    this.lists$ = new Observable<Weight[]>();
  }

  async ngOnInit(): Promise<void> {
    this.splitMin = 80.5;
    this.splitMax = 81;
    this.measure = "Kg";
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
    this.title = "Last 10 weight tests";
  }

  private createPieChart() {
    this.myPieChart = this.createChart('pie', this.viewPieChart);
    this.preparePieChart();
    this.showPie = true;
    this.subTitle = "Pie Chart";
    this.title = "Weight tests count per group";
  }

}
