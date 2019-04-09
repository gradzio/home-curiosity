import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar, MatSnackBarDismiss } from '@angular/material';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface NotificationInterface {
    text: string;
    config?: MatSnackBarConfig;
}

@Injectable()
export class NotificationService {
    private correctAnswerDismissedSubject = new BehaviorSubject<boolean>(false);
    correctAnswerDismissed$: Observable<boolean> = this.correctAnswerDismissedSubject.asObservable();

    constructor(private snackbar: MatSnackBar) {}

    notifyCorrectAnswer(): Observable<MatSnackBarDismiss> {
        return this.snackbar.open('Você acertou!', null, {duration: 1000, panelClass: ['snackbar-success']})
            .afterDismissed();
    }

    notifyWrongAnswer(): void {
        this.snackbar.open('Tente mais uma vez...', null, {duration: 5000, panelClass: ['snackbar-error']});
    }
}
