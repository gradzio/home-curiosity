import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface NotificationInterface {
    text: string;
    config?: MatSnackBarConfig
}

@Injectable()
export class NotificationService {
    private correctAnswerDismissedSubject = new BehaviorSubject<boolean>(false);
    correctAnswerDismissed$: Observable<boolean> = this.correctAnswerDismissedSubject.asObservable();

    constructor(private snackbar: MatSnackBar) {}

    notifyCorrectAnswer(): void {
        this._notify({
            text: 'Congrats!',
            config: {duration: 1000, panelClass: ['snackbar-success']}
        })
        .afterDismissed()
        .subscribe(_ => {
            this.correctAnswerDismissedSubject.next(true);
        });
    }

    notifyWrongAnswer(): void {
        this._notify({
            text: 'Incorrect! Try again...',
            config: {duration: 5000, panelClass: ['snackbar-error']}
        });
    }

    private _notify(notification: NotificationInterface): MatSnackBarRef<SimpleSnackBar> {
        return this.snackbar.open(notification.text, null, notification.config);
    }
}