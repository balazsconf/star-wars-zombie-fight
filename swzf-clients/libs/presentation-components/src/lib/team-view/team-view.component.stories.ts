import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TeamViewComponent} from "./team-view.component";
import {CommonModule} from "@angular/common";
import {CharacterBoxComponent} from "../character-box/character-box.component";


const charMaceWindo = {
    name: "Mace Windu",
    image: {
        url: 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Mace_Windu.jpg/revision/latest?cb=20071230055326'
    }
};

const charAnakinSkywalker = {
    name: "Anakin Skywalker",
    image: {
        url: 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png/revision/latest?cb=20130621175844'
    }
};

const charCaptainAmerica = {
    name: "Captain America",
    image: {
        url: 'https://timedotcom.files.wordpress.com/2015/04/avengers-poster-06.jpg'
    }
};

const teamWith2Members = {
    characters: [charMaceWindo, charAnakinSkywalker],
    selected: {},
    computer: true
};

const teamWith3Members = {
    characters: [charMaceWindo, charAnakinSkywalker, charCaptainAmerica],
    selected: {},
    computer: true
};

storiesOf('Presentation components/TeamView', module)
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
            props: teamWith2Members
        })
    )
    .add('3 members', () => ({
            template: `<swzf-clients-team-view
                [characters]="characters"
                [selected]="selected"
                computer="computer"></swzf-clients-team-view>`,
            props: teamWith3Members
        })
    )

;

