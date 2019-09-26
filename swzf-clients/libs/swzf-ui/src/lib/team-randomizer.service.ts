import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {Observable, Subscription} from "rxjs";
import {map, share, shareReplay, tap} from "rxjs/operators";
import {isAlive, People, SIDE_NONE, SIDE_RENEGADES, SIDE_ZOMBIES} from "@swzf-clients/model";

const imagesLocation = 'http://localhost:3000/';

const FIELDS = `
        id
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
        side @client
`;

const GET_SELECTED_ZOMBIE = gql`
{
    selectedZombie @client {
        ${FIELDS}
    }
}
`;

const SET_SELECTED_ZOMBIE = gql`
  mutation SetSelectedZombie($people: People) {
    setSelectedZombie(people: $people) @client
  }
`;

const CLEAR_SELECTED_ZOMBIE = gql`
  mutation ClearSelectedZombie {
    clearSelectedZombie @client
  }
`;

const GET_SELECTED_RENEGADE = gql`
{
    selectedRenegade @client {
        ${FIELDS}
    }
}
`;

const SET_SELECTED_RENEGADE = gql`
  mutation SetSelectedRenegade($people: People) {
    setSelectedRenegade(people: $people) @client
  }
`;

const CLEAR_SELECTED_RENEGADE = gql`
  mutation ClearSelectedRenegade {
    clearSelectedRenegade @client
  }
`;


const GET_WINNER = gql`
{
    winner @client {
        ${FIELDS}
    }
}
`;

const SET_WINNER = gql`
  mutation SetWinner($people: People) {
    setWinner(people: $people) @client
  }
`;

const CLEAR_WINNER = gql`
  mutation ClearWinner {
    clearWinner @client
  }
`;

export const DEAD = gql`
  mutation ToggleDead($id: Int!) {
    toggleDead(id: $id) @client
  }
`;

export const SIDE = gql`
  mutation SetSide($id: Int!, $side: String!) {
    setSide (id: $id, side: $side) @client
  }
`;

const GET_ALL_PEOPLE = gql`
{
    allPeople {
        ${FIELDS}
    }
}
`;

@Injectable({
    providedIn: 'root'
})
export class TeamRandomizerService {

    private TEAM_SIZE = 3;

    private randomTeams: Subscription;

    constructor(private apollo: Apollo) { }



    public mutateDead(id: string) {
        return this.apollo.mutate({
            mutation: DEAD,
            variables: { id }
        }).subscribe();
    }

    public setSide(id: string, side: string) {
        return this.apollo.mutate({
            mutation: SIDE,
            variables: { id, side }
        }).subscribe();
    }

    public setSelectedZombie(people: People) {
        return this.apollo.mutate({
            mutation: SET_SELECTED_ZOMBIE,
            variables: { people }
        }).subscribe();
    }

    public clearSelectedZombie() {
        return this.apollo.mutate({
            mutation: CLEAR_SELECTED_ZOMBIE
        }).subscribe();
    }

    public setSelectedRenegade(people: People) {
        return this.apollo.mutate({
            mutation: SET_SELECTED_RENEGADE,
            variables: { people }
        }).subscribe();
    }

    public clearSelectedRenegade() {
        return this.apollo.mutate({
            mutation: CLEAR_SELECTED_RENEGADE
        }).subscribe();
    }

    public setWinner(people: People) {
        return this.apollo.mutate({
            mutation: SET_WINNER,
            variables: { people }
        }).subscribe();
    }

    public clearWinner() {
        return this.apollo.mutate({
            mutation: CLEAR_WINNER
        }).subscribe();
    }

    public newGame() {
        this.createRandomTeams(this.TEAM_SIZE);
        this.clearSelectedZombie();
        this.clearSelectedRenegade();
        this.clearWinner();
    }

    public getTeamZombie() {
        return this.getAllPeople().pipe(
            map( (result) => {
                return result.filter(this.hasSide(SIDE_ZOMBIES))
            })
        );
    }

