import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { ProjectType } from '../models/projectType.enum';
import { NumberFormatStyle } from '@angular/common';

export class BaseChartPage implements OnInit {

  public title: string;
  public subTitle: string;
  protected language: string;

  public showPie: boolean = false;
  public showBar: boolean = true;
  public showPie2: boolean = false;
  public showBar2: boolean = false;

  protected listColors: string[];
  protected listLabels: string[];
  protected pointStyles: string[];
  

  @ViewChild('viewPieChart') viewPieChart;
  @ViewChild('viewBarChart') viewBarChart;
  @ViewChild('viewPieChart2') viewPieChart2;
  @ViewChild('viewBarChart2') viewBarChart2;

  protected myPieChart: any;
  protected myBarChart: any;
  protected chartType: any;
  protected splitMin: number;
  protected splitMax: number;
  protected measure: string[];
  protected isGroup: boolean;

  loading: HTMLIonLoadingElement;

  protected lists$: Observable<any>;

  protected projectType: number;
  protected valueType: number = 1;
  protected numCols: number = 1;

  protected constructor(
  ) {
    this.listColors = ['rgb(0, 150, 0)', 'rgb(0, 0, 150)', 'rgb(150, 0, 0)'];
    this.pointStyles = ['circle',
    'triangle',
    'rect',
    'rectRounded',
    'rectRot',
    'cross',
    'crossRot',
    'star',
    'line',
    'dash'];
  }

  ngOnInit() {
  }

  protected createChart(chartType: String, view: any): Chart {
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
          yAxes: [{
            stacked: false,
          }],
          xAxes: [{
            stacked: false,
          }]
        }, elements: {
						point: {
							pointStyle: this.pointStyles[3]
						}
					}
      }
    });
  }

  protected prepareSplitGroups() {
    let min = 0;
    let max = 0;
    let primeiro = true;

    this.lists$.forEach(a => {
      a.forEach(b => {

        var val = (this.valueType === 2 ? b.value2 : b.value);

        //console.log(b.value);
        if (primeiro) {
          min = val;
          max = val;
          primeiro = false;
        }

        if (val > max) {
          max = val;
        }
        else if (val < min) {
          min = val;
        }
      });
      let dif = max - min;
      dif /= 3;
      this.splitMin = parseFloat((min + dif).toFixed(1));
      this.splitMax = parseFloat((max - dif).toFixed(1));
      this.myBarChart.options.scales.yAxes[0].ticks.min = min - dif;
    });
  }

  protected prepareGroupPieChart() {
    this.myPieChart.data.datasets[0].label = this.measure[0];
    this.myPieChart.options.legend.labels.boxWidth = 8;

    this.lists$.forEach(a => {
      this.myPieChart.data.datasets[0].data[0] = 0;
      this.myPieChart.data.datasets[0].data[1] = 0;
      this.myPieChart.data.datasets[0].data[2] = 0;
      a.forEach(b => {
        var val = (this.valueType === 2 ? b.value2 : b.value);

        this.myPieChart.data.datasets[0].data[this.getIndexValue(val)] += 1;
      });
    });
    var i = 0;

    for (let i = 0; i < 3; i++) {
      this.myPieChart.data.labels[i] = this.listLabels[i];
      this.myPieChart.data.datasets[0].backgroundColor[i] = this.listColors[i];
      this.myPieChart.update();
    }
  }

  protected preparePieChart() {
    this.myPieChart.data.datasets[0].label = this.measure;
    this.myPieChart.options.legend.labels.boxWidth = 8;

    this.lists$.forEach(a => {
      var i = 0;
      a.forEach(b => {
        var val = (this.valueType === 2 ? b.value2 : b.value);

        this.myPieChart.data.labels[i] = b.name;
        this.myPieChart.data.datasets[0].backgroundColor[i] = b.color;
        this.myPieChart.data.datasets[0].data[i++] = val;
        this.myPieChart.update();
      });
    });
  }

  protected prepareBarChart(maxItems: number) {

    this.myBarChart.data.datasets[0].label = this.measure[0];

    for (let i = 1; i < this.numCols; i++) {
      this.myBarChart.data.datasets[i] = {
        label: '',
        type: 'line',
        data: [],
        backgroundColor: [this.listColors[(i+i)%this.numCols]],
        borderColor: [this.listColors[(i+i)%this.numCols]],
        borderWidth: 4,
        fill: false,
        //borderDash: [15],
        pointRadius: 5,
        pointHoverRadius: 10,
      };
      this.myBarChart.data.datasets[i].label = this.measure[i];
    }

    var i = 0;
    this.lists$.forEach(a => {
      a.forEach(b => {
        if (i < maxItems || maxItems == 0) {
          
          this.myBarChart.data.labels[i] = b.name;
          let val: number[];
          if (this.projectType === ProjectType.healthTracker && this.numCols === 3)
          {
             val = [b.value3, b.value, b.value2];
          }
          else
          {
            val = [b.value, b.value2, b.value3];
          }

          val[0] = (this.valueType === 2 ? val[1] : val[0]);

          for (let j = 0; j < this.numCols; j++) {
            this.myBarChart.data.datasets[j].data[i] = val[j];
            if (this.numCols > 1) {
              this.myBarChart.data.datasets[j].backgroundColor[i] = this.listColors[(j+j)%this.numCols];
            }
            else {
              this.myBarChart.data.datasets[j].backgroundColor[i] = (b.color === "" ? this.listColors[this.getIndexValue(val[j])] : b.color);
            }
          }
          
          i++;
          this.myBarChart.update();
        }
      });
    });
    this.myBarChart.update();
  }

  protected getIndexValue(value: number): number {
    if (value < this.splitMin)
      return 0;
    else if (value >= this.splitMax)
      return 2;
    else
      return 1;
  }

  protected createBarChart(results: number) {
    this.myBarChart = this.createChart('bar', (this.valueType === 1 ? this.viewBarChart : this.viewBarChart2));
    
    if ((this.splitMin === this.splitMax) || this.projectType === ProjectType.fixedExpenses) this.prepareSplitGroups();

    this.prepareBarChart(results);
    this.showBar = (this.valueType === 1);
    this.showBar2 = (this.valueType === 2);
    if (this.numCols > 1)
    {
      this.subTitle = "chart.bar-line.subTitle";
      this.title = "chart.bar-line.title";
    }
    else
    {
      this.subTitle = "chart.bar.subTitle";
      this.title = "chart.bar.title"; 
    }
  }

  protected createPieChart() {
    this.myPieChart = this.createChart('pie',  (this.valueType === 1 ? this.viewPieChart : this.viewPieChart2));
    if ((this.splitMin === this.splitMax) || this.projectType === ProjectType.fixedExpenses) this.prepareSplitGroups();
    if (this.isGroup) {
    this.listLabels = [`< ${this.splitMin} ${this.measure[0]}`, `entre ${this.splitMin} e ${this.splitMax} ${this.measure[0]}`, `>= ${this.splitMax} ${this.measure[0]}`];
    this.prepareGroupPieChart();
    }
    else {
       this.preparePieChart();
    }
    this.showPie = (this.valueType === 1);
    this.showPie2 = (this.valueType === 2);
    this.subTitle = "chart.pie.subTitle";
    this.title = "chart.pie.title";
    //todo: by Expense / by Categoy / by Item
    // period: month / week / year
    // sum(value) / avg(value) / count / avg count 
  }
}
