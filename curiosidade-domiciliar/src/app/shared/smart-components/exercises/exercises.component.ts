import { Component, OnInit } from '@angular/core';
import { ExercisesService } from './exercises.service.stub';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  currentExercise$?: Observable<Exercise>;

  constructor(private exerciseService: ExercisesService, private notificationService: MatSnackBar) { }

  ngOnInit() {
    this.exercises$ = this.exerciseService.getAll();
    this.currentExercise$ = this.exercises$
    .pipe( 
      map((exercises: Exercise[]) => {
        const notCompleted = exercises.filter(exercise => !exercise.isCompleted);
        return notCompleted.length > 0 ? notCompleted[0] : null;
      }),
    )
  }

  onAnswerSubmitted(answerValue: string) {
    this.currentExercise$
      .subscribe((exercise: Exercise) => {
        this.exerciseService.postAnswer(exercise.guid, answerValue)
        .subscribe(answer => {
          const notification = answer.success
            ? {text: 'Congrats!', classes: ['snackbar-success']}
            : {text: 'Incorrect! Try again...', classes: ['snackbar-error']}
          this.notificationService.open(notification.text, null, {
            panelClass: notification.classes,    
          })
        }); 
      });
  }

}
