import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightListPage } from './weight-list.page';

describe('WeightListPage', () => {
  let component: WeightListPage;
  let fixture: ComponentFixture<WeightListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
