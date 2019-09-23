import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FadingIntroComponent} from './fading-intro/fading-intro.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: FadingIntroComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [FadingIntroComponent]
})
export class IntroScreenModule {}
