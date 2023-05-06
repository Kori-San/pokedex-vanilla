/**
 * @typedef PokemonSpecies
 * @type {object}
 * @property {number} count
 * @property {?string} next
 * @property {?string} previous
 * @property {{name: string, url: string}[]} results
 *
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<PokemonSpecies.results>}
 */
export async function getPokemonsList(limit, offset) {
    const url = "https://pokeapi.co/api/v2/pokemon-species?limit=" + limit + "&offset=" + offset;
    const response = await fetch(url);

    /** @type {PokemonSpecies} */
    const data = await response.json();
    return data.results;
}

/**
 * @returns {Promise<number>}
 */
export async function getPokemonCount() {
    const url = "https://pokeapi.co/api/v2/pokemon-species?limit=1";
    const response = await fetch(url);

    /** @type {PokemonSpecies} */
    const data = await response.json();

    return data.count;
}

/**
 * This function retrieves data for a specific Pokemon by its ID from the PokeAPI.
 *
 * @param {string} id - The `id` parameter is a number that represents the unique identifier of a specific
 * Pokemon in the PokeAPI. This function uses the `id` parameter to construct a URL that points to the
 * API endpoint for the corresponding Pokemon. The function then sends a GET request to the API
 * endpoint using the constructed URL
 *
 * @returns {Promise<Pokemon>} The function `getPokemonById` returns a Promise that resolves to the data of a Pokemon with
 * the specified `id` fetched from the PokeAPI. The data is in JSON format.
 */
export async function getPokemonById(id) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    const response = await fetch(url);
    return await response.json();
}

/**
 * This function retrieves information about a Pokemon by its name from the PokeAPI.
 * 
 * @param {string} name - The name parameter is a string that represents the name of the Pokemon that you want
 * to retrieve information for.
 * 
 * @returns  {Promise<Pokemon>} The `getPokemonByName` function returns a Promise that resolves to the JSON data of a
 * Pokemon object retrieved from the PokeAPI based on the provided `name` parameter.
 */
export async function getPokemonByName(name) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    const response = await fetch(url);
    return await response.json();
}