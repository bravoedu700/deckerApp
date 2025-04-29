import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepuestosPagePage } from './repuestos-page.page';

describe('RepuestosPagePage', () => {
  let component: RepuestosPagePage;
  let fixture: ComponentFixture<RepuestosPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepuestosPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepuestosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
