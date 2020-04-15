import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

export class BaseChartPage implements OnInit {

  protected title: string;
  protected subTitle: string;
  protected language: string;

  protected showPie: boolean = false;
  protected showBar: boolean = true;

  protected listColors: string[];
  protected listLabels: string[];

  @ViewChild('viewPieChart', null) viewPieChart;
  @ViewChild('viewBarChart', null) viewBarChart;

  protected myPieChart: any;
  protected myBarChart: any;
  
  protected chartType: any;
  protected splitMin: number;
  protected splitMax: number;
  protected measure: string;

  loading: HTMLIonLoadingElement;

  protected lists$: Observable<any>;

  protected constructor(
  ) {
    this.listColors = ['rgb(0, 150, 0)', 'rgb(0, 0, 150)', 'rgb(150, 0, 0)']; 
  }

  ngOnInit() {
  }

  protected createChart(chartType: String, view: any) : Chart {
    return new Chart(view.nativeElement, {
      type: chartType, 
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: '',
          borderWidth: 1

        }]
      },
      options: {
        legend: {
          labels: {
            boxWidth: 0
          }
        }
      // },
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true,
      //     }
      //   }]
      }
    });
  }

  protected preparePieChart() {
    this.myPieChart.data.datasets[0].label = this.measure;

    this.lists$.forEach(a => {
      this.myPieChart.data.datasets[0].data[0] = 0;
      this.myPieChart.data.datasets[0].data[1] = 0;
      this.myPieChart.data.datasets[0].data[2] = 0;
      a.forEach(b => {
        this.myPieChart.data.datasets[0].data[this.getIndexValue(b.value)] += 1;  
        });
    });
    var i = 0;

    for (let i = 0; i < 3; i++) {
      this.myPieChart.data.labels[i] = this.listLabels[i];
      this.myPieChart.data.datasets[0].backgroundColor[i] = this.listColors[i];
      this.myPieChart.update();
    }
  }

  protected prepareBarChart(maxItems: number) {
    this.myBarChart.data.datasets[0].label = this.measure;

    var i = 0;
    this.lists$.forEach(a => {
      a.forEach(b => {
        if (i < maxItems) {
          this.myBarChart.data.labels[i] = b.date.toDate().toISOString().split('T')[0];
          this.myBarChart.data.datasets[0].backgroundColor[i] =  this.listColors[this.getIndexValue(b.value)];
          this.myBarChart.data.datasets[0].data[i++] = b.value;
          this.myBarChart.update();
        }
      });
    });
    this.myBarChart.update();
  }
  
  private getIndexValue(value: number) : number{
    if (value < this.splitMin)
      return 0;
    else if (value >= this.splitMax)
      return 2;
    else
    return 1;
  }
}
