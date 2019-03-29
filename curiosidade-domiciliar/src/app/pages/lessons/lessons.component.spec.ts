import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { ActivatedRoute } from '@angular/router';
import { LessonModel } from './lesson.model';
import { BehaviorSubject } from 'rxjs';

fdescribe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;
  const activatedRoute = new ActivatedRoute();
  activatedRoute.data = new BehaviorSubject({lessons: [new LessonModel('name', 'icon')]});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsComponent ],
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
    component.lessons$.subscribe(lessons => {
      expect(lessons.length).toEqual(1);
      expect(lessons[0].name).toEqual('name');
    }).unsubscribe();
  });
});
