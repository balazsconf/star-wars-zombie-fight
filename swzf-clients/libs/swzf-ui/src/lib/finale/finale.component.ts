import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamRandomizerService} from "../team-randomizer.service";
import {Observable} from "rxjs";
import {People} from "@swzf-clients/model";

@Component({
    selector: 'swzf-clients-finale',
    templateUrl: './finale.component.html',
    styleUrls: ['./finale.component.scss']
})
export class FinaleComponent implements OnInit {

    team$: Observable<People[]> = this.teamRandomizer.getWinningTeam();

    constructor(private router: Router, private teamRandomizer: TeamRandomizerService) {
    }

    ngOnInit() {
    }

    onTryAgain() {
        this.teamRandomizer.newGame();
        this.router.navigate(['/fight'])
    }

}
