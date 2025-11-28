import { TestBed } from '@angular/core/testing';

import { AplicacaoVacinaService } from './aplicacao-vacina.service';

describe('AplicacaoVacinaService', () => {
  let service: AplicacaoVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicacaoVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
