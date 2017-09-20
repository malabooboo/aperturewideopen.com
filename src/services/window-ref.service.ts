import {Injectable} from '@angular/core';

function _window(): any {
  return window;
}

/**
 * Service similiar to $window in Angular 1, to access the global window
 * Object.
 */
@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}
