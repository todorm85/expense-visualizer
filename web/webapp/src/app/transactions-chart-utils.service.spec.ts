import { TestBed, inject } from '@angular/core/testing';

import { TransactionsChartUtilsService } from './transactions-chart-utils.service';

describe('TransactionsChartUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsChartUtilsService]
    });
  });

  it('should be created', inject([TransactionsChartUtilsService], (service: TransactionsChartUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
