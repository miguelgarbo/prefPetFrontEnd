import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarChipComponent } from './buscar-chip.component';

describe('BuscarChipComponent', () => {
  let component: BuscarChipComponent;
  let fixture: ComponentFixture<BuscarChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
