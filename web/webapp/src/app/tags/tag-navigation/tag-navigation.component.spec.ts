import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagNavigationComponent } from './tag-navigation.component';

describe('TagNavigationComponent', () => {
  let component: TagNavigationComponent;
  let fixture: ComponentFixture<TagNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
