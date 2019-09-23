import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SwzfUiModule} from "@swzf-clients/swzf-ui";
import {RouterModule} from "@angular/router";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
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
                resolvers,
                // resolvers: {
                //     Mutation: {
                //         toggleDead: (_root, variables, {cache, getCacheKey}) => {
                //             const id = getCacheKey({__typename: 'People', id: variables.id});
                //             const fragment = gql`
                //                 fragment dead on People {
                //                     true
                //                   }
                //                 `;
                //             const people = cache.readFragment({fragment, id});
                //             const data = {...people, dead: !people.dead};
                //             cache.writeData({id, data});
                //             return null;
                //         },
                //     },
                //     Query: {
                //         People: {
                //             dead: (people, _args, { cache, getCacheKey }) => {
                //                 console.log('query dead');
                //                 const id = getCacheKey({__typename: 'People', id: people.id});
                //                 const fragment = gql`
                //                 fragment dead on People {
                //                     true
                //                   }
                //                 `;
                //                 const cachedPeople = cache.readFragment({fragment, id});
                //                 return cachedPeople.dead ? true: false;
                //             }
                //         }
                //     }
                // }
            }
        },
        deps: [HttpLink]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}


const typeDefs = gql`
  extend type People {
    dead: Boolean
    side: String
  }
`;

const resolvers = {};
