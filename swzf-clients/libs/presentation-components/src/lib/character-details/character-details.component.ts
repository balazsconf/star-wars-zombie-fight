import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {People} from "@swzf-clients/model";

@Component({
  selector: 'swzf-clients-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

    @Input() character: People;

    @Input() rightSide = false;

    @HostBinding('class')
    private class: string;

  constructor() { }

  ngOnInit() {
      if ( this.rightSide ) {
          this.class = this.class ? `${this.class} right-side` : 'right-side';
      }
  }

}
