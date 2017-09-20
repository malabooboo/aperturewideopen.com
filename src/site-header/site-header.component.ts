import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {WindowRef} from '../services/window-ref.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  /** The fixed or relative state of the nav. */
  isFixed: boolean;

  /** The direction of the user's scroll. */
  isScrollDirectionUp: boolean;

  /** The last scroll position before the next scroll event. */
  lastScrollPosition: number;

  currentNav: string;

  constructor(
      private windowRef: WindowRef,
      @Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop;

    // Determines the direction of the scroll.
    this.isScrollDirectionUp = scrollPosition > this.lastScrollPosition;

    // Updates the last known scroll position with the new scroll position.
    this.lastScrollPosition = scrollPosition;

    if (scrollPosition == 0) {
      this.setCurrent('home');
    }
  }

  ngOnInit() {}

  setCurrent(name: string) {
    this.currentNav = name;
  }
}
