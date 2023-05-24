# Features
## Home page
###### *The Home page is the first page you access. It is used as a Pokedex where you can navigate throughout all Pokémon Species with an Offset and a card Limit used as URL Parameters. There is a Previous and a Next button to navigate throught the Pokémons and a Search Bar.*
- [ ] Add Style to the Search Bar.
- [ ] Add Style to the Limit Selector.
- [ ] Add Style to the Pagination indicator.
- [ ] Add Style to the Buttons.
- [ ] Make each Pokemon Type Box have it's own CSS Class based on it's type (ie. Fire -> type-fire) and Display a background color related to the type for better UX.
- [ ] Make all Cards in the container the same size. 
- [ ] Work on media queries for a better mobile UX.
- [ ] Make a toggle to see the same page but with all sprites with the [Shiny version](https://bulbapedia.bulbagarden.net/wiki/Shiny_Pok%C3%A9mon) every Pokémon.

## Information page
###### *The information page is accessible by clicking on a card, the card has an onClick function redirecting the the details.html file with an URL Parameter giving the details.js script the ID of the Pokémon we're displaying informations on.*
- [ ] Display all evolutions with level and / or conditions (items, level of hapiness ect...) needed.
- [ ] Display all the [TMs and HMs](https://bulbapedia.bulbagarden.net/wiki/Category:TMs_and_HMs_Pocket) the Pokémon can learn.
- [ ] Display all the forms of this Pokémon.
- [ ] Display all stats of the Pokémon with a cursor to see the stats at the pointed level.
- [ ] Make a toggle to see the same page but with all sprites with the [Shiny version](https://bulbapedia.bulbagarden.net/wiki/Shiny_Pok%C3%A9mon) of the Pokémon.

# DevOps and Good Practices
- [ ] Hide API Calls on the 'Network' tab of web browsers.
- [ ] Create multiple tests for each feature.

# Improvements
- [ ] Optimize API Calls Count on homepage.
    > Currently 1 call is made at the start of the script to get [all the Pokemons](https://pokeapi.co/api/v2/pokemon-species?limit=10000&offset=0) and 2 calls are made for every pokemon one for the [informations on the species](https://pokeapi.co/api/v2/pokemon-species/bulbasaur) and one for the [informations on the default form](https://pokeapi.co/api/v2/pokemon/bulbasaur) and a final call for [the sprite of the pokemon](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png).
- [ ] Improve cards loading to be more fluid and not take 2 seconds to load everytime.

# Refactor
- [ ] Refactor code with try / catch statements.
- [ ] Refactor Cards using [Web Component's Custom Elements](https://www.thinktecture.com/en/web-components/native-web-components-without-framework/).
- [ ] Refactor each component into separate files and not one big file.
