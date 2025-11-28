import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAplicacaoVacinaComponent } from './cadastro-aplicacao-vacina.component';

describe('CadastroAplicacaoVacinaComponent', () => {
  let component: CadastroAplicacaoVacinaComponent;
  let fixture: ComponentFixture<CadastroAplicacaoVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAplicacaoVacinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAplicacaoVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
