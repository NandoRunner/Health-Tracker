import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodPressureSavePage } from './blood-pressure-save.page';

describe('BloodPressureSavePage', () => {
  let component: BloodPressureSavePage;
  let fixture: ComponentFixture<BloodPressureSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPressureSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodPressureSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
