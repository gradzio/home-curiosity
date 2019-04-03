import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailComponent } from './lesson-detail.component';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LessonModel } from '../lesson.model';

describe('LessonDetailComponent', () => {
  let component: LessonDetailComponent;
  let fixture: ComponentFixture<LessonDetailComponent>;
  const activatedRoute = new ActivatedRoute();
  activatedRoute.data = of({lesson: new LessonModel('guid', 'name', 'icon', 'videoUrl')});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDetailComponent ],
      imports: [RouterTestingModule, PresentationComponentsModule],
      providers: [{provide: ActivatedRoute, useValue: activatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
