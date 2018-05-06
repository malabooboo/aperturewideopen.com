import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Service that opens and closes modal windows.
 */
@Injectable()
export class ModalService {
  modalSubject = new BehaviorSubject({command: '', id: ''});

  open(modalId: string) {
    this.modalSubject.next({command: 'open', id: modalId});
  }

  close(modalId: string) {
    this.modalSubject.next({command: 'close', id: modalId});
  }

  getCurrentId() {
    return this.modalSubject.value.id;
  }
}
