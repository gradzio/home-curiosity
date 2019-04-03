import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCard } from './video-card';
import { Component, DebugElement } from '@angular/core';
import { ResourceCardInterface } from './video-card.interface';
import { By, DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';

@Component({template: '<app-video-card [item]="videoModel"></app-video-card>'})
class BasicVideoCard {
  constructor(private _santizer: DomSanitizer) {}
  public videoModel: ResourceCardInterface = {
    title: 'title',
    resourceUrl: this._santizer.bypassSecurityTrustResourceUrl('http://www.resource.com/url.mp4'),
    navigation: {
      link: '/link',
      text: 'text'
    }
  };
}

describe('VideoCard', () => {
  let component: BasicVideoCard;
  let fixture: ComponentFixture<BasicVideoCard>;
  let videoCardElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicVideoCard, VideoCard ],
      imports: [RouterTestingModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicVideoCard);
    component = fixture.componentInstance;
    videoCardElement = fixture.debugElement.query(By.css('app-video-card'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(videoCardElement).toBeTruthy();
  });

  it('should bind view model', () => {
    const navigationPrimaryNativeElement = videoCardElement.query(By.css('.mat-card-actions .navigation-primary'));
    fixture.detectChanges();
    expect(videoCardElement.query(By.css('.mat-card-header')).nativeElement.textContent).toContain('title');
    expect(videoCardElement.query(By.css('.mat-card-content iframe')).properties.src).toContain('http://www.resource.com/url.mp4');
    expect(navigationPrimaryNativeElement.properties.href).toEqual('/link');
    expect(navigationPrimaryNativeElement.nativeElement.textContent).toContain('text');
  });
});
