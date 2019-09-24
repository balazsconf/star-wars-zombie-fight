import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-display-winner',
    templateUrl: './display-winner.component.html',
    styleUrls: ['./display-winner.component.scss']
})
export class DisplayWinnerComponent implements OnInit {

    @Input() winner: People;

    @Output() acknowledgedClicked = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onAcknowledgedClicked() {
        this.acknowledgedClicked.emit();
    }

}
