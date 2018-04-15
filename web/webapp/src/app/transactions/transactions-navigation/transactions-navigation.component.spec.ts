import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNavigationComponent } from './transactions-navigation.component';

describe('TransactionsNavigationComponent', () => {
  let component: TransactionsNavigationComponent;
  let fixture: ComponentFixture<TransactionsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
