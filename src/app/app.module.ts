import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ScrollToModule} from 'ng2-scroll-to';

import {SectionAboutComponent} from '../section-about/section-about.component';
import {SectionHeroComponent} from '../section-hero/section-hero.component';
import {SectionPortfolioModule} from '../section-portfolio/section-portfolio.module';
import {WindowRef} from '../services/window-ref.service';
import {SiteFooterComponent} from '../site-footer/site-footer.component';
import {SiteHeaderComponent} from '../site-header/site-header.component';

import {AppComponent} from './app.component';
import {SectionContactComponent} from '../section-contact/section-contact.component';

@NgModule({
  declarations: [
    AppComponent, SectionAboutComponent, SectionHeroComponent,
    SiteHeaderComponent, SiteFooterComponent,
    SectionContactComponent
  ],
  imports: [BrowserModule, SectionPortfolioModule, ScrollToModule.forRoot()],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
