import {Injectable, Renderer} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {WindowRef} from '../services/window-ref.service';


/**
 * Service that makes the scroll values available to subscribers.
 */
@Injectable()
export class ScrollService {
  constructor(private windowRef: WindowRef, private renderer: Renderer) {}

  /**
   * Gets the current vertical scroll (Y) position.
   */
  getScrollPosition(): Observable<number> {
    return new Observable(observer => {
      this.renderer.listenGlobal('window', 'scroll', () => {
        const scrollPosition =
            this.windowRef.nativeWindow.document.body.scrollTop;
        observer.next(scrollPosition);
      });
    });
  }
}
