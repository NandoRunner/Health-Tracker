import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightSavePage } from './weight-save.page';

describe('WeightSavePage', () => {
  let component: WeightSavePage;
  let fixture: ComponentFixture<WeightSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
