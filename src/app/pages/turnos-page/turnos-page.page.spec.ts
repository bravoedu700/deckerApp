import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurnosPagePage } from './turnos-page.page';

describe('TurnosPagePage', () => {
  let component: TurnosPagePage;
  let fixture: ComponentFixture<TurnosPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurnosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
