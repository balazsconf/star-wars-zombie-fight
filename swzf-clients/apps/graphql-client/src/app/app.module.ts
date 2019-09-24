import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SwzfUiModule} from "@swzf-clients/swzf-ui";
import {RouterModule} from "@angular/router";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {HttpClientModule} from "@angular/common/http";
import gql from "graphql-tag";

export const GET_ZOMBIES = gql`
  query Zombies {
    zombies @client
  }
`;

export const GET_RENEGADES = gql`
  query Renegades {
    renegades @client
  }
`;

const resolvers = {
    People: {
        dead: (people) => people.dead || false,
        side: (people, _, { cache }) => {
            const { zombies } = cache.readQuery({ query: GET_ZOMBIES });
            const { renegades } = cache.readQuery({ query: GET_RENEGADES });
            if ( zombies.includes(people.id) ) {
                return 'zombies';
            }
            if ( renegades.includes(people.id) ) {
                return 'renegades';
            }
            return '';
        }
    },
    Mutation: {
        toggleDead: (_root, variables, {cache, getCacheKey}) => {
            const id = getCacheKey({__typename: 'People', id: variables.id});
            const fragment = gql`
                fragment deadFlag on People {
                    dead
                }
            `;
            const people = cache.readFragment({fragment, id});
            const data = {...people, dead: !people.dead};
            cache.writeData({id, data});
            return null;
        },
        addOrRemoveFromZombies: (_, { id }, { cache }) => {
            const { zombies } = cache.readQuery({ query: GET_ZOMBIES });
            const data = {
                zombies: zombies.includes(id)
                    ? zombies.filter(i => i !== id)
                    : [...zombies, id],
            };
            cache.writeQuery({ query: GET_ZOMBIES, data });
            return data.zombies;
        },
        addOrRemoveFromRenegades: (_, { id }, { cache }) => {
            const { renegades } = cache.readQuery({ query: GET_RENEGADES });
            const data = {
                renegades: renegades.includes(id)
                    ? renegades.filter(i => i !== id)
                    : [...renegades, id],
            };
            cache.writeQuery({ query: GET_RENEGADES, data });
            return data.renegades;
        }
    }
};

const typeDefs = gql`
  extend type People {
    dead: Boolean
    side: String
  }
  
  extend type Query {
    zombies: [ID]!
    renegades: [ID]!
  }

  extend type Mutation {
    addOrRemoveFromZombies(id: ID!): [People]
    addOrRemoveFromRenegades(id: ID!): [People]
  }
  
`;

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SwzfUiModule, RouterModule, HttpClientModule, ApolloModule, HttpLinkModule],
    providers: [{
        provide: APOLLO_OPTIONS,
        useFactory: (httpLink: HttpLink) => {

            const cache = new InMemoryCache();

            const link = httpLink.create({
                uri: "http://localhost:4000/graphql"
            });

            return {
                cache,
                link,
                resolvers,
                typeDefs
            }
        },
        deps: [HttpLink]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() { }
}

