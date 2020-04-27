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
    this.measure = "Kg";
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
    this.prepareSplitGroups();
 
    if (param === "1")
    {
      this.listLabels = [`< ${this.splitMin} ${this.measure}`, `entre ${this.splitMin} e ${this.splitMax} ${this.measure}`, `>= ${this.splitMax} ${this.measure}`];
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
    this.subTitle = "chart.bar.subTitle";
    this.title = "chart.bar.title";
  }

  private createPieChart() {
    this.myPieChart = this.createChart('pie', this.viewPieChart);
    this.preparePieChart();
    this.showPie = true;
    this.subTitle = "chart.pie.subTitle";
    this.title = "chart.pie.title";
  }

}
