import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPublicacaoComponent } from './cadastro-publicacao.component';

describe('CadastroPublicacaoComponent', () => {
  let component: CadastroPublicacaoComponent;
  let fixture: ComponentFixture<CadastroPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPublicacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
