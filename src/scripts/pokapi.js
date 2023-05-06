export async function getPokemonsList(limit, offset) {
    const url = "https://pokeapi.co/api/v2/pokemon-species?limit=" + limit + "&offset=" + offset;
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

export async function getPokemonCount() {
    const url = "https://pokeapi.co/api/v2/pokemon-species?limit=100000";
    const response = await fetch(url);
    const data = await response.json();

    return data.count;
}

export async function getPokemonById(id) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}