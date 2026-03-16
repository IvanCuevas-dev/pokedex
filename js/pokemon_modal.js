//Abrir modal y mostrar contenido
function abrirModalPokemon(pokemon) {

    crearModalPokemon(pokemon);

    modalPokemon.classList.remove("hidden");
    setTimeout(() => {
        modalPokemon.classList.remove("opacity-0", "translate-y-2");
        //Sonido pokemon
        let sonido = new Audio(pokemon.cries.latest);
        sonido.volume = 0.1;
        sonido.play();
    }, 100);

    pantallaPokedex.scrollTop = 0;
    pantallaPokedex.classList.remove("overflow-y-auto");
    pantallaPokedex.classList.add("overflow-hidden");

};


//Cerrar modal
function cerrarModalPokemon() {

    modalPokemon.classList.add("opacity-0", "translate-y-2");

    setTimeout(() => {
        modalPokemon.classList.add("hidden");
    }, 300);

    pantallaPokedex.classList.remove("overflow-hidden");
    pantallaPokedex.classList.add("overflow-y-auto");
};

//Cerrar modal con click X
cerrarModal.addEventListener("click", cerrarModalPokemon);

//Cerrar modal con escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cerrarModalPokemon();
    }
});

//Cerrar modal con click fuera
modalPokemon.addEventListener("click", function (event) {
    if (event.target === modalPokemon) {
        cerrarModalPokemon();
    }
});


