//Recoge datos de los pokemons, pasa url del pokemon
async function cargarPokemons() {
    try {
        let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

        if (!respuesta.ok) {
            throw new Error('Error al conectar con la Pokédex.');
        }

        let datos = await respuesta.json();

        // 👇 CLAVE: bucle secuencial
        for (let pokemon of datos.results) {
            await obtenerPokemon(pokemon.url);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

//Recibe URL del pokemon, envía los datos del pokemon
async function obtenerPokemon(pokemonUrl) {
    try {
        let respuesta = await fetch(pokemonUrl);

        if (!respuesta.ok) {
            throw new Error('Error al obtener el pokemon.');
        }

        let pokemon = await respuesta.json();

        listaPokemons.push(pokemon);
        crearCardPokemon(pokemon);

    } catch (error) {
        console.error('Error:', error);
    }
}




