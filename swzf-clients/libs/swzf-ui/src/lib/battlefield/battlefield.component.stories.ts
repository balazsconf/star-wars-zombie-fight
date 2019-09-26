import {moduleMetadata, storiesOf} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {BattlefieldComponent} from "./battlefield.component";
import {TeamViewComponent} from "../../../../presentation-components/src/lib/team-view/team-view.component";
import {DuelComponent} from "../../../../presentation-components/src/lib/duel/duel.component";
import {CharacterBoxComponent} from "../../../../presentation-components/src/lib/character-box/character-box.component";
import {CharacterDetailsComponent} from "../../../../presentation-components/src/lib/character-details/character-details.component";
import {DetailsSeparatorComponent} from "../../../../presentation-components/src/lib/details-separator/details-separator.component";
import {TeamRandomizerService} from "../team-randomizer.service";
import {WinnerCalculatorService} from "../winner-calculator.service";
import {CompareDetailsComponent} from "../../../../presentation-components/src/lib/compare-details/compare-details.component";
import {DisplayWinnerComponent} from "../../../../presentation-components/src/lib/display-winner/display-winner.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable, of} from "rxjs";
import {NOT_SET_PEOPLE} from "@swzf-clients/model";
import {
    characterBobaFett,
    characterDarthMaul,
    characterMaceWindu,
    characterSebulba
} from "@swzf-clients/presentation-components";


class MockTeamRandomizerService {

    getTeamZombie(): Observable<any[]> {
        return of([characterDarthMaul, characterBobaFett]);
    }

    getTeamRenegades(): Observable<any[]> {
        return of([characterSebulba, characterMaceWindu]);
    }

    getSelectedZombie(): Observable<any> {
        return of(NOT_SET_PEOPLE);
    }

    getSelectedRenegade(): Observable<any> {
        return of(NOT_SET_PEOPLE);
    }

    getWinner(): Observable<any> {
        return of(NOT_SET_PEOPLE);
    }

    newGame() {}

    gameOver() {
        return of (false);
    }
}

class MockWinnerCalculatorService {

}

storiesOf('Container|Battlefield', module)
    .addDecorator(
        moduleMetadata({
            declarations: [BattlefieldComponent,
                TeamViewComponent,
                DuelComponent,
                CharacterBoxComponent,
                CompareDetailsComponent,
                CharacterDetailsComponent,
                DisplayWinnerComponent,
                DetailsSeparatorComponent
            ],
            imports: [CommonModule, RouterTestingModule],
            providers: [
                {
                    provide: TeamRandomizerService,
                    useClass: MockTeamRandomizerService
                },
                {
                    provide: WinnerCalculatorService,
                    useClass: MockWinnerCalculatorService
                }
            ]
        })
    )
    .add('Game start view', () => ({
        component: BattlefieldComponent
    }))
;
