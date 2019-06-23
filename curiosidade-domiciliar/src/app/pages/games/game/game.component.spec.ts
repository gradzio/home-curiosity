import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState } from 'src/app/pages/subjects/subject.state';
import { ExercisesState } from 'src/app/shared/smart-components/exercises/exercises.state';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { ExercisesModule } from 'src/app/shared/smart-components/exercises/exercises.module';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { LessonsService } from 'src/app/pages/subjects/lessons/lessons.service';
import { TimerService } from 'src/app/shared/services/timer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameComponent } from 'src/app/pages/games/game/game.component';

describe('TopicExerciseComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [
        NgxsModule.forRoot([SubjectState, ExercisesState]),
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        PresentationComponentsModule,
        ExercisesModule
      ],
      providers: [
        LessonsService,
        TimerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.reset(SubjectStateProvider.EMPTY_LESSONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
