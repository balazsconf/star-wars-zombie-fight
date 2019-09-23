import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterBoxComponent} from './character-box/character-box.component';
import {TeamViewComponent} from './team-view/team-view.component';
import {CharacterDetailsComponent} from './character-details/character-details.component';
import { CompareDetailsComponent } from './compare-details/compare-details.component';
import { DetailsSeparatorComponent } from './details-separator/details-separator.component';
import { DisplayWinnerComponent } from './display-winner/display-winner.component';
import { GameOverComponent } from './game-over/game-over.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CharacterBoxComponent, TeamViewComponent, CharacterDetailsComponent, CompareDetailsComponent, DetailsSeparatorComponent, DisplayWinnerComponent, GameOverComponent],
    exports: [CharacterBoxComponent, TeamViewComponent, CharacterDetailsComponent, CompareDetailsComponent, DisplayWinnerComponent]
})
export class PresentationComponentsModule {
}
