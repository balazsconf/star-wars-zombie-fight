import {SIDE_RENEGADES, SIDE_ZOMBIES} from "@swzf-clients/model";

export const characterSebulba = {
    name: 'Sebulba',
    height: '112',
    mass: '40',
    hair_color: 'none',
    skin_color: 'grey, red',
    eye_color: 'orange',
    birth_year: 'unknown',
    gender: 'male',
    image: {
        url: 'http://localhost:3000/Sebulba_Headshot_Closeup.png',
    },
    homeworld: {
        name: 'Malastare',
    },
    dead: true,
    side: SIDE_RENEGADES,
    selected: false,
};

export const characterDarthMaul = {
    name: 'Darth Maul',
    height: '175',
    mass: '80',
    hair_color: 'none',
    skin_color: 'red',
    eye_color: 'yellow',
    birth_year: '54BBY',
    gender: 'male',
    image: {
        url: 'http://localhost:3000/Darth_Maul_profile.png',
    },
    homeworld: {
        name: 'Dathomir',
    },
    dead: true,
    side: SIDE_ZOMBIES,
    selected: false,
};
