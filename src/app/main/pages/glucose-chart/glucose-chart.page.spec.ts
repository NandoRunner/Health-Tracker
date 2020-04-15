import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlucoseChartPage } from './glucose-chart.page';

describe('GlucoseChartPage', () => {
  let component: GlucoseChartPage;
  let fixture: ComponentFixture<GlucoseChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlucoseChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlucoseChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
