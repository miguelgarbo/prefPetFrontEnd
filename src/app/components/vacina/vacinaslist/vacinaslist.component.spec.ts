import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaslistComponent } from './vacinaslist.component';

describe('VacinaslistComponent', () => {
  let component: VacinaslistComponent;
  let fixture: ComponentFixture<VacinaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacinaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacinaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
