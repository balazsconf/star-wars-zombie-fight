import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {People} from "@swzf-clients/swzf-ui";

@Component({
  selector: 'swzf-clients-compare-details',
  templateUrl: './compare-details.component.html',
  styleUrls: ['./compare-details.component.scss']
})
export class CompareDetailsComponent implements OnInit {

    @Input() left: People;
    @Input() right: People;

    @Output() fightClicked = new EventEmitter<{left: People, right: People}>();

  constructor() { }

  ngOnInit() {
  }

  onFightClicked(left: People, right: People) {
      this.fightClicked.emit({left, right});
  }

}