//Crear contenido modal
function crearModalPokemon(pokemon) {

    let header = document.createElement("div");
    let nombre = document.createElement("h2");
    let listaNav = document.createElement("div");
    let id = document.createElement("span");
    let tipoHTML = document.createElement("span");

    //Fondo carta
    let tipo = pokemon.types[0].type.name;
    header.classList.add(
        "relative",
        "w-full",
        "h-24",
        "bg-gradient-to-b",
        ...gradientesTipo[tipo],
        "p-6",
        "rounded-b-[50%_40%]",
        "text-white"
    );

    //Imagen
    let img = document.createElement("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default
    img.classList.add(
        "w-38",
        "h-38",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "-bottom-6",
        "drop-shadow-xl"
    );

    //Nombre
    nombre.textContent = pokemon.name;
    nombre.classList.add(
        "text-lg",
        "font-bold",
        "capitalize",
        "text-center",
        "text-black",
        "drop-shadow-md",
        "mt-5"
    );

    //Tipo
    tipoHTML.textContent = tipo;
    tipoHTML.classList.add(
        "block",
        "w-fit",
        "mx-auto",
        "px-3",
        "my-1",
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

    //Id
    id.textContent = "#" + String(pokemon.id).padStart(3, "0");
    id.classList.add(
        "block",
        "text-center",
        "text-xs",
        "text-gray-500"
    );


    //Lista de navegacion 
    listaNav.classList.add(
        "flex",
        "justify-around",
        "items-center",
        "border-b",
        "border-gray-400",
        "mt-4",
        "pb-2"
    );

    //Botones de la lista 
    let btnStats = document.createElement("button");
    let btnEvo = document.createElement("button");
    let btnHabs = document.createElement("button");

    btnStats.textContent = "Stats";
    btnEvo.textContent = "Evoluciones";
    btnHabs.textContent = "Habilidades";

    btnStats.classList.add("text-xs", "font-semibold", "cursor-pointer");
    btnEvo.classList.add("text-xs", "font-semibold", "cursor-pointer");
    btnHabs.classList.add("text-xs", "font-semibold", "cursor-pointer");


    contenidoModal.innerHTML = "";

    //Agregar todo
    listaNav.appendChild(btnHabs);
    listaNav.appendChild(btnStats);
    listaNav.appendChild(btnEvo);
    contenidoModal.appendChild(header);
    header.appendChild(img);
    contenidoModal.appendChild(nombre);
    tipoHTML.appendChild(iconoTipo);
    contenidoModal.appendChild(tipoHTML);
    contenidoModal.appendChild(id);
    contenidoModal.appendChild(listaNav);
    contenidoModal.appendChild(contenidoLista);

    //Marcar el boton activo
    function activarListaNav(botonActivo) {

        btnStats.classList.remove("underline");
        btnEvo.classList.remove("underline");
        btnHabs.classList.remove("underline");

        botonActivo.classList.add("underline", "underline-offset-5");
    }

    //Mostrar stats al abrir card y marcar boton stats activo por defecto
    mostrarStatsPokemon(pokemon);
    activarListaNav(btnStats);
}


//Mostrar barras y stats
function mostrarStatsPokemon(pokemon) {

    contenidoLista.innerHTML = "";
    let tipo = pokemon.types[0].type.name;

    //Quitar special attack y special defense
    pokemon.stats
        .filter(stat =>
            stat.stat.name !== "special-attack" && stat.stat.name !== "special-defense"
        )
        .forEach(function (stat) {

            let porcentaje = (stat.base_stat / 200) * 100;

            //Contenedor stats
            let contenedorStat = document.createElement("div");
            contenedorStat.classList.add(
                "flex",
                "items-center",
                "gap-3",
                "text-xs",
                "mb-2",
                "px-4",
                "md:mt-2"
            );

            //Iconos stats
            let iconoStat = document.createElement("img");
            iconoStat.src = iconosStats[stat.stat.name];
            iconoStat.classList.add(
                "h-5",
                "w-5",
                "object-contain",
                "drop-shadow-sm"
            );

            //Nombres stats
            let nombreStat = document.createElement("span");
            nombreStat.textContent = stat.stat.name;
            nombreStat.classList.add(
                "w-10",
                "capitalize",
                "text-gray-600",
                "font-medium"
            );

            //Valores stats
            let valorStat = document.createElement("span");
            valorStat.textContent = stat.base_stat;
            valorStat.classList.add(
                "w-8",
                "text-right",
                "text-gray-600"
            );

            //Fondo de la barra
            let barraFondo = document.createElement("div");
            barraFondo.classList.add(
                "flex-1",
                "h-2",
                "bg-gray-200",
                "rounded-full",
                "overflow-hidden"
            );

            //Relleno de la barra
            let barraProgreso = document.createElement("div");
            barraProgreso.style.width = porcentaje + "%";
            barraProgreso.classList.add(
                "h-full",
                "rounded-full",
                "transition-all",
                "duration-500",
                coloresTipo[tipo]
            );

            //Iconos
            let icono = document.createElement("img");
            icono.src = iconosStats[stat.stat.name];
            icono.classList.add(
                "w-4",
                "h-4",
                "object-contain",
                "px-2"
            );


            barraFondo.appendChild(barraProgreso);
            contenedorStat.appendChild(iconoStat);
            contenedorStat.appendChild(nombreStat);
            contenedorStat.appendChild(valorStat);
            contenedorStat.appendChild(barraFondo);
            contenidoLista.appendChild(contenedorStat);
        });

    //Contenedor peso y altura    
    let contenedorInfo = document.createElement("div");
    contenedorInfo.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "text-xs",
        "text-gray-600",
        "px-10",
        "md:mt-10",
        "lg:mt-5",
        "mt-2",
        "drop-shadow-sm"
    );


    //Altura
    let altura = (pokemon.height / 10).toFixed(1);
    let alturaHTML = document.createElement("span");
    alturaHTML.textContent = altura + " m";

    //Icono altura
    let iconoAltura = document.createElement("img");
    iconoAltura.src = iconosInfo.height;
    iconoAltura.classList.add(
        "h-6",
        "object-contain"
    );

    //Contenedor altura
    let contenedorAltura = document.createElement("div");
    contenedorAltura.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "gap-1"
    );

    //Peso
    let peso = (pokemon.weight / 10).toFixed(1);
    let pesoHTML = document.createElement("span");
    pesoHTML.textContent = peso + " kg";

    //Icono peso
    let iconoPeso = document.createElement("img");
    iconoPeso.src = iconosInfo.weight;
    iconoPeso.classList.add(
        "h-6",
        "object-contain"
    );

    //Contenedor peso
    let contenedorPeso = document.createElement("div");
    contenedorPeso.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "gap-1"
    );


    contenedorAltura.appendChild(iconoAltura);
    contenedorAltura.appendChild(alturaHTML);
    contenedorPeso.appendChild(iconoPeso);
    contenedorPeso.appendChild(pesoHTML);
    contenedorInfo.appendChild(contenedorAltura);
    contenedorInfo.appendChild(contenedorPeso);
    contenidoLista.appendChild(contenedorInfo);
}
