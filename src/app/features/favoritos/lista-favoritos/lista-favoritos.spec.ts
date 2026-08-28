import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFavoritos } from './lista-favoritos';

describe('ListaFavoritos', () => {
  let component: ListaFavoritos;
  let fixture: ComponentFixture<ListaFavoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFavoritos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFavoritos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});