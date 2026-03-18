on();

//Botón que enciende la pokedex
function on() {

    let btnEncender = document.getElementById("btnEncender");
    let barraCarga = document.getElementById("barraCarga");
    let progreso = document.getElementById("progreso");
    let pantallaInicio = document.getElementById("pantallaInicio");
    let mensajeCarga = document.getElementById("mensajeCarga");

    btnEncender.addEventListener("click", function () {

        //Ocultar btn encender + mostrar barra carga + mensaje
        setTimeout(() => {
            btnEncender.classList.add("hidden");
            barraCarga.classList.add("opacity-100");
            mensajeCarga.classList.add("opacity-100");
        }, 100)

        //Progreso carga
        let carga = 0;
        let intervalo = setInterval(() => {
            carga += 5;
            progreso.style.width = carga + "%";
            if (carga >= 100) {
                clearInterval(intervalo);
                // Mostrar/Ocultar
                setTimeout(() => {
                    barraCarga.classList.add("hidden");
                    pantallaInicio.classList.add("hidden");
                    contenedorPokemon.classList.remove("hidden");
                    contenedorBuscador.classList.remove("hidden");
                    filtroTipos.classList.remove("hidden");
                    cargarPokemons();
                    generarBtnsTipo();
                }, 500);
            }
        }, 10);
    });
}


//Recibe datos del pokemon y dibuja la card
function crearCardPokemon(pokemon) {

    //Div
    let contenido = document.createElement("div");
    contenido.classList.add(
        "max-w-sm",
        "w-full",
        "rounded-xl",
        "shadow-lg",
        "p-4",
        "bg-gradient-to-b",
        "from-[#F5F5F5]",
        "via-gray-100",
        "to-gray-500",
        "transition",
        "duration-400",
        "hover:scale-105",
        "flex",
        "flex-col",
        "items-center",
        "gap-2",
        "relative",
        "opacity-0",
        "translate-y-2",
        "duration-500",
        "cursor-pointer"
    );

    //Evento Drag and Drop de cada card pokemon
    contenido.setAttribute("draggable", true);

    contenido.addEventListener("dragstart", (e) => {

        pokemonArrastrado = {
            id: pokemon.id,
            nombre: pokemon.name,
            sprite: pokemon.sprites.other["official-artwork"].front_default
        };
    });

    //Abrir panel equipo siempre que empiece el arrastre
    contenido.addEventListener("dragstart", () => {
        abrirPanelEquipo();
    });

    //Nombre
    let nombreHTML = document.createElement("h2");
    nombreHTML.textContent = pokemon.name;
    nombreHTML.classList.add(
        "text-lg",
        "font-bold",
        "text-gray-800",
        "capitalize",
        "text-center"
    );

    //Id
    let idHTML = document.createElement("span");
    idHTML.textContent = "#" + String(pokemon.id).padStart(3, "0");
    idHTML.classList.add(
        "absolute",
        "top-2",
        "left-3",
        "text-xs",
        "text-gray-700",
        "text-gray-500"
    );

    //Imagen
    let imgHTML = document.createElement("img");
    imgHTML.src = pokemon.sprites.other["official-artwork"].front_default
    imgHTML.classList.add(
        "mx-auto",
        "w-32",
        "h-32",
        "object-contain"
    );

    //Tipo
    let tipoHTML = document.createElement("span");
    let tipo = pokemon.types[0].type.name;
    tipoHTML.textContent = tipo;
    tipoHTML.classList.add(
        "block",
        "px-3",
        "text-xs",
        "rounded",
        "capitalize",
        "text-white",
        "flex",
        "items-center",
        "gap-2",
        coloresTipo[tipo]
    );

    //Icono tipo
    let iconoTipo = document.createElement("img");
    iconoTipo.src = iconosTipo[tipo];
    iconoTipo.classList.add(
        "h-4",
        "w-4",
        "object-contain"
    );

    //Icono favorito
    let iconoFavHTML = document.createElement("span");
    iconoFavHTML.textContent = esFavorito(pokemon.id) ? "❤️" : "🤍";
    iconoFavHTML.classList.add(
        "absolute",
        "top-45",
        "right-1",
        "md:right-3",
        "text-lg",
        "cursor-pointer",
        "select-none",
        "hover:scale-130",
        "transition"
    );

    //Listener icono favorito - Alternar favorito al hacer click en el corazon
    iconoFavHTML.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleFavorito(pokemon.id);
        iconoFavHTML.textContent = esFavorito(pokemon.id) ? "❤️" : "🤍";
        if (tipoSeleccionado === "fav") {
            aplicarFiltros();
        }
    });

    //Botones "+" movil
    let btnAgregarEquipoMovil = document.createElement("button");
    btnAgregarEquipoMovil.textContent = "+";
    btnAgregarEquipoMovil.classList.add(
        "absolute",
        "lg:hidden",
        "top-0",
        "md:right-2",
        "right-1",
        "text-3xl",
        "cursor-pointer",
        "select-none",
        "text-gray-600"
    );

    //Listener botones "+"
    btnAgregarEquipoMovil.addEventListener("click", function (event) {
        event.stopPropagation();
        pokemonArrastrado = {
            id: pokemon.id,
            nombre: pokemon.name,
            sprite: pokemon.sprites.other["official-artwork"].front_default
        };
        abrirEquipoMovil();
    });

    //Añadir todo al div
    contenido.appendChild(idHTML);
    contenido.appendChild(imgHTML);
    contenido.appendChild(nombreHTML);
    tipoHTML.appendChild(iconoTipo);
    contenido.appendChild(tipoHTML);
    contenido.appendChild(iconoFavHTML);
    contenido.appendChild(btnAgregarEquipoMovil);
    contenedorPokemon.appendChild(contenido);

    //Abrir modal de cada card
    contenido.addEventListener("click", function () {
        abrirModalPokemon(pokemon);
    });

    //Temportizador para animaciones
    setTimeout(() => {
        contenedorBuscador.classList.remove("opacity-0", "translate-y-2");
        filtroTipos.classList.remove("opacity-0", "translate-y-2");
        contenido.classList.remove("opacity-0", "translate-y-2");
        contenedorBtnEquipo.classList.remove("opacity-0", "translate-y-2");
        pantallaEquipo.classList.remove("opacity-0", "translate-y-2");
    }, 100);
}

