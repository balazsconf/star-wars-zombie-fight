import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { GameoverComponent } from './gameover/gameover.component';
import {PresentationComponentsModule} from "@swzf-clients/presentation-components";

const routes: Routes = [
    {
        path: '',
        component: GameoverComponent
    },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PresentationComponentsModule],
  declarations: [GameoverComponent]
})
export class GameoverScreenModule {}
