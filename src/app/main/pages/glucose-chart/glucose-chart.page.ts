import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyChart } from '../../../core/models/myChart.model';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseChartPage } from 'src/app/core/pages/base-chart';

import { GlucoseService } from '../../services/glucose.service';

@Component({
  selector: 'app-glucose-chart',
  templateUrl: './glucose-chart.page.html',
  styleUrls: ['../orange.page.scss']
})
export class GlucoseChartPage extends BaseChartPage {

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private authService: AuthService,
    private service: GlucoseService
  ) {
    super();
    this.lists$ = new Observable<MyChart[]>();
    this.isGroup = true;
  }

  async ngOnInit(): Promise<void> {
    this.splitMin = 100;
    this.splitMax = 140;
    this.measure = "mg/dL";
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
