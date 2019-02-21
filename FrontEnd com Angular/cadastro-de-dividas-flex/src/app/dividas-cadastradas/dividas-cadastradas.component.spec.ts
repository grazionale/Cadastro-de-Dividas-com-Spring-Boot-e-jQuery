import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividasCadastradasComponent } from './dividas-cadastradas.component';

describe('DividasCadastradasComponent', () => {
  let component: DividasCadastradasComponent;
  let fixture: ComponentFixture<DividasCadastradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividasCadastradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividasCadastradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
