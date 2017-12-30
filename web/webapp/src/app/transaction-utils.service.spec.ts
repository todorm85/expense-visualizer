import { TestBed, inject } from '@angular/core/testing';

import { TransactionUtilsService } from './transaction-utils.service';

describe('TransactionUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionUtilsService]
    });
  });

  it('should be created', inject([TransactionUtilsService], (service: TransactionUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
