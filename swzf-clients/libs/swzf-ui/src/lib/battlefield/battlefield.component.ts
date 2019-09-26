import {Component, OnInit} from '@angular/core';
import {TeamRandomizerService} from "../team-randomizer.service";
import {Observable, Subscription} from "rxjs";
import {WinnerCalculatorService} from "../winner-calculator.service";
import {People, SIDE_RENEGADES, SIDE_ZOMBIES} from "@swzf-clients/model";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
    selector: 'swzf-clients-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

    private teamZombie$: Observable<People[]> = this.teamRandomizer.getTeamZombie();
    private teamRenegades$: Observable<People[]> = this.teamRandomizer.getTeamRenegades();

    private selectedZombie$: Observable<People> = this.teamRandomizer.getSelectedZombie();
    private selectedRenegade$: Observable<People> = this.teamRandomizer.getSelectedRenegade();

    private winner$: Observable<People> = this.teamRandomizer.getWinner();

    private gameOver: Subscription;

    constructor(
        private router: Router,
        private teamRandomizer: TeamRandomizerService,
        private winnerCalculator: WinnerCalculatorService
    ) {}

    ngOnInit() {
        this.teamRandomizer.newGame();

        this.gameOver = this.teamRandomizer.gameOver().subscribe( (gameOver) => {
            if ( gameOver ) {
                this.router.navigateByUrl('/gameover');
            }
        })

    }

    onSelectZombie(character: People) {
        this.teamRandomizer.setSelectedZombie(character);
    }

    onSelectRenegade(character: People) {
        this.teamRandomizer.setSelectedRenegade(character);
    }

    onRestartGameClick(){
        this.teamRandomizer.newGame();
    }

    fightClicked(fighters) {
        this.teamRandomizer.setWinner(this.winnerCalculator.calculateWinner(fighters.zombie, fighters.renegade));
    }

    isFighting(): Observable<Boolean> {
        return this.winner$.pipe(
            map( (winner) => {
                return !winner;
            })
        );
        // return !this.winner && !this.gameOver;
    }

    isWinner() {
        // return this.winner && !this.gameOver;
    }

    winnerAcknowledged({winner, zombie, renegade}) {
        if ( winner.side === SIDE_ZOMBIES ) {
            this.teamRandomizer.setSide(renegade.id, SIDE_ZOMBIES);
        } else if ( winner.side === SIDE_RENEGADES ) {
            this.teamRandomizer.mutateDead(zombie.id);
        }
        this.teamRandomizer.clearSelectedZombie();
        this.teamRandomizer.clearSelectedRenegade();
        this.teamRandomizer.clearWinner();
    }

    isGameOver() {

    }

}
