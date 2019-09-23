const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

const BASE_URL = "http://localhost:3000/";

const extractIdFromUrl = (url) => {
    return url.match(/\/([0-9]+)\//)[1];
};


class PeopleAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`people/${id}`);
    }

    async getAll(id) {
        return this.get(`people`);
    }

    async getRandomPeople(count) {
        this.get(`people/${id}`);
    }

}

class ImagesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`peopleImages/${id}`);
    }
}

class PlanetsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`planets/${id}`);
    }
}

class FilmsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`films/${id}`);
    }
}

class SpeciesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`species/${id}`);
    }
}

class VehiclesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`vehicles/${id}`);
    }
}

class StarshipsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BASE_URL;
    }

    async getById(id) {
        return this.get(`starships/${id}`);
    }
}

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type People {
    id: ID!
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String    
    homeworld: Planet
    films: [Film]
    species: Species,
    vehicles: [Vehicle]
    starships: [Starship]
    image: Image
  }
  
  type Image {
    id: ID!
    url: String
  }
  
  type Planet {
    id: ID!
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: String
  }

  type Film {
    id: ID!
    title: String
    episode_id: String
    opening_crawl: String
    director: String
    producer: String
    release_date: String
  }
  
  type Species {
    id: ID!
    name: String
    classification: String
    average_height: Int
    skin_colors: String
    hair_colors: String
    eye_colors: String
    average_lifespan: String
    language: String
  }
  
  type Vehicle {
    name: String
    model: String
    manufacturer: String
    cost_in_credits: String
    length: String
    max_atmosphering_speed: String
    crew: String
    passengers: String
    cargo_capacity: String
    consumables: String
    vehicle_class: String
  }
  
  type Starship {
    name: String 
    model: String 
    manufacturer: String 
    cost_in_credits: String 
    length: String 
    max_atmosphering_speed: String
    crew: String 
    passengers: String 
    cargo_capacity: String 
    consumables: String 
    hyperdrive_rating: String 
    MGLT: String 
    starship_class: String
  }
  
  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    people(id: ID!): People
    planet(id: ID!): Planet
    image(id: ID!): Image
    allPeople: [People]
  }
`;

const resolvers = {
    Query: {
        allPeople: async (_source, { id }, { dataSources }) => {
            return dataSources.peopleAPI.getAll();
        },
        people: async (_source, { id }, { dataSources }) => {
            return dataSources.peopleAPI.getById(id);
        },
        planet: async (_source, { id }, { dataSources }) => {
            return dataSources.planetsAPI.getById(id);
        }
    },
    People: {
        image: async (people, _args, { dataSources }) => {
            return dataSources.imagesAPI.getById(people.id);
        },
        homeworld: async (people, _args, { dataSources }) => {
            return dataSources.planetsAPI.getById(extractIdFromUrl(people.homeworld));
        },
        films: async (people, _args, { dataSources }) => {
            const films = [];
            for ( const film of people.films ) {
                films.push(dataSources.filmsAPI.getById(extractIdFromUrl(film)));
            }
            return films;
        },
        species: async (people, _args, { dataSources }) => {
            return dataSources.speciesAPI.getById(people.id);
        },
        vehicles: async (people, _args, { dataSources }) => {
            const vehicles = [];
            for ( const vehicle of people.vehicles ) {
                vehicles.push(dataSources.vehiclesAPI.getById(extractIdFromUrl(vehicle)));
            }
            return vehicles;
        },
        starships: async (people, _args, { dataSources }) => {
            const starships = [];
            for ( const starship of people.starships ) {
                starships.push(dataSources.starshipsAPI.getById(extractIdFromUrl(starship)));
            }
            return starships;
        }
    }
};

const server = new ApolloServer({
    typeDefs, resolvers,
    dataSources: () => {
        return {
            peopleAPI: new PeopleAPI(),
            imagesAPI: new ImagesAPI(),
            planetsAPI: new PlanetsAPI(),
            filmsAPI: new FilmsAPI(),
            speciesAPI: new SpeciesAPI(),
            vehiclesAPI: new VehiclesAPI(),
            starshipsAPI: new StarshipsAPI()
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
