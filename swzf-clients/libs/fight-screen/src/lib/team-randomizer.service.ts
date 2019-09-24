import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Observable, Subscription} from "rxjs";
import {map, share} from "rxjs/operators";
import {People} from "@swzf-clients/model";

const ZOMBIE = gql`
  mutation AddOrRemoveFromZombies($id: Int!) {
    addOrRemoveFromZombies(id: $id) @client
  }
`;

@Injectable({
    providedIn: 'root'
})
export class TeamRandomizerService {

    private TEAM_SIZE = 3;

    private randomTeams: Subscription;

    constructor(private apollo: Apollo) {
    }

    selectTeam(people: People[], teamSize: number) {
        const team: People[] = [];
        while (team.length < teamSize) {
            const selectedCharacter = Math.floor(Math.random() * people.length - 1);
            for (const character of people.splice(selectedCharacter, 1)) {
                team.push(character);
            }
        }
        return team;
    }

    createRandomTeams(teamSize: number) {
        if ( this.randomTeams ) {
            this.randomTeams.unsubscribe();
        }

        this.randomTeams = this.apollo.query<{allPeople: People[]}>({
            query: gql`
            {
                allPeople {
                    id
                }
            }
            `
        }).pipe(
            map((result) => {
                const people = result.data.allPeople;
                const zombies = this.selectTeam(people, teamSize);
                const renegades = this.selectTeam(people, teamSize);
                return {zombies, renegades};
            })
        ).subscribe( ({zombies, renegades}) => {

            
            this.apollo.mutate({
                    mutation: ZOMBIE,
                    variables: {
                        id: this.task.id,
                    }
                }).subscribe();

                console.log(zombies, renegades);
            }
        );
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
                    dead @client
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
