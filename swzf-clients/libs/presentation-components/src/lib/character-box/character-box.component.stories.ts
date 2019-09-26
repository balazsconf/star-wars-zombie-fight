import {moduleMetadata, storiesOf} from '@storybook/angular';
import {CharacterBoxComponent} from "./character-box.component";
import {CommonModule} from "@angular/common";
import {characterMaceWindu} from "@swzf-clients/presentation-components";

const props = {
    name: characterMaceWindu.name,
    imageUrl: characterMaceWindu.image.url
};

const template = `<swzf-clients-character-box 
    [name]="name"
    [imageUrl]="imageUrl"
    [selected]="selected"
    [zombie]="zombie"></swzf-clients-character-box>`;

storiesOf('Presentation|CharacterBox', module)
    .addDecorator(
        moduleMetadata({
            declarations: [CharacterBoxComponent],
            imports: [CommonModule]
        })
    )
    .add('Renegade view', () => ({
            component: CharacterBoxComponent,
            props: props
        })
    )
    .add('Selected renegade view', () => ({
            template,
            props: {
                ...props,
                selected: true
            }
        })
    )
    .add('Zombie view', () => ({
        template,
            props: {
                ...props,
                zombie: true
            }
        })
    )
    .add('Selected zombie view', () => ({
        template,
            props: {
                ...props,
                zombie: true,
                selected: true
            }
        })
    )
;

