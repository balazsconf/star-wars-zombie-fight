import {storiesOf} from "@storybook/angular";
import {CharacterBoxComponent} from "./character-box.component";


storiesOf('CharacterBox', module)
    .add('Renegade view', () => ({
        component: CharacterBoxComponent,
        props: {
            name: "Mace Windu",
            imageURL: ''
        }
    }))
;
