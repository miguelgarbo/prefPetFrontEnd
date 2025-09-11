import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarPublicacaoComponent } from './nav-bar-publicacao.component';

describe('NavBarPublicacaoComponent', () => {
  let component: NavBarPublicacaoComponent;
  let fixture: ComponentFixture<NavBarPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarPublicacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
