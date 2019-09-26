import {moduleMetadata, storiesOf} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {CompareDetailsComponent} from "./compare-details.component";
import {CharacterDetailsComponent} from "../character-details/character-details.component";
import {DetailsSeparatorComponent} from "../details-separator/details-separator.component";
import {characterDarthMaul, characterSebulba} from "../storybook.data";

storiesOf('Presentation components/CompareDetails', module)
    .addDecorator(
        moduleMetadata({
            declarations: [CharacterDetailsComponent, DetailsSeparatorComponent],
            imports: [CommonModule]
        })
    )
    .add('No selection', () => ({
            component: CompareDetailsComponent,
            props: {}
        })
    )
    .add('One selection', () => ({
            component: CompareDetailsComponent,
            props: {
                zombie: characterDarthMaul
            }
        })
    )
    .add('Two selection', () => ({
            component: CompareDetailsComponent,
            props: {
                zombie: characterDarthMaul,
                renegade: characterSebulba
            }
        })
    )

;

