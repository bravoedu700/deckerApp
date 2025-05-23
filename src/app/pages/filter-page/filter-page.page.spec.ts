import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterPagePage } from './filter-page.page';

describe('FilterPagePage', () => {
  let component: FilterPagePage;
  let fixture: ComponentFixture<FilterPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
