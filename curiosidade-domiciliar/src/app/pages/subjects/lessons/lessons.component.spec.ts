import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { ActivatedRoute } from '@angular/router';
import { LessonModel } from './lesson.model';
import { BehaviorSubject, of } from 'rxjs';
import { IconButton } from 'src/app/shared/presentation-components/icon-button/icon-button';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;
  const activatedRoute = new ActivatedRoute();
  activatedRoute.data = of({lessons: [new LessonModel('guid', 'name', 'icon', 'videoUrl')]});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsComponent ],
      imports: [RouterTestingModule, MaterialModule, PresentationComponentsModule],
      providers: [{provide: ActivatedRoute, useValue: activatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get lessons', () => {
    component.iconButtonVMs$.subscribe(iconButtons => {
      expect(iconButtons.length).toEqual(1);
    }).unsubscribe();
  });
});
