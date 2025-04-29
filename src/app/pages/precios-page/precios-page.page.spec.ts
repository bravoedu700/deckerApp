import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreciosPagePage } from './precios-page.page';

describe('PreciosPagePage', () => {
  let component: PreciosPagePage;
  let fixture: ComponentFixture<PreciosPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciosPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreciosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
