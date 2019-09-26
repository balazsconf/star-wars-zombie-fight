import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isZombie, People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-display-winner',
    templateUrl: './display-winner.component.html',
    styleUrls: ['./display-winner.component.scss']
})
export class DisplayWinnerComponent implements OnInit {

    @Input() winner: People;

    @Input() zombie: People;

    @Input() renegade: People;

    @Output() acknowledgedClicked = new EventEmitter<{winner: People, zombie: People, renegade: People}>();

    public isZombie = isZombie;

    constructor() {}

    ngOnInit() {}

    onAcknowledgedClicked(winner: People, zombie: People, renegade: People) {
        this.acknowledgedClicked.emit({winner, zombie, renegade});
    }

}
