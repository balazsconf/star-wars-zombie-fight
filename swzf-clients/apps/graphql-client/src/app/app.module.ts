import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SwzfUiModule} from "@swzf-clients/swzf-ui";
import {RouterModule} from "@angular/router";
import {Apollo, APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {HttpClientModule} from "@angular/common/http";
import gql from "graphql-tag";
import {NOT_SET_PEOPLE} from "@swzf-clients/model";

const resolvers = {
    People: {
        dead: (people) => {
            return people.dead || false
        },
        side: (people) => {
            return people.side || ''
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
        setSide: (_root, variables, {cache, getCacheKey}) => {
            const id = getCacheKey({__typename: 'People', id: variables.id});
            const fragment = gql`
                fragment sideIndicator on People {
                    side
                }
            `;
            const people = cache.readFragment({fragment, id});
            const data = {...people, side: variables.side};
            cache.writeData({id, data});
            return null;
        },
        setSelectedZombie: (_root, variables, {cache}) => {
            cache.writeData({ data: {selectedZombie: {...variables.people} } });
            return null;
        },
        clearSelectedZombie: (_root, variables, {cache}) => {
            cache.writeData({ data: {selectedZombie: {...NOT_SET_PEOPLE} } });
            return null;
        },
        setSelectedRenegade: (_root, variables, {cache}) => {
            cache.writeData({ data: {selectedRenegade: {...variables.people} } });
            return null;
        },
        clearSelectedRenegade: (_root, variables, {cache}) => {
            cache.writeData({ data: {selectedRenegade: {...NOT_SET_PEOPLE} } });
            return null;
        },
        setWinner: (_root, variables, {cache}) => {
            cache.writeData({ data: {winner: {...variables.people} } });
            return null;
        },
        clearWinner: (_root, variables, {cache}) => {
            console.log('clear winner');
            cache.writeData({ data: {winner: {...NOT_SET_PEOPLE} } });
            return null;
        }
    }
};

const typeDefs = gql`
  extend type People {
    dead: Boolean
    side: String
  }
  
  extend type Query {
    selectedZombie: People
    selectedRenegade: People
    winner: People
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
    constructor(private apollo: Apollo) {
        this.apollo.getClient().cache.writeData({
            data: {
                selectedZombie: {...NOT_SET_PEOPLE},
                selectedRenegade: {...NOT_SET_PEOPLE},
                winner: {...NOT_SET_PEOPLE},
                gameOver: false
            },
        });
    }
}

