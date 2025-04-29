import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeguroPage } from './seguro.page';

describe('SeguroPage', () => {
  let component: SeguroPage;
  let fixture: ComponentFixture<SeguroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeguroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
