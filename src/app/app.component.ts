import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {SectionService} from '../services/section.service';

/**
 * The offset from the scroll position, in pixels, for which to trigger the
 * switch between the "current" sections.
 */
const VISUAL_OFFSET = 120;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit {
  @ViewChild('aboutSection') aboutSection: ElementRef;
  @ViewChild('portfolioSection') portfolioSection: ElementRef;
  @ViewChild('contactSection') contactSection: ElementRef;
  isAboutInView: string;
  isPortfolioInView: string;
  isContactInView: string;
  windowHeight: number;
  siteSections: String[];
  currentSection: string;
  sectionServiceSubscription: Subscription;

  constructor(private sectionService: SectionService) {}

  // Listens to the scroll position and updates the section service with the
  // current section.
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Various height values
    const scrollPosition = document.documentElement.scrollTop + VISUAL_OFFSET;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollEndPosition = documentHeight - viewportHeight;

    // Section scroll positions
    const aboutSectionScrollPos = this.aboutSection.nativeElement.offsetTop;
    const portfolioSectionScrollPos =
        this.portfolioSection.nativeElement.offsetTop;
    const contactSectionScrollPos = this.contactSection.nativeElement.offsetTop;
    const lastSectionHeight = this.contactSection.nativeElement.offsetHeight;

    // Current section logic
    if (scrollPosition == 0 || scrollPosition < aboutSectionScrollPos) {
      this.sectionService.setCurrentSection('home');
    }
    if (scrollPosition >= aboutSectionScrollPos &&
        scrollPosition < portfolioSectionScrollPos) {
      this.sectionService.setCurrentSection('about');
    }
    if (scrollPosition >= portfolioSectionScrollPos &&
        scrollPosition < contactSectionScrollPos) {
      this.sectionService.setCurrentSection('videos');
    }
    if (scrollPosition >= contactSectionScrollPos ||
        scrollPosition - VISUAL_OFFSET >= scrollEndPosition - lastSectionHeight) {
      this.sectionService.setCurrentSection('contact');
    }
  }

  ngOnInit() {
    this.sectionServiceSubscription =
        this.sectionService.sectionSubject.subscribe();
  }
}
