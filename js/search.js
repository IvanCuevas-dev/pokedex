buscador.addEventListener("input", aplicarFiltros);

//Generar botones de tipo
function generarBtnsTipo() {

    filtroTipos.innerHTML = "";

    //Boton Favoritos
    let botonFav = document.createElement("button");
    botonFav.textContent = "Favoritos";
    botonFav.classList.add(
        "px-5",
        "text-xs",
        "rounded",
        "capitalize",
        "text-white",
        "bg-red-600",
        "cursor-pointer",
        "transition",
        "duration-200",
        "hover:scale-105"
    );

    botonFav.addEventListener("click", function () {
        tipoSeleccionado = "fav";
        actualizarBotonActivo(botonFav);
        aplicarFiltros();
    });
    filtroTipos.appendChild(botonFav);


    //Boton All
    let botonAll = document.createElement("button");
    botonAll.textContent = "All";
    botonAll.classList.add(
        "px-5",
        "text-xs",
        "rounded",
        "capitalize",
        "text-white",
        "bg-gray-700",
        "cursor-pointer",
        "transition",
        "duration-200",
        "hover:scale-105"
    );

    botonAll.addEventListener("click", function () {
        tipoSeleccionado = "all";
        actualizarBotonActivo(botonAll);
        aplicarFiltros();
    });
    filtroTipos.appendChild(botonAll);


    //Botones tipo
    Object.keys(coloresTipo).forEach(function (tipo) {

        let botonTipo = document.createElement("button");
        botonTipo.textContent = tipo;
        botonTipo.classList.add(
            "pr-6",
            "pl-3",
            "text-xs",
            "rounded",
            "capitalize",
            "text-white",
            "cursor-pointer",
            "flex",
            "items-center",
            "gap-2",
            "transition",
            "duration-200",
            "hover:scale-105",
            coloresTipo[tipo]
        );

        //Icono tipo
        let icono = document.createElement("img");
        icono.src = iconosTipo[tipo];
        icono.classList.add(
            "h-4",
            "w-4",
            "object-contain"
        );
        botonTipo.appendChild(icono);

        botonTipo.addEventListener("click", function () {
            tipoSeleccionado = tipo;
            actualizarBotonActivo(botonTipo);
            aplicarFiltros();
        });
        filtroTipos.appendChild(botonTipo);
    });
}


//Filtros del buscador
function aplicarFiltros() {

    let texto = buscador.value.toLowerCase();
    pokemonFiltrados = listaPokemons.filter(function (pokemon) {

        let coincideTexto = pokemon.name.includes(texto) || pokemon.id.toString().includes(texto);
        let coincideTipo = tipoSeleccionado === "all" || pokemon.types[0].type.name === tipoSeleccionado || (tipoSeleccionado === "fav" && favoritos.includes(pokemon.id));
        return coincideTexto && coincideTipo;
    });

    contenedorPokemon.innerHTML = "";

    if (pokemonFiltrados.length === 0) {
        estadoVacio.classList.remove("hidden");
        setTimeout(() => {
            estadoVacio.classList.remove("opacity-0", "scale-95");
        }, 50);
        return;
    }

    estadoVacio.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
        estadoVacio.classList.add("hidden");
    }, 300);

    pokemonFiltrados.forEach(function (pokemon) {
        crearCardPokemon(pokemon);
    });
}


//Detecta si es favorito
function esFavorito(id) {
    return favoritos.includes(id);
}

//Alterna entre favorito y no
function toggleFavorito(id) {

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(function (fav) {
            return fav !== id;
        });
    } else {
        favoritos.push(id);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

//Funcion detectar boton activo
function actualizarBotonActivo(botonSeleccionado) {

    let botones = filtroTipos.querySelectorAll("button");

    botones.forEach(function (btn) {
        btn.classList.remove("ring-2", "ring-black", "scale-105", "transition", "duration-200");
    });

    botonSeleccionado.classList.add("ring-2", "ring-black", "scale-105", "transition", "duration-300");
}