import { TestBed, inject } from '@angular/core/testing';

import { ResgisterationService } from './resgisteration.service';

describe('ResgisterationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResgisterationService]
    });
  });

  it('should be created', inject([ResgisterationService], (service: ResgisterationService) => {
    expect(service).toBeTruthy();
  }));
});
