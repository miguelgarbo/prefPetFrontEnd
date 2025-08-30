import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPublicacaoComponent } from './card-publicacao.component';

describe('CardPublicacaoComponent', () => {
  let component: CardPublicacaoComponent;
  let fixture: ComponentFixture<CardPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPublicacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
