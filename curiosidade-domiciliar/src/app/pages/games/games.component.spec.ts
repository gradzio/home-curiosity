import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PresentationComponentsModule, MaterialModule, RouterTestingModule],
      declarations: [ GamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain iconButtonVMs', () => {
      component.iconButtonVMs$.subscribe(iconButtons => {
        expect(iconButtons.length).toEqual(3);
      }).unsubscribe();
  });
});
