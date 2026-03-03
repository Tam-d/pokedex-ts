import { State } from "./state.js";
import { ShallowLocations, Location } from "./pokeapi.js";

export async function commandMap(state : State) {

    if(state.nextLocationsURL != null) {
        let response : ShallowLocations = await state.pokeApi.fetchLocations(
            state.nextLocationsURL
        );

        console.log(response);

        state.prevLocationsURL = response.previous;
        state.nextLocationsURL = response.next;

        for(const location of response["results"]) {
            console.log(`${location.name}`);
        }
    }
}

export async function commandMapB(state : State) {

    if(state.prevLocationsURL != null) {
        let response : ShallowLocations = await state.pokeApi.fetchLocations(
            state.prevLocationsURL
        );

        console.log(response);

        state.prevLocationsURL = response.previous;
        state.nextLocationsURL = response.next;

        for(const location of response["results"]) {
            console.log(`${location.name}`)
        }
    }
}