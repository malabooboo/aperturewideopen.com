import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Observable, Subscription} from 'rxjs';

import {SectionService} from '../services/section.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit, AfterViewInit {
  /** The fixed or relative state of the nav. */
  isFixed: boolean;

  /** The direction of the user's scroll. */
  isScrollDirectionUp: boolean;

  /** The last scroll position before the next scroll event. */
  lastScrollPosition: number;

  currentNav: string;

  sectionServiceSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sectionService: SectionService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop;

    // Determines the direction of the scroll.
    this.isScrollDirectionUp = scrollPosition > this.lastScrollPosition;

    // Updates the last known scroll position with the new scroll position.
    this.lastScrollPosition = scrollPosition;

    if (scrollPosition === 0) {
      this.setCurrent('home');
    }
  }

  ngOnInit() {
    this.sectionServiceSubscription = this.sectionService.sectionSubject.subscribe(
      section => {
        this.setCurrent(section.name);
      }
    );
  }

  ngAfterViewInit() {
    // Note: wrapped in a timeout to avoid weird
    // "ExpressionChangedAfterItHasBeenCheckedError"
    window.setTimeout(() => {
      this.setCurrent('home');
    });
  }

  setCurrent(name: string) {
    this.currentNav = name;
  }
}
