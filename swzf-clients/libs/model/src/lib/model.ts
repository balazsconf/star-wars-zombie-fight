
export const SIDE_ZOMBIES = 'zombies';
export const SIDE_RENEGADES = 'renegades';
export const SIDE_NONE = '';

// workaround, because apollo client seems to serve old data in queries if you set the value to null,
export const NOT_SET_PEOPLE = {
    id: '',
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    image: {
        url: '',
        __typename: 'Image'
    },
    homeworld: {
        id: '',
        name: '',
        __typename: 'Planet'
    },
    dead: true,
    side: null,
    selected: false,
    __typename: 'People'
};

export const isPeopleSet = (people: People) => {
    return (people && people.id !== '');
};

export const isAlive = (people: People) => {
    return !people.dead;
};

export const isZombie = (people: People) => {
    return people.side === SIDE_ZOMBIES;
};

export interface People {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  image: Image;
  homeworld: Planet;
  dead: boolean;
  side: null | 'zombies' | 'renegades';
  selected: boolean;
};

export interface Image {
    url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
}

