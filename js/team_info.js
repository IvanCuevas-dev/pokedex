let modalInfoEquipo = document.getElementById("modalInfoEquipo");
let btnCerrarInfoEquipo = document.getElementById("btnCerrarInfoEquipo");
let nombreInfoEquipo = document.getElementById("nombreInfoEquipo");
let cardsInfoEquipo = document.getElementById("cardsInfoEquipo");


// Abrir modal info equipo
function abrirInfoEquipo() {
    nombreInfoEquipo.textContent = `Equipo ${equipoActivo + 1}`;
    generarCardsInfoEquipo();
    modalInfoEquipo.classList.remove("hidden");
    modalInfoEquipo.classList.add("anim-fade-overlay");
    contenidoInfoEquipo.classList.add("anim-sheet-entrada");
}


// Cerrar modal info equipo
function cerrarInfoEquipo() {
    modalInfoEquipo.classList.remove("anim-fade-overlay");
    modalInfoEquipo.classList.add("anim-fade-overlay-salida");
    contenidoInfoEquipo.classList.remove("anim-sheet-entrada");
    contenidoInfoEquipo.classList.add("anim-sheet-salida");

    setTimeout(() => {
        modalInfoEquipo.classList.add("hidden");
        modalInfoEquipo.classList.remove("anim-fade-overlay-salida");
        contenidoInfoEquipo.classList.remove("anim-sheet-salida");
    }, 300);
}


// Listener botón cerrar
btnCerrarInfoEquipo.addEventListener("click", cerrarInfoEquipo);

// Cerrar con click fuera
modalInfoEquipo.addEventListener("click", function (e) {
    if (e.target === modalInfoEquipo) cerrarInfoEquipo();
});


// Generar cards del equipo
function generarCardsInfoEquipo() {

    cardsInfoEquipo.innerHTML = "";
    let equipo = equipos[equipoActivo];

    equipo.forEach(function (pokemon) {

        let card = document.createElement("div");
        card.classList.add(
            "min-h-[100px]",
            "md:min-h-[180px]",
            "rounded-lg",
            "shadow-md",
            "bg-gradient-to-b",
            "from-[#F5F5F5]",
            "via-gray-100",
            "to-gray-500",
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "p-2",
            "gap-1"
        );

        if (pokemon) {

            let tipo = pokemon.tipo ?? "normal";
            let colorClase = coloresTipo[tipo] ?? "bg-gray-400";

            // Imagen
            let img = document.createElement("img");
            img.src = pokemon.sprite;
            img.classList.add(
                "w-16",
                "md:w-20",
                "object-contain"
            );

            // Nombre
            let nombre = document.createElement("span");
            nombre.textContent = pokemon.nombre;
            nombre.classList.add(
                "text-xs",
                "font-bold",
                "text-gray-800",
                "capitalize",
                "text-center"
            );

            // Tipo
            let tipoHTML = document.createElement("span");
            tipoHTML.textContent = tipo;
            tipoHTML.classList.add(
                "text-xs",
                "px-2",
                "py-0.5",
                "rounded",
                "capitalize",
                "text-white",
                colorClase
            );

            // Barra HP
            let contenedorHp = document.createElement("div");
            contenedorHp.classList.add(
                "w-full",
                "px-2",
                "lg:block",
                "hidden"
            );

            let labelHp = document.createElement("span");
            labelHp.textContent = `HP: ${pokemon.hp}`;
            labelHp.classList.add(
                "text-xs",
                "text-gray-600"
            );

            let barraFondo = document.createElement("div");
            barraFondo.classList.add(
                "w-full",
                "h-2",
                "bg-gray-200",
                "rounded-full",
                "overflow-hidden",
                "mt-1"
            );

            let barraProgreso = document.createElement("div");
            let porcentaje = (pokemon.hp / 150) * 100;
            barraProgreso.style.width = porcentaje + "%";
            barraProgreso.classList.add(
                "h-full",
                "rounded-full",
                "transition-all",
                "duration-500",
                colorClase
            );

            card.appendChild(img);
            card.appendChild(nombre);
            card.appendChild(tipoHTML);
            barraFondo.appendChild(barraProgreso);
            contenedorHp.appendChild(labelHp);
            contenedorHp.appendChild(barraFondo);
            card.appendChild(contenedorHp);

        } else {

            // Slot vacío
            let img = document.createElement("img");
            img.src = "img/pokedex-slot.png";
            img.classList.add("w-10", "opacity-40", "my-auto");
            card.appendChild(img);
        }

        cardsInfoEquipo.appendChild(card);
    });
}


// Listener botón info equipo desktop
btnInfoEquipo.addEventListener("click", abrirInfoEquipo);

// Listener botón info equipo móvil
let btnInfoEquipoMovil = document.getElementById("btnInfoEquipoMovil");
btnInfoEquipoMovil.addEventListener("click", function () {
    cerrarEquipoMovil();
    setTimeout(() => {
        abrirInfoEquipo();
    }, 300);
});