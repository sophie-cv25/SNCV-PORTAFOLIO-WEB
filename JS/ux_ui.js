document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. CONTROL Y FIJACIÓN DEL HERO (PORTADA)
    ========================================= */
    const heroSection = document.querySelector('.alasitas__seccion-portada');
    const heroImg = document.querySelector('.alasitas__portada-img');

    if (heroSection && heroImg) {
        // Limpiamos transforms o márgenes extraños inyectados por otros scripts
        heroImg.style.transform = '';
        heroImg.style.margin = '';
    }

    /* =========================================
       2. LÓGICA DE CARRUSELES EN UX / UI
    ========================================= */
    const carruseles = document.querySelectorAll(".alasitas__carrusel, .ux__carrusel");

    carruseles.forEach(carrusel => {
        // Seleccionamos tanto imágenes individuales como slides dobles
        const slides = Array.from(
            carrusel.querySelectorAll(".branding__carrusel-imagenes > img, .carrusel__slide-double")
        );
        const puntos = Array.from(carrusel.querySelectorAll(".branding__punto"));
        let indiceActual = 0;

        if (slides.length <= 1) return;

        function actualizarPuntos(nuevoIndice) {
            puntos.forEach((punto, idx) => {
                punto.classList.toggle("branding__punto--activo", idx === nuevoIndice);
            });
        }

        // Click en los puntos
        puntos.forEach((punto, idx) => {
            punto.addEventListener("click", () => {
                if (idx === indiceActual) return;
                cambiarSlide(idx);
            });
        });

        function cambiarSlide(siguienteIndice) {
            const actual = slides[indiceActual];
            const siguiente = slides[siguienteIndice];

            // Preparar el siguiente slide
            siguiente.style.transition = "none";
            siguiente.style.transform = "translateX(100%)";
            siguiente.style.zIndex = "3";
            siguiente.style.visibility = "visible";

            siguiente.offsetHeight; // Forzar reflow en el navegador

            // Animar transición
            siguiente.style.transition = "transform 0.7s ease-in-out";
            actual.style.transition = "transform 0.7s ease-in-out";

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

                indiceActual = siguienteIndice;
            }, 700);
        }

        // Temporizador automático
        setInterval(() => {
            const siguienteIndice = (indiceActual + 1) % slides.length;
            cambiarSlide(siguienteIndice);
        }, 3000);
    });
});