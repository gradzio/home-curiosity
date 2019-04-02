import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { filter, tap, map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ActivatedRoute } from '@angular/router';
import { ExerciseModel } from './exercise.model';
import { AnswersService } from './answers.service';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent implements OnInit, OnDestroy {

  exercises$: Observable<Collection<ExerciseModel>>;

  private _subscriptions: { [id: string] : Subscription; } = {};

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExercisesService,
    private answerService: AnswersService,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.exercises$ = this.route.data
      .pipe(map(data => data['exercises']));

    this.exercises$ = this.exerciseService.exercises$
      .pipe(
        tap(_ => this.changeDetectorRef.detectChanges())
      );

    this._subscriptions['correctAnswerDismissed'] = this.notificationService.correctAnswerDismissed$
      .pipe(
        filter(isCorrect => isCorrect === true),
        tap(_ => this.exerciseService.nextExercise())
      ).subscribe();
  }

  ngOnDestroy() {
    Object.keys(this._subscriptions)
        .forEach(subscriptionName => this._subscriptions[subscriptionName].unsubscribe());
  }

  onAnswerSubmitted(answerValue: string) {
      this.answerService.create(answerValue, 'guid1')
        .subscribe(answer => {
          if (answer.success) {
            this.notificationService.notifyCorrectAnswer();
          } else {
            this.notificationService.notifyWrongAnswer();
          }
        });
  }
}
