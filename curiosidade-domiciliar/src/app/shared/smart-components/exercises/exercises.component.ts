import { Component, OnInit } from '@angular/core';
import { ExercisesService } from './exercises.service.stub';
import { Observable, EMPTY } from 'rxjs';
import { Exercise } from './exercise.model';
import { map, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  currentExercise$?: Observable<Exercise>;

  constructor(private exerciseService: ExercisesService) { }

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

}
