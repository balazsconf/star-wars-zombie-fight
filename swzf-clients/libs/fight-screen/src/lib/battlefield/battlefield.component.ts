import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {TeamRandomizerService} from "../team-randomizer.service";
import {share} from "rxjs/operators";
import {Observable} from "rxjs";
import {WinnerCalculatorService} from "../winner-calculator.service";
import {People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

    private teamZombie$: Observable<People[]> = this.teamRandomizer.getTeamZombie();
    private teamRenegades$: Observable<People[]> = this.teamRandomizer.getTeamRenegades();

    private selectedLeft: People;
    private selectedRight: People;

    private winner: People;

    private gameOver;

    constructor(
        private apollo: Apollo,
        private teamRandomizer: TeamRandomizerService,
        private winnerCalculator: WinnerCalculatorService
    ) {
    }

    ngOnInit() {
        this.teamRandomizer.createRandomTeams(3);
    }

    onSelectRight(character: People) {
        this.selectedRight = character;
    }

    onSelectLeft(character: People) {
        this.selectedLeft = character;
    }

    fightClicked({left, right}) {
        if ( this.selectedLeft && this.selectedRight ) {
            this.winner = this.winnerCalculator.calculateWinner(this.selectedLeft, this.selectedRight);
        }
    }

    isFighting() {
        return !this.winner && !this.gameOver;
    }

    isWinner() {
        return this.winner && !this.gameOver;
    }

    winnerAcknowledged() {
        this.winner = undefined;
        console.log('winner ok')
    }

    isGameOver() {

    }

}
