import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightChartPage } from './weight-chart.page';

describe('WeightChartPage', () => {
  let component: WeightChartPage;
  let fixture: ComponentFixture<WeightChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
