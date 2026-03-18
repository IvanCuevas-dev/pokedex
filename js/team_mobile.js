let modalEquipoMovil = document.getElementById("modalEquipoMovil");
let btnCerrarEquipoMovil = document.getElementById("btnCerrarEquipoMovil");
let nombreEquipoMovil = document.getElementById("nombreEquipoMovil");
let contenedorSlotsMovil = document.getElementById("slotsMovil");


// Abrir el modal de equipo móvil
function abrirEquipoMovil() {
    nombreEquipoMovil.textContent = `Equipo ${equipoActivo + 1}`;
    generarSlotsMovil();
    modalEquipoMovil.classList.remove("hidden");
    modalEquipoMovil.classList.add("anim-fade-overlay");
    contenidoEquipoMovil.classList.add("anim-sheet-entrada");
}

// Cerrar el modal de equipo móvil
function cerrarEquipoMovil() {
    modalEquipoMovil.classList.remove("anim-fade-overlay");
    modalEquipoMovil.classList.add("anim-fade-overlay-salida");
    contenidoEquipoMovil.classList.remove("anim-sheet-entrada");
    contenidoEquipoMovil.classList.add("anim-sheet-salida");

    setTimeout(() => {
        modalEquipoMovil.classList.add("hidden");
        modalEquipoMovil.classList.remove("anim-fade-overlay-salida");
        contenidoEquipoMovil.classList.remove("anim-sheet-salida");
        pokemonArrastrado = null;
    }, 300);
}


// Listener botón cerrar
btnCerrarEquipoMovil.addEventListener("click", cerrarEquipoMovil);

// Listener cerrar modal con click fuera
modalEquipoMovil.addEventListener("click", function (e) {
    if (e.target === modalEquipoMovil) {
        cerrarEquipoMovil();
    }
});


// Listener botón cambiar equipo móvil
let btnCambiarEquipoMovil = document.getElementById("btnCambiarEquipoMovil");

btnCambiarEquipoMovil.addEventListener("click", function () {

    equipoActivo++;

    if (equipoActivo > 2) {
        equipoActivo = 0;
    }

    nombreEquipo.textContent = `Equipo ${equipoActivo + 1}`;
    nombreEquipoMovil.textContent = `Equipo ${equipoActivo + 1}`;
    generarEquipo();
    generarSlotsMovil();
});


// Listener botón eliminar equipo móvil
let btnEliminarEquipoMovil = document.getElementById("btnEliminarEquipoMovil");

btnEliminarEquipoMovil.addEventListener("click", async function () {

    let confirmado = await confirmar("¿Eliminar este equipo?");
    if (!confirmado) return;

    equipos[equipoActivo] = [null, null, null, null, null, null];
    generarEquipo();
    generarSlotsMovil();
});


//Genera los slots en móvil
function generarSlotsMovil() {

    contenedorSlotsMovil.innerHTML = "";
    let equipo = equipos[equipoActivo];

    equipo.forEach(function (pokemon, index) {

        let slot = document.createElement("div");
        slot.classList.add(
            "relative",
            "h-24",
            "md:h-30",
            "rounded-lg",
            "shadow-md",
            "bg-gradient-to-b",
            "from-[#F5F5F5]",
            "via-gray-100",
            "to-gray-500",
            "flex",
            "items-center",
            "justify-center",
            "cursor-pointer"
        );

        if (pokemon) {
            //Imagen pokemon
            let img = document.createElement("img");
            img.src = pokemon.sprite;
            img.classList.add(
                "w-20",
                "pointer-events-none"
            );
            slot.appendChild(img);

        } else {
            //Imagen pokedex vacia
            let img = document.createElement("img");
            img.src = "img/pokedex-slot.png";
            img.classList.add(
                "w-10",
                "opacity-90",
                "pointer-events-none",
                "md:w-12"
            );
            slot.appendChild(img);
        }

        // Asignar pokemon al slot
        slot.addEventListener("click", function () {
            if (!pokemonArrastrado) return;
            equipos[equipoActivo][index] = pokemonArrastrado;
            generarEquipo();
            generarSlotsMovil()
        });

        contenedorSlotsMovil.appendChild(slot);
    });
}

