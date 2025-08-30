import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimalCadastradoComponent } from './card-animal-cadastrado.component';

describe('CardAnimalCadastradoComponent', () => {
  let component: CardAnimalCadastradoComponent;
  let fixture: ComponentFixture<CardAnimalCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnimalCadastradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnimalCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
