import { AppFullComponent } from './full.component';
import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AppFullComponent', () => {
    let fixture, component;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
              MaterialModule,
              BrowserAnimationsModule
          ],
          declarations: [
            AppFullComponent,
            AppHeaderComponent,
            AppSidebarComponent
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppFullComponent);
        component = fixture.debugElement.componentInstance;
      }));

      it('should create the component', () => {
        expect(component).toBeTruthy();
      });

      it('should have school icon', () => {
        fixture.detectChanges();
        const logoElement = fixture.debugElement.query(By.css('.navbar-brand .mat-icon')).nativeElement;
        expect(logoElement.textContent).toContain('school');
      });

      it('should have side drawer on mobile', () => {
        component.mobileQuery = {media: '(min-width: 768px)', matches: true, onchange: null, removeListener: (x) => {}};
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.mat-drawer-over'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.mat-drawer-side'))).toBeTruthy();
      });

      it('should have side drawer on tablet und up', () => {
        component.mobileQuery = {media: '(min-width: 768px)', matches: false, onchange: null, removeListener: (x) => {}};
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.mat-drawer-over'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.mat-drawer-side'))).toBeFalsy();
      });
});
