import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SwzfUiModule} from "@swzf-clients/swzf-ui";
import {RouterModule} from "@angular/router";
import {Apollo, APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLinkModule, HttpLink} from "apollo-angular-link-http";
import {HttpClientModule} from "@angular/common/http";
import gql from "graphql-tag";


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SwzfUiModule, RouterModule, HttpClientModule, ApolloModule, HttpLinkModule],
    providers: [{
        provide: APOLLO_OPTIONS,
        useFactory: (httpLink: HttpLink) => {
            return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                    uri: "http://localhost:4000/graphql"
                }),
                typeDefs,
                resolvers
            }
        },
        deps: [HttpLink]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private apollo: Apollo) {

        // initialize the local store
        this.apollo.getClient().cache.writeData({
            data: {
                deadPeople: [],
                zombies: [],
                renegades: []
            },
        });
    }
}

const typeDefs = gql`
  extend type Query {
    deadPeople: [ID!]!
    zombies: [ID!]!
    renegades: [ID!]!
  }

  extend type People {
    dead: Boolean
    side: String
  }
`;


const GET_DEAD_PEOPLE = gql`
  query GetDeadPeople {
    deadPeople @client
  }
`;
const resolvers = {
    Mutation: {
        toggleDead: (_root, variables, {cache, getCacheKey}) => {
            const id = getCacheKey({__typename: 'People', id: variables.id})
            const fragment = gql`
          fragment deadFlag on People {
            dead
          }
        `;
            const people = cache.readFragment({fragment, id});
            const data = {...people, dead: !people.dead};
            cache.writeData({id, data});
            return null;
        }
    },
    Query: {
        People: {
            dead: (people, _args, { cache }) => {
                const { deadPeople } = cache.readQuery({ query: GET_DEAD_PEOPLE });
                return deadPeople.includes(people.id);
            }
        },
        allPeople: {
            dead: (people, _args, { cache }) => {
                const { deadPeople } = cache.readQuery({ query: GET_DEAD_PEOPLE });
                return deadPeople.includes(people.id);
            }
        }
    }
};
