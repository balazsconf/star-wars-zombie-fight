import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamRandomizerService} from "../../../../fight-screen/src/lib/team-randomizer.service";
import {People} from "@swzf-clients/model";
import {Observable} from "rxjs";

@Component({
    selector: 'swzf-clients-gameover',
    templateUrl: './gameover.component.html',
    styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit {

    public team$: Observable<People[]>;

    constructor(private router: Router, private teamRan: TeamRandomizerService) {
        this.team$ = this.teamRan.getTeamZombie();
    }

    ngOnInit() {
    }

    onTryAgainClick(){
        this.router.navigateByUrl('/fight');
    }
}
