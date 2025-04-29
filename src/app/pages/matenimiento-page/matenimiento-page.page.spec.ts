import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatenimientoPagePage } from './matenimiento-page.page';

describe('MatenimientoPagePage', () => {
  let component: MatenimientoPagePage;
  let fixture: ComponentFixture<MatenimientoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatenimientoPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatenimientoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
