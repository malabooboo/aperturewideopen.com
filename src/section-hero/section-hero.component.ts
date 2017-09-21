import {animate, Component, ElementRef, Input, AfterViewInit, QueryList, style, transition, trigger, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx'


/**
 * The time in ms to show each step.
 */
const STEP_ANIMATION_DELAY = 6000;

/**
 * The total number of steps.
 */
const TOTAL_STEPS = 3;

@Component({
  selector: 'section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
  animations: [trigger(
      'fadeInOut',
      [
        transition(
            ':enter',
            [
              style({opacity: '0'}),
              animate('1s ease-out', style({opacity: '.3'}))
            ]),
        transition(
            ':leave',
            [
              style({opacity: '.3'}),
              animate('1s ease-out', style({opacity: '0'}))
            ])
      ])],
})
export class SectionHeroComponent implements AfterViewInit {
  @ViewChild('bgList') bgList: ElementRef;
  showStep = 1;

  constructor() {}

  ngAfterViewInit() {
    // Cycles through the steps at a set interval
    const interval = Observable.interval(STEP_ANIMATION_DELAY);
    interval.subscribe(() => {
      this.showStep++;
      if (this.showStep === TOTAL_STEPS) {
        this.showStep = 1;
      }
    });
  }
}
