import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyChart } from '../../../core/models/myChart.model';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseChartPage } from 'src/app/core/pages/base-chart';

import { WeightService } from '../../services/weight.service';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.page.html',
  styleUrls: ['./weight-chart.page.scss'],
})
export class WeightChartPage extends BaseChartPage {

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private authService: AuthService,
    private service: WeightService
  ) {
    super();
    this.lists$ = new Observable<MyChart[]>();
    this.isGroup = true;
  }

  async ngOnInit(): Promise<void> {
    this.splitMin = 0;
    this.splitMax = 0;
    this.measure = "Kg";
    await this.loadData();
  }

  async loadData() {
    const loading = await this.overlayService.loading();

    let myChart: MyChart[] = [];

    this.authService.authState$.subscribe(user => {
      if (user) {
        this.service.getAll().forEach(a => {
          a.forEach(b => {
            myChart.push({
              name: b.date.toDate().toLocaleString().split(' ')[0],
              value: b.value,
              value2: 0,
              color: ""
            });
          });
          this.lists$ = of(myChart);
          this.lists$.pipe(take(1)).subscribe(lists => loading.dismiss());

          this.changeType("0");
        });
      }
    });
  }
  
  changeType(param: any) {
    this.showBar = this.showPie = false;

    if (param === "1") {
      this.createPieChart();
    }
    else {
      this.createBarChart(10);
    }
  }

}
