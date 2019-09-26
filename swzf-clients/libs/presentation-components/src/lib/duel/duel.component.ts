import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isPeopleSet, People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-duel',
    templateUrl: './duel.component.html',
    styleUrls: ['./duel.component.scss']
})
export class DuelComponent implements OnInit {

    @Input() winner: People;
    @Input() zombie: People;
    @Input() renegade: People;

    @Output() fightClicked = new EventEmitter();
    @Output() winnerAcknowledged = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onFightClicked(event) {
        this.fightClicked.emit(event);
    }

    onWinnerAcknowledged(event) {
        this.winnerAcknowledged.emit(event);
    }

    isWinner(winner: People) {
        return (winner && isPeopleSet(winner));
    }

}
