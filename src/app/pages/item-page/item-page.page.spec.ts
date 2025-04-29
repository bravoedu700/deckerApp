import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemPagePage } from './item-page.page';

describe('ItemPagePage', () => {
  let component: ItemPagePage;
  let fixture: ComponentFixture<ItemPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
