export async function getAllPokemonsList(limit, offset) {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}