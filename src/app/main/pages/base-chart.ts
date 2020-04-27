import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

export class BaseChartPage implements OnInit {

  public title: string;
  public subTitle: string;
  protected language: string;

  public showPie: boolean = false;
  public showBar: boolean = true;

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
        }, scales: {
          yAxes: []
        }
      }
    });
  }

  protected prepareSplitGroups()
  {
    let min = 0;
    let max = 0;
    let primeiro = true;

    this.lists$.forEach(a => {
      a.forEach(b => {
        //console.log(b.value);
        if (primeiro) {
          min = b.value;
          max = b.value;
          primeiro = false;
        }

        if (b.value > max) {
          max = b.value;
        }
        else if (b.value < min) {
          min = b.value;
        }
      });
      let dif = max - min;
      dif /= 3;
      this.splitMin = parseFloat((min + dif).toFixed(1));
      this.splitMax = parseFloat((max - dif).toFixed(1));
      this.myBarChart.options.scales.yAxes[0].ticks.min = min - dif;
    });
  }

  protected preparePieChart() {
    this.myPieChart.data.datasets[0].label = this.measure;
    this.myPieChart.options.legend.labels.boxWidth = 8;

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
          this.myBarChart.data.labels[i] = b.date.toDate().toLocaleString().split(' ')[0];
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
