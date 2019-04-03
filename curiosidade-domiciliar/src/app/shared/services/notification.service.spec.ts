import { TestBed, async } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('NotificationService', () => {
    let snackbar;
    let notificationService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            MaterialModule
          ],
          providers: [ NotificationService, MatSnackBar ]
        });
    }));
    beforeEach(() => {
      snackbar = TestBed.get(MatSnackBar);
      spyOn(snackbar, 'open').and.returnValue({afterDismissed: () => of([])});
      notificationService = TestBed.get(NotificationService);
    });

    it('should have right defaults', () => {
      notificationService.correctAnswerDismissed$
          .subscribe(isDismissed => expect(isDismissed).toEqual(false))
          .unsubscribe();
    });

    it('should notify correct', () => {
      notificationService.notifyCorrectAnswer();
        expect(snackbar.open).toHaveBeenCalledWith('Congrats!', null, {
            panelClass: ['snackbar-success'],
            duration: 1000
          });
    });

    it('should notify wrong', () => {
      notificationService.notifyWrongAnswer();
        expect(snackbar.open).toHaveBeenCalledWith('Incorrect! Try again...', null, {
            panelClass: ['snackbar-error'],
            duration: 5000
          });
    });
});
