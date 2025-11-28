import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAplicacaoVacinaVetComponent } from './historico-aplicacao-vacina-vet.component';

describe('HistoricoAplicacaoVacinaVetComponent', () => {
  let component: HistoricoAplicacaoVacinaVetComponent;
  let fixture: ComponentFixture<HistoricoAplicacaoVacinaVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoAplicacaoVacinaVetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoAplicacaoVacinaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
