import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { Observable, Subscription, EMPTY, combineLatest, of } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ActivatedRoute } from '@angular/router';
import { ExerciseModel } from './exercise.model';
import { AnswersService } from './answers.service';
import { LessonsService } from '../../lessons.service';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent implements OnInit, OnDestroy {

  exercises$: Observable<Collection<ExerciseModel>>;

  private _subscriptions: { [id: string]: Subscription; } = {};

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExercisesService,
    private lessonsService: LessonsService,
    private answerService: AnswersService,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.exercises$ = this.route.data
      .pipe(map(data => data['exercises']));
  }

  ngOnDestroy() {
    Object.keys(this._subscriptions)
        .forEach(subscriptionName => this._subscriptions[subscriptionName].unsubscribe());
  }

  onAnswerSubmitted(answerValue: string) {
      this._subscriptions['createAnswer'] = this.answerService.create(answerValue, 'guid1')
        .pipe(
          flatMap(answer => {
            if (answer.success) {
              return this.notificationService.notifyCorrectAnswer();
            } else {
              this.notificationService.notifyWrongAnswer();
              return EMPTY;
            }
          }),
          switchMap(_ => this.route.params)
        )
        .subscribe(params => {
            const isCompleted = this.exerciseService.nextExercise();
            if (isCompleted) {
              this.lessonsService.completeLesson(params.lessonGuid);
            }
            this.changeDetectorRef.detectChanges();
        });
  }
}
