import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTutorComponent } from './buscar-tutor.component';

describe('BuscarTutorComponent', () => {
  let component: BuscarTutorComponent;
  let fixture: ComponentFixture<BuscarTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
