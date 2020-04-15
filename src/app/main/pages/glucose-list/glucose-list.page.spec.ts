import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlucoseListPage } from './glucose-list.page';

describe('GlucoseListPage', () => {
  let component: GlucoseListPage;
  let fixture: ComponentFixture<GlucoseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlucoseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlucoseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
