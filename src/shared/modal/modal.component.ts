import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';

import {ModalService} from '../../services/modal.service';
import {WindowRef} from '../../services/window-ref.service';

/**
 * The class name to add to the <body> element when a modal is open.
 */
const SCROLL_LOCKED = 'scroll-locked';

/**
 * Component which handles the opening and closing of modals on the site.
 */
@Component({
  moduleId: module.id,
  selector: 'modal',
  templateUrl: './modal.component.ng.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() youtubeid: string;
  @Input() photoid: string;
  @Input() modaltype: string;
  @ViewChild('youtubeIframe') youtubeIframe: ElementRef;
  @ViewChild('imgEl') imgEl: ElementRef;

  /**
   * Subscription to the modal service.
   */
  modalSubscription: Subscription;

  /**
   * The open / closed state of the modal instance.
   */
  isOpen = false;

  appRef: ElementRef;

  constructor(
    private windowRef: WindowRef,
    private modalService: ModalService,
    public el: ElementRef
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modalSubject.subscribe(
      modalInfo => {
        if (
          modalInfo['command'] === 'open' &&
          modalInfo['id'] === this.el.nativeElement.id
        ) {
          this.isOpen = true;
          if (this.modaltype === 'video') {
            this.youtubeIframe.nativeElement.src = this.getYoutubeUrl();
          } else if (this.modaltype === 'photo') {
            this.imgEl.nativeElement.src = this.getImgUrl();
          }
          this.lockScroll();
        } else {
          this.isOpen = false;
          if (this.modaltype === 'video') {
            this.youtubeIframe.nativeElement.src = '';
          } else if (this.modaltype === 'photo') {
            this.imgEl.nativeElement.src = '';
          }
        }
      }
    );
  }

  private getYoutubeUrl(): string {
    return `https://www.youtube.com/embed/${
      this.youtubeid
    }?ecver=1&enablejsapi=1`;
  }

  private getImgUrl(): string {
    return `/assets/images/${this.photoid}-full.jpg`;
  }

  /**
   * Closes the modal if the close button or the surrounding overlay is clicked.
   * @param  {Event} event The click event.
   */
  closeModal(event: Event) {
    const el = <Element>event.target;
    if (!el.classList.contains('close-element')) {
      return;
    }
    this.windowRef.nativeWindow.document.body.classList.remove(SCROLL_LOCKED);
    this.modalService.close(this.el.nativeElement.id);
  }

  private lockScroll() {
    this.windowRef.nativeWindow.document.body.classList.add(SCROLL_LOCKED);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
}
