let contenedorPokemon = document.getElementById("contenedor_pokemon");
let contenedorBuscador = document.getElementById("contenedor_buscador");
let listaPokemons = [];
let pokemonFiltrados = []

let modalPokemon = document.getElementById("modalPokemon");
let contenidoModal = document.getElementById("contenidoModal");
let cerrarModal = document.getElementById("cerrarModal");
let pantallaPokedex = document.getElementById("pantallaPokedex");
let contenidoLista = document.createElement("div");

let buscador = document.getElementById("buscador");
let contenedorBtnEquipo = document.getElementById("contenedor_btnEquipo");
let filtroTipos = document.getElementById("filtroTipos");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let tipoSeleccionado = "all";
let estadoVacio = document.getElementById("estadoVacio");

contenidoLista.classList.add(
    "max-w-md",
    "mx-auto",
    "mt-4",
    "px-4",
    "flex",
    "flex-col",
    "h-full"
);

//Botones + fondo cards
let coloresTipo = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    poison: "bg-purple-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ground: "bg-amber-600",
    psychic: "bg-pink-500",
    ice: "bg-cyan-300",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-600",
    fighting: "bg-red-700",
    fairy: "bg-pink-300"
};

let gradientesTipo = {
    grass: ["from-green-400", "to-green-600"],
    fire: ["from-orange-400", "to-red-500"],
    water: ["from-blue-400", "to-blue-600"],
    electric: ["from-yellow-300", "to-yellow-500"],
    poison: ["from-purple-400", "to-purple-600"],
    bug: ["from-lime-400", "to-green-500"],
    normal: ["from-gray-300", "to-gray-500"],
    ground: ["from-amber-500", "to-yellow-700"],
    fairy: ["from-pink-300", "to-pink-500"],
    fighting: ["from-red-600", "to-red-800"],
    psychic: ["from-pink-400", "to-pink-600"],
    rock: ["from-yellow-600", "to-yellow-800"],
    ghost: ["from-indigo-500", "to-purple-700"],
    ice: ["from-cyan-300", "to-blue-400"],
    dragon: ["from-indigo-500", "to-indigo-800"]
};

//Iconos
let iconosStats = {
    hp: "img/hp.png",
    attack: "img/attack.png",
    defense: "img/defense.png",
    speed: "img/speed.png"
};
let iconosInfo = {
    weight: "img/weight.png",
    height: "img/height.png"
};

let iconosTipo = {
    normal: "img/types/normal.png",
    fire: "img/types/fire.png",
    water: "img/types/water.png",
    grass: "img/types/grass.png",
    electric: "img/types/electric.png",
    poison: "img/types/poison.png",
    flying: "img/types/flying.png",
    bug: "img/types/bug.png",
    rock: "img/types/rock.png",
    ground: "img/types/ground.png",
    psychic: "img/types/psychic.png",
    ice: "img/types/ice.png",
    ghost: "img/types/ghost.png",
    dragon: "img/types/dragon.png",
    fighting: "img/types/fighting.png",
    fairy: "img/types/fairy.png"
};
