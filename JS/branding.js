document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       CARRUSELES AUTOMÁTICOS CON PUNTOS
    ================================= */

    const carruseles = document.querySelectorAll(".branding__carrusel");

    carruseles.forEach(carrusel => {
        const imagenes = Array.from(carrusel.querySelectorAll(".branding__carrusel-imagenes img"));
        const puntos = Array.from(carrusel.querySelectorAll(".branding__punto"));

        let indiceActual = 0;
        let temporizador = null;

        if (imagenes.length === 0) return;

        // Función para sincronizar la clase activa en los puntos
        function actualizarPuntos(nuevoIndice) {
            puntos.forEach((punto, idx) => {
                punto.classList.toggle("branding__punto--activo", idx === nuevoIndice);
            });
        }

        // Si solo hay una imagen, mostrarla fija y omitir carrusel
        if (imagenes.length === 1) {
            imagenes[0].classList.add("activa");
            imagenes[0].style.visibility = "visible";
            return;
        }

        // Configuración inicial de imágenes
        imagenes.forEach((imagen, indice) => {
            imagen.classList.remove("activa", "saliendo");
            imagen.style.transition = "none";
            imagen.style.transform = indice === 0 ? "translateX(0)" : "translateX(100%)";
            imagen.style.zIndex = indice === 0 ? "2" : "0";
            imagen.style.visibility = indice === 0 ? "visible" : "hidden";
        });

        imagenes[0].classList.add("activa");
        actualizarPuntos(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                imagenes.forEach(imagen => {
                    imagen.style.transition = "";
                });
            });
        });

        // Transición de cambio de imagen
        function irASlide(siguienteIndice) {
            if (siguienteIndice === indiceActual) return;

            const actual = imagenes[indiceActual];
            const siguiente = imagenes[siguienteIndice];

            siguiente.style.transition = "none";
            siguiente.style.transform = "translateX(100%)";
            siguiente.style.zIndex = "3";
            siguiente.style.visibility = "visible";

            siguiente.offsetHeight; // Forzar reflow

            siguiente.style.transition = "";
            actual.style.transition = "";

            siguiente.style.transform = "translateX(0)";
            actual.style.transform = "translateX(-100%)";

            actualizarPuntos(siguienteIndice);

            setTimeout(() => {
                actual.classList.remove("activa");
                actual.style.transition = "none";
                actual.style.transform = "translateX(100%)";
                actual.style.zIndex = "0";
                actual.style.visibility = "hidden";

                siguiente.classList.add("activa");
                siguiente.style.zIndex = "2";
                siguiente.style.visibility = "visible";

                indiceActual = siguienteIndice;
            }, 400);
        }

        // Iniciar temporizador automático
        function iniciarAutoplay() {
            temporizador = setInterval(() => {
                const siguienteIndice = (indiceActual + 1) % imagenes.length;
                irASlide(siguienteIndice);
            }, 2200);
        }

        iniciarAutoplay();

        // Evento de clic en cada circulito/indicador
        puntos.forEach((punto, idx) => {
            punto.addEventListener("click", () => {
                clearInterval(temporizador);
                irASlide(idx);
                iniciarAutoplay();
            });
        });
    });

});
