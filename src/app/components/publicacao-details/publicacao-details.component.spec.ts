import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacaoDetailsComponent } from './publicacao-details.component';

describe('PublicacaoDetailsComponent', () => {
  let component: PublicacaoDetailsComponent;
  let fixture: ComponentFixture<PublicacaoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacaoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacaoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
