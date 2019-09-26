import {moduleMetadata, storiesOf} from "@storybook/angular";
import {DisplayWinnerComponent} from "./display-winner.component";
import {characterDarthMaul, characterSebulba} from "../storybook.data";
import {CommonModule} from "@angular/common";
import {CharacterBoxComponent} from "../character-box/character-box.component";

storiesOf('Presentation|Display winner', module)
    .addDecorator(
        moduleMetadata({
            imports: [CommonModule],
            declarations: [DisplayWinnerComponent, CharacterBoxComponent]
        })
    )
    .add('Renegade winner', () => ({
        component: DisplayWinnerComponent,
        props: {
            winner: characterSebulba
        }
    }))
    .add('Zombie winner', () => ({
        component: DisplayWinnerComponent,
        props: {
            winner: characterDarthMaul
        }
    }))
;
