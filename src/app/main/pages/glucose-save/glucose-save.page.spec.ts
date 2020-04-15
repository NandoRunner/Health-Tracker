import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlucoseSavePage } from './glucose-save.page';

describe('GlucoseSavePage', () => {
  let component: GlucoseSavePage;
  let fixture: ComponentFixture<GlucoseSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlucoseSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlucoseSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
