import { TestBed, async } from "@angular/core/testing";
import { MaterialModule } from 'src/app/material.module';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('NotificationService', () => {
    let snackbar;
    let service;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            MaterialModule
          ],
          providers: [ NotificationService, MatSnackBar ]
        })
        .compileComponents();
      }));
      beforeEach(() => {
        snackbar = TestBed.get(MatSnackBar);
        spyOn(snackbar, 'open').and.returnValue({afterDismissed: () => of([])});
        service = TestBed.get(NotificationService);
      });

    it('should have right defaults', () => {
        service.correctAnswerDismissed$.subscribe(isDismissed => expect(isDismissed).toEqual(false));
    });

    it('should notify correct', () => {
        service.notifyCorrectAnswer();
        expect(snackbar.open).toHaveBeenCalledWith('Congrats!', null, {
            panelClass: ['snackbar-success'],
            duration: 1000
          });

          service.correctAnswerDismissed$.subscribe(isDismissed => expect(isDismissed).toEqual(true));
    });
    it('should notify wrong', () => {
        service.notifyWrongAnswer();
        expect(snackbar.open).toHaveBeenCalledWith('Incorrect! Try again...', null, {
            panelClass: ['snackbar-error'],
            duration: 5000 
          });

          service.correctAnswerDismissed$.subscribe(isDismissed => expect(isDismissed).toEqual(false));
    });
});