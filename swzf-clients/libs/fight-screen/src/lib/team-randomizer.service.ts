import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Observable} from "rxjs";
import {map, share} from "rxjs/operators";
import {People} from "@swzf-clients/model";

@Injectable({
    providedIn: 'root'
})
export class TeamRandomizerService {

    private TEAM_SIZE = 3;

    constructor(private apollo: Apollo) {
    }

    getRandomPeople(numberOfPeople: number): Observable<People[]> {
        return this.apollo.query<{allPeople: People[]}>({
            query: gql`
            {
                allPeople {
                    name
                    height
                    mass
                    hair_color
                    skin_color
                    eye_color
                    birth_year
                    gender
                    homeworld {
                        name
                    }                    
                    image {
                        url         
                    }
                }
            }
            `
        }).pipe(
            map((result) => {
                console.log(result);
                const people = result.data.allPeople;
                const randomPeople: People[] = [];
                while (numberOfPeople > 0) {
                    const selectedCharacter = Math.floor(Math.random() * people.length - 1);
                    for (const character of people.splice(selectedCharacter, 1)) {
                        randomPeople.push(character);
                    }
                    numberOfPeople--;
                }
                return randomPeople;
            })
        );
    }

    getTeamZombie() {
        return this.getRandomPeople(this.TEAM_SIZE * 2).pipe(
            share(),
            map( (characters) => {
                return characters.slice(0, this.TEAM_SIZE);
            }),
            map( (characters) => {
                characters.forEach( (character) => {character.side = 'zombie'} );
                return characters
            })
        )
    }

    getTeamRenegades() {
        return this.getRandomPeople(this.TEAM_SIZE * 2).pipe(
            share(),
            map( (characters) => {
                return characters.slice(this.TEAM_SIZE);
            }),
            map( (characters) => {
                characters.forEach( (character) => {character.side = 'renegade'} );
                return characters
            })
        )
    }

}
