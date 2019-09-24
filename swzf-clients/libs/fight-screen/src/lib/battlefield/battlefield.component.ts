import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {TeamRandomizerService} from "../team-randomizer.service";
import {share} from "rxjs/operators";
import {Observable} from "rxjs";
import {WinnerCalculatorService} from "../winner-calculator.service";
import {People} from "@swzf-clients/model";
import {Router} from "@angular/router";

@Component({
    selector: 'swzf-clients-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

    private teamZombie$: Observable<People[]> = this.teamRandomizer.getTeamZombie();
    private teamRenegades$: Observable<People[]> = this.teamRandomizer.getTeamRenegades();

    private selectedZombie: People;
    private selectedRenegade: People;

    private winner: People;

    private gameOver;

    constructor(
        private router: Router,
        private apollo: Apollo,
        private teamRandomizer: TeamRandomizerService,
        private winnerCalculator: WinnerCalculatorService
    ) {
    }

    ngOnInit() {}

    onSelectRenegade(character: People) {
        this.selectedRenegade = character;
    }

    onSelectZombie(character: People) {
        this.selectedZombie = character;
    }

    onRestartGameClick(){
        this.router.navigateByUrl('/gameover');
    }

    fightClicked({left, right}) {
        if ( this.selectedZombie && this.selectedRenegade ) {
            this.winner = this.winnerCalculator.calculateWinner(this.selectedZombie, this.selectedRenegade);
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
