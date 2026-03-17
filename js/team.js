let btnEquipo = document.getElementById("btnEquipo");
let panelEquipo = document.getElementById("panelEquipo");
let btnCambiarEquipo = document.getElementById("btnCambiarEquipo");
let slots = document.querySelectorAll(".slot");
let nombreEquipo = document.getElementById("nombreEquipo")

let equipos = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];
let equipoActivo = 0;
let pokemonArrastrado = null;

//Titulo equipo 1
nombreEquipo.textContent = `Equipo ${equipoActivo + 1}`;


//Mostrar panel equipo
function abrirPanelEquipo() {
    panelEquipo.classList.remove("right-[-260px]");
    panelEquipo.classList.add("right-10");
}


//Ocultar panel equipo
function cerrarPanelEquipo() {
    panelEquipo.classList.remove("right-10");
    panelEquipo.classList.add("right-[-260px]");
}


//Evento boton mostrar panel equipo
btnEquipo.addEventListener("click", () => {
    if (panelEquipo.classList.contains("right-10")) {
        cerrarPanelEquipo();
    } else {
        abrirPanelEquipo();
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


//Alternar equipo activo
btnCambiarEquipo.addEventListener("click", () => {

    equipoActivo++;
    pokemonArrastrado = null;

    if (equipoActivo > 2) {
        equipoActivo = 0;
    }
    nombreEquipo.textContent = `Equipo ${equipoActivo + 1}`;
    generarEquipo();
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
}