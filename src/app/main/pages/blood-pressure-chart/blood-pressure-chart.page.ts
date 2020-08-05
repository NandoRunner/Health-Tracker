import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyChart } from '../../../core/models/myChart.model';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseChartPage } from 'src/app/core/pages/base-chart';

import { BloodPressureService } from '../../services/blood-pressure.service';
import { ProjectType } from 'src/app/core/models/projectType.enum';

@Component({
  selector: 'app-blood-pressure-chart',
  templateUrl: './blood-pressure-chart.page.html',
  styleUrls: ['../blue.page.scss']
})
export class BloodPressureChartPage extends BaseChartPage {

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private authService: AuthService,
    private service: BloodPressureService
  ) {
    super();
    this.lists$ = new Observable<MyChart[]>();
    this.isGroup = true;
    this.projectType = ProjectType.healthTracker;
  }

  async ngOnInit(): Promise<void> {
    this.splitMin = 120;
    this.splitMax = 130;
    this.measure = ["Sis mmHg", "Dia mmHg", "bpm"];
    this.numCols = 3;
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
              value2: b.value2,
              value3: b.value3,
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

    this.valueType = 1;

    if (param === "1") {
      this.createPieChart();
    }
    else {
      this.createBarChart(10);
    }
  }

  
}
