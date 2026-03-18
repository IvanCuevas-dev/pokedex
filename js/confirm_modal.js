function confirmar(mensaje) {
    return new Promise((resolve) => {

        let modal = document.getElementById("modalConfirm");
        let mensajeConfirm = document.getElementById("mensajeConfirm");
        let btnConfirmar = document.getElementById("btnConfirmar");
        let btnCancelar = document.getElementById("btnCancelar");

        mensajeConfirm.textContent = mensaje;

        modal.classList.remove("hidden");
        setTimeout(() => modal.classList.remove("opacity-0"), 10);

        // Confirmar
        btnConfirmar.onclick = () => {
            cerrar();
            resolve(true);
        };

        // Cancelar
        btnCancelar.onclick = () => {
            cerrar();
            resolve(false);
        };

        function cerrar() {
            modal.classList.add("opacity-0");
            setTimeout(() => modal.classList.add("hidden"), 300);
        }
    });
}