import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodPressureListPage } from './blood-pressure-list.page';

describe('BloodPressureListPage', () => {
  let component: BloodPressureListPage;
  let fixture: ComponentFixture<BloodPressureListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPressureListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodPressureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
