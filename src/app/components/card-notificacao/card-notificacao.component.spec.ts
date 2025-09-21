import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotificacaoComponent } from './card-notificacao.component';

describe('CardNotificacaoComponent', () => {
  let component: CardNotificacaoComponent;
  let fixture: ComponentFixture<CardNotificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNotificacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
