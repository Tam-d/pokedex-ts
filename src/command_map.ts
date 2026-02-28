import { State } from "./state.js";
import { ShallowLocations, Location } from "./pokeapi.js";

export async function commandMap(state : State) {

    if(state.nextLocationsURL != null) {
        let response : ShallowLocations = await state.pokeApi.fetchLocations(
            state.nextLocationsURL
        );

        state.prevLocationsURL = response.previous;
        state.nextLocationsURL = response.next;

        for(const location of response["results"]) {
            console.log(`${location.name}`);
        }
    }

    
}