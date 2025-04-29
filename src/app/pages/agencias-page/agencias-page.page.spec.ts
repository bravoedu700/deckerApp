import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgenciasPagePage } from './agencias-page.page';

describe('AgenciasPagePage', () => {
  let component: AgenciasPagePage;
  let fixture: ComponentFixture<AgenciasPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenciasPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciasPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
