import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { Observable, Subscription, EMPTY, combineLatest, of } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { map, flatMap, switchMap, filter } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ActivatedRoute } from '@angular/router';
import { ExerciseModel } from './exercise.model';
import { AnswersService } from './answers.service';
import { LessonsService } from '../../../pages/subjects/lessons/lessons.service';
import { Select, Store } from '@ngxs/store';
import { SubjectState, CompletedExercises } from '../../../pages/subjects/subject.state';
import { ExercisesState, AnsweredCorrectly, ExercisesExited } from './exercises.state';
import { ProgressBarInterface } from 'src/app/shared/presentation-components/progress-bar/progress-bar.interface';
import { CountDownInterface } from 'src/app/shared/services/timer.service';
import { CounterProgressModel } from './counter-progress.model';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent implements OnInit, OnDestroy {

  @Select(ExercisesState.exercises)
  exercises$: Observable<Collection<ExerciseModel>>;

  @Select(ExercisesState.answeredCount)
  answeredCount$: Observable<number>;

  @Select(ExercisesState.countDown)
  countDown$: Observable<CountDownInterface>;

  @Select(ExercisesState.currentExercise)
  currentExercise$: Observable<ExerciseModel>;

  backLink$: Observable<string>;
  countDownProgress$: Observable<ProgressBarInterface>;

  private _subscriptions: { [id: string]: Subscription; } = {};

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _answerService: AnswersService,
    private _notificationService: NotificationService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.backLink$ = this._route.params.pipe(map(params => `/subjects/math/lessons/${params.lessonGuid}`));
    this.countDownProgress$ = this.countDown$.pipe(
      filter( countDown => countDown !== undefined),
      map((countDown: CountDownInterface) => new CounterProgressModel(countDown.current, countDown.total))
    );
  }

  ngOnDestroy() {
    Object.keys(this._subscriptions)
        .forEach(subscriptionName => this._subscriptions[subscriptionName].unsubscribe());
    this._store.dispatch(new ExercisesExited());
  }

  onAnswerSubmitted(answerValue: string) {
      this._subscriptions['createAnswer'] = this._answerService.create(answerValue, 'guid1')
        .pipe(
          flatMap(answer => {
            if (answer.success) {
              return this._notificationService.notifyCorrectAnswer();
            } else {
              this._notificationService.notifyWrongAnswer();
              return EMPTY;
            }
          }),
          switchMap(_ => this._route.params)
        )
        .subscribe(params => {
            this._store.dispatch(new AnsweredCorrectly(params.lessonGuid, params.topicGuid));
            this._changeDetectorRef.detectChanges();
        });
  }
}