    public getTeamRenegades() {
        return this.getAllPeople().pipe(
            map( (result) => {
                return result.filter(this.hasSide(SIDE_RENEGADES))
            })
        );
    }

    public getSelectedZombie() {
        return this.apollo.watchQuery<{selectedZombie}>({
            query: GET_SELECTED_ZOMBIE
        }).valueChanges.pipe(
            map( (result) => {
                return result.data ? result.data.selectedZombie : false;
            }),
            share()
        );
    }

    public getSelectedRenegade() {
        return this.apollo.watchQuery<{selectedRenegade}>({
            query: GET_SELECTED_RENEGADE
        }).valueChanges.pipe(
            map( (result) => {
                return result.data ? result.data.selectedRenegade : false;
            }),
            share()
        );
    }

    public getWinner() {
        return this.apollo.watchQuery<{winner}>({
            query: GET_WINNER
        }).valueChanges.pipe(
            map( (result) => {
                return result.data ? result.data.winner : false;
            }),
            share()
        );
    }

    public gameOver() {
        return this.getAllPeople().pipe(
            map( (result) => {
                const zombies = result.filter(this.hasSide(SIDE_ZOMBIES)).filter(isAlive).length;
                const renegades = result.filter(this.hasSide(SIDE_RENEGADES)).length;

                if ( zombies === 0 && renegades === 0 ) {
                    return false;
                } else if ( zombies === 0 || renegades === 0 ) {
                    return true;
                }

                return false;
            })
        );
    }

    public getWinningTeam() {
        return this.getAllPeople().pipe(
            map( (result) => {
                const zombies = result.filter(this.hasSide(SIDE_ZOMBIES)).filter(isAlive).length;
                const renegades = result.filter(this.hasSide(SIDE_RENEGADES)).length;

                if ( zombies > renegades ) {
                    return result.filter(this.hasSide(SIDE_ZOMBIES));
                } else {
                    return result.filter(this.hasSide(SIDE_RENEGADES));
                }
            })
        );
    }

    private createRandomTeams(teamSize: number) {
        if ( this.randomTeams ) {
            this.randomTeams.unsubscribe();
        }

        this.randomTeams = this.apollo.query<{allPeople: People[]}>({
            query: GET_ALL_PEOPLE
        }).pipe(
            map((result) => {
                const people = result.data.allPeople;
                const zombies = this.selectTeam(people, teamSize);
                const renegades = this.selectTeam(people, teamSize);
                return {zombies, renegades, others: people};
            })
        ).subscribe( ({zombies, renegades, others}) => {
            others.forEach( ({id, dead}) => {
                if ( dead ) {
                    this.mutateDead(id);
                }
                this.setSide(id, SIDE_NONE)
            });
            zombies.forEach( ({id}) => this.setSide(id, SIDE_ZOMBIES));
            renegades.forEach( ({id}) => this.setSide(id, SIDE_RENEGADES));
        });
    }

    private selectTeam(people: People[], teamSize: number) {
        const team: People[] = [];
        while (team.length < teamSize) {
            const selectedCharacter = Math.floor(Math.random() * people.length - 1);
            for (const character of people.splice(selectedCharacter, 1)) {
                team.push(character);
            }
        }
        return team;
    }

    private getImageFileName(url) {
        const parts = url.split('/');
        for ( const part of parts ) {
            if( part.match(/\.jpg|\.jpeg|\.png/) ) {
                return imagesLocation + part;
            }
        }
    };

    private mapImage(people) {
        people.image.url = this.getImageFileName(people.image.url);
        return people;
    }

    private getAllPeople(): Observable<People[]>  {
        return this.apollo.watchQuery<{allPeople: People[]}>({
            query: GET_ALL_PEOPLE
        }).valueChanges.pipe(
            map((result) => {
                return result.data.allPeople.map( (people => this.mapImage(people)));
            }),
            share()
        );
    }

    private hasSide(side: string) {
        return function (people: People) {
            return (people.side === side);
        }
    }

}
