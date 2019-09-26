import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isZombie, People} from "@swzf-clients/model";

@Component({
  selector: 'swzf-clients-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

    @Input() team: People[];

    @Output() tryAgain = new EventEmitter();

    public isZombie = isZombie;

    constructor() { }

    ngOnInit() { }

    isZombieTeam() {
        return isZombie(this.team[0]);
    }

    onTryAgainClick(){
        this.tryAgain.emit();
    }

}
