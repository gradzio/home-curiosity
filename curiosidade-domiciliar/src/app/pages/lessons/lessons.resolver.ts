import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LessonModel } from './lesson.model';
import { Observable } from 'rxjs';
import { LessonsService } from './lessons.service';

@Injectable({
    providedIn: 'root',
})
export class LessonsResolver implements Resolve<LessonModel[]> {
    constructor(private lessonsService: LessonsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel[]> {
        return this.lessonsService.getAll(route.params.subject);
    }
}