import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeCadastroComponent } from './entidade-cadastro.component';

describe('EntidadeCadastroComponent', () => {
  let component: EntidadeCadastroComponent;
  let fixture: ComponentFixture<EntidadeCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadeCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
