import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TeamViewComponent} from "./team-view.component";
import {CommonModule} from "@angular/common";
import {CharacterBoxComponent} from "../character-box/character-box.component";
import {characterBobaFett, characterMaceWindu, characterSebulba} from "@swzf-clients/presentation-components";

const teamWith2Members = {
    characters: [characterMaceWindu, characterSebulba],
    selected: characterSebulba,
    zombies: true,
    computer: true
};

const teamWith3Members = {
    characters: [characterMaceWindu, characterSebulba, characterBobaFett],
    selected: characterBobaFett,
    zombies: false,
    computer: true
};

const template = `<swzf-clients-team-view
                [characters]="characters"
                [selected]="selected"
                [zombies]="zombies"
                computer="computer"></swzf-clients-team-view>`;

storiesOf('Presentation|TeamView', module)
    .addDecorator(
        moduleMetadata({
            declarations: [TeamViewComponent, CharacterBoxComponent],
            imports: [CommonModule]
        })
    )
    .add('2 members', () => ({
            template,
            props: teamWith2Members
        })
    )
    .add('3 members', () => ({
            template,
            props: teamWith3Members
        })
    )

;

