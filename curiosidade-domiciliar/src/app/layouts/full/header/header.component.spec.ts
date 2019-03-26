import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderComponent } from './header.component';

describe('AppHeaderComponent', () => {
    let fixture, component;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
              MaterialModule,
              BrowserAnimationsModule
          ],
          declarations: [
            AppHeaderComponent
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.debugElement.componentInstance;
      }));

      it('should create the component', () => {
        expect(component).toBeTruthy();
      });

      it('should have search icon', () => {
          fixture.detectChanges();
          const searchElement = fixture.debugElement.nativeElement.querySelector('#searchButton .mat-icon');
          expect(searchElement.textContent).toContain('search');
      });

      it('should have profile icon', () => {
        fixture.detectChanges();
        const profileElement = fixture.debugElement.nativeElement.querySelector('#profileButton .mat-icon');
        expect(profileElement.textContent).toContain('person');
      });

      it('should not have menu by default', () => {
        fixture.detectChanges();
        const menuItems = fixture.debugElement.nativeElement.querySelectorAll('.mat-menu-item');
        expect(menuItems.length).toEqual(0);
      });
});
