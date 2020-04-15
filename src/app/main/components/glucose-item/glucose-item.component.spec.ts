import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlucoseItemComponent } from './glucose-item.component';

describe('GlucoseItemComponent', () => {
  let component: GlucoseItemComponent;
  let fixture: ComponentFixture<GlucoseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlucoseItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlucoseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
