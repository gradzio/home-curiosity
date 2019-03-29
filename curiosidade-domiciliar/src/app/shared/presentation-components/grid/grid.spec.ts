import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid } from './grid';

fdescribe('Grid', () => {
  let component: Grid;
  let fixture: ComponentFixture<Grid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
