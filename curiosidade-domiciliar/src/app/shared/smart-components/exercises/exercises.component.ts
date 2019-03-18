import { Component, OnInit } from '@angular/core';
import { ExercisesService } from './exercises.service.stub';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.model';
import { NotificationService } from './notification.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  currentExercise$: Observable<Exercise>;

  constructor(private exerciseService: ExercisesService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.exercises$ = this.exerciseService.getAll();
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
