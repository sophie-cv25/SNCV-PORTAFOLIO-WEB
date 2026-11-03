document.addEventListener("DOMContentLoaded", () => {

    const enlaces = document.querySelectorAll(".navbar__link");

    const secciones = document.querySelectorAll("section[id]");

    function actualizarNavbar() {

        let seccionActiva = "";

        const puntoActivacion = window.innerHeight * 0.35;

        secciones.forEach(seccion => {

            const posicion = seccion.getBoundingClientRect();

            if (
                posicion.top <= puntoActivacion &&
                posicion.bottom > puntoActivacion
            ) {
                seccionActiva = seccion.id;
            }

        });

        enlaces.forEach(enlace => {

            enlace.classList.toggle(
                "activo",
                enlace.getAttribute("href") === `#${seccionActiva}`
            );

        });

    }

    window.addEventListener("scroll", actualizarNavbar);

    actualizarNavbar();

});