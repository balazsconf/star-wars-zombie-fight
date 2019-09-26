import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isPeopleSet, People} from "@swzf-clients/model";

@Component({
  selector: 'swzf-clients-compare-details',
  templateUrl: './compare-details.component.html',
  styleUrls: ['./compare-details.component.scss']
})
export class CompareDetailsComponent implements OnInit {

    @Input() zombie: People;
    @Input() renegade: People;

    @Output() fightClicked = new EventEmitter<{zombie: People, renegade: People}>();

  constructor() { }

  ngOnInit() {}

  onFightClicked(zombie: People, renegade: People) {
      if( isPeopleSet(zombie) && isPeopleSet(renegade) ) {
        this.fightClicked.emit({zombie, renegade});
      }
  }

}
