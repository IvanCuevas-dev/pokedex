let btnEquipo = document.getElementById("btnEquipo");
let panelEquipo = document.getElementById("panelEquipo");
let btnCambiarEquipo = document.getElementById("btnCambiarEquipo");
let slots = document.querySelectorAll(".slot");
let pantallaEquipo = document.getElementById("pantallaEquipo");
let btnEliminarEquipo = document.getElementById("btnEliminarEquipo");
let btnInfoEquipo = document.getElementById("btnInfoEquipo");

let equipos = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];
let equipoActivo = 0;
let pokemonArrastrado = null;


//Titulo equipo 1
let nombreEquipo = document.getElementById("nombreEquipo")
nombreEquipo.textContent = `Equipo ${equipoActivo + 1}`;


//Mostrar panel equipo
function abrirPanelEquipo() {
    pantallaEquipo.classList.remove("opacity-0", "translate-y-2");
}


//Ocultar panel equipo
function cerrarPanelEquipo() {
    pantallaEquipo.classList.add("opacity-0", "translate-y-2");
}


//Evento boton mostrar panel equipo
btnEquipo.addEventListener("click", () => {
    if (pantallaEquipo.classList.contains("opacity-0")) {
        abrirPanelEquipo();
        btnEquipo.textContent = "Ocultar Equipo";
    } else {
        cerrarPanelEquipo();
        btnEquipo.textContent = "Mostrar Equipo";
    }
});


//Permite drop en cada slot
slots.forEach(slot => {

    slot.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
});


//Guardar pokemon en slot al dropear
slots.forEach(slot => {

    slot.addEventListener("drop", function (e) {
        e.preventDefault();

        let posicion = Number(slot.dataset.slot);
        if (!pokemonArrastrado) return;

        equipos[equipoActivo][posicion] = pokemonArrastrado;
        pokemonArrastrado = null;

        generarEquipo();
    });
});


//Listener boton cambiar equipo activo
btnCambiarEquipo.addEventListener("click", () => {

    equipoActivo++;
    pokemonArrastrado = null;

    if (equipoActivo > 2) {
        equipoActivo = 0;
    }
    nombreEquipo.textContent = `Equipo ${equipoActivo + 1}`;
    generarEquipo();
    animarSlots();
});


//Animar slot
function animarSlots() {
    document.querySelectorAll(".slot").forEach((slot, i) => {
        slot.classList.remove("anim-slot");

        void slot.offsetWidth;

        slot.classList.add("anim-slot");
    });
}

//Listener boton eliminar equipo
btnEliminarEquipo.addEventListener("click", async function () {

    equipos[equipoActivo] = [null, null, null, null, null, null];

    let confirmado = await confirmar("¿Eliminar este equipo?");
    if (!confirmado) return;

    generarEquipo();
    animarSlots();

});


//Genera y muestra el equipo en cada slot
function generarEquipo() {

    let equipo = equipos[equipoActivo];

    slots.forEach(function (slot, index) {

        let pokemon = equipo[index];
        let imgPokemon = slot.querySelector(".slot-pokemon");
        let imgBase = slot.querySelector(".slot-base");

        if (!pokemon) {
            imgPokemon.classList.add("hidden");
            imgBase.classList.remove("hidden");
            return;
        }

        imgPokemon.src = pokemon.sprite;
        imgPokemon.classList.remove("hidden");
        imgBase.classList.add("hidden");
    });

    // Sincronizar panel móvil si está abierto
    if (!modalEquipoMovil.classList.contains("hidden")) {
        generarSlotsMovil();
    }
}