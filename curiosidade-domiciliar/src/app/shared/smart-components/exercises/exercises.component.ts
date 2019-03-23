import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExercisesService } from './exercises.service.stub';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.model';
import { NotificationService } from './notification.service';
import { filter, map, tap } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent implements OnInit {

  exercises$: Observable<Collection<Exercise>>;
  currentExercise$: Observable<Exercise>;

  constructor(private exerciseService: ExercisesService, private notificationService: NotificationService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.exerciseService.getAll();

    this.exercises$ = this.exerciseService.exercises$.pipe(tap(_ => this.changeDetectorRef.detectChanges()));

    this.currentExercise$ = this.exerciseService.current$
      .pipe(
        filter(exercise => exercise !== null)
      );
    this.notificationService.correctAnswerDismissed$
      .pipe(
        filter(isCorrect => isCorrect == true)
      ).subscribe(_ => this.exerciseService.nextExercise());
  }

  onAnswerSubmitted(answerValue: string) {
      this.exerciseService.postAnswer(answerValue)
        .subscribe(answer => {
          if (answer.success) {
            this.notificationService.notifyCorrectAnswer();
          } else {
            this.notificationService.notifyWrongAnswer();
          }
        });
  }
}
