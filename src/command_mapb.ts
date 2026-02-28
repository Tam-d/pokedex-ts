import { State } from "./state.js";
import { ShallowLocations } from "./pokeapi.js";

export async function commandMapB(state : State) {

    if(state.prevLocationsURL != null) {
        let response : ShallowLocations = await state.pokeApi.fetchLocations(
            state.prevLocationsURL
        );

        state.prevLocationsURL = response.previous;
        state.nextLocationsURL = response.next;

        for(const location of response["results"]) {
            console.log(`${location.name}`)
        }
    }
}