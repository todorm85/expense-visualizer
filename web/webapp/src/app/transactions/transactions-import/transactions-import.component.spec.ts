import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsImportComponent } from './transactions-import.component';

describe('TransactionsImportComponent', () => {
  let component: TransactionsImportComponent;
  let fixture: ComponentFixture<TransactionsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
