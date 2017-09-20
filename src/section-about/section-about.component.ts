import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'section-about',
  templateUrl: './section-about.component.html',
  styleUrls: ['./section-about.component.scss']
})
export class SectionAboutComponent implements OnInit {
  yearsExperience: number;

  constructor() {}

  ngOnInit() {
    this.yearsExperience = new Date().getFullYear() - 2006;
  }
}
