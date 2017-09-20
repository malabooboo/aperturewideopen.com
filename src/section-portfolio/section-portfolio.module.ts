import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ModalModule} from '../shared/modal/modal.module';

import {SectionPortfolioComponent} from './section-portfolio.component';


@NgModule({
  declarations: [
    SectionPortfolioComponent
  ],
  imports: [CommonModule, ModalModule],
  exports: [SectionPortfolioComponent],
})
export class SectionPortfolioModule {
}
