import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraVacinacaoComponent } from './carteira-vacinacao.component';

describe('CarteiraVacinacaoComponent', () => {
  let component: CarteiraVacinacaoComponent;
  let fixture: ComponentFixture<CarteiraVacinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteiraVacinacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteiraVacinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
