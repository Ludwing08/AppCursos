import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  slideOptions = {
    initialSlide:0,
    speed:400,
    slidesPerView: 5,
    spaceBetween: 15
  }

  constructor() { }

  ngOnInit() {
  }

}
