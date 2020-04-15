import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaseItemComponent } from './base-item.component';

describe('BaseItemComponent', () => {
  let component: BaseItemComponent;
  let fixture: ComponentFixture<BaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
