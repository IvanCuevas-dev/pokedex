//Recoge datos de los pokemons, paso la url del pokemon a obtenerPokemon(url)
function cargarPokemons() {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al conectar con la Pokédex.');
            }
            return respuesta.json();
        })
        .then(datos => {
            datos.results.forEach(pokemon => {
                obtenerPokemon(pokemon.url);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


//Recibe URL del pokemon y envía los datos del pokemon a crearCardPokemon(pokemon)
function obtenerPokemon(pokemonUrl) {

    fetch(pokemonUrl)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener el pokemon.');
            }
            return respuesta.json();
        })
        .then(pokemon => {
            listaPokemons.push(pokemon);
            crearCardPokemon(pokemon);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}






