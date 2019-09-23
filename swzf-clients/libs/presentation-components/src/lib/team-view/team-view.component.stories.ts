import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TeamViewComponent} from "./team-view.component";
import {CommonModule} from "@angular/common";
import {CharacterBoxComponent} from "../character-box/character-box.component";


const char1 = {
    name: "Mace Windu",
    image: {
        url: 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Mace_Windu.jpg/revision/latest?cb=20071230055326'
    }
};

const char2 = {
    name: "Anakin Skywalker",
    image: {
        url: 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png/revision/latest?cb=20130621175844'
    }
};

const char3 = {
    name: "Captain America",
    image: {
        url: 'https://timedotcom.files.wordpress.com/2015/04/avengers-poster-06.jpg'
    }
};

const props1 = {
    characters: [char1, char2],
    selected: {},
    computer: true
};

const props2 = {
    characters: [char1, char2, char3],
    selected: {},
    computer: true
};

storiesOf('TeamView', module)
    .addDecorator(
        moduleMetadata({
            declarations: [TeamViewComponent, CharacterBoxComponent],
            imports: [CommonModule]
        })
    )
    .add('2 members', () => ({
            template: `<swzf-clients-team-view
                [characters]="characters"
                [selected]="selected"
                computer="computer"></swzf-clients-team-view>`,
            props: props1
        })
    )
    .add('3 members', () => ({
            template: `<swzf-clients-team-view
                [characters]="characters"
                [selected]="selected"
                computer="computer"></swzf-clients-team-view>`,
            props: props2
        })
    )

;

