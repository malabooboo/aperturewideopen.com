import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {
  currentYear: number;

  constructor() {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
