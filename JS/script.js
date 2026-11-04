document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll(".navbar__link, .navbar__brand");
    const secciones = document.querySelectorAll("section[id]");
    const siteHeader = document.querySelector(".site-header");
    const heroSection = document.querySelector(".hero");

    function actualizarNavbar() {
        // 1. SI ESTAMOS EN UNA PÁGINA SECUNDARIA (Sin sección Hero)
        if (!heroSection) {
            siteHeader.classList.add("navbar--oscuro");
            return;
        }

        // 2. SI ESTAMOS EN EL INDEX (Con sección Hero)
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

        // Marcar enlace activo según la sección visible
        enlaces.forEach(enlace => {
            enlace.classList.toggle(
                "activo",
                enlace.getAttribute("href") === `#${seccionActiva}`
            );
        });

        // En Hero (#inicio) o Contacto (#contacto) -> Navbar en color Hueso.
        // En Sobre Mí (#sobre-mi) o Trabajos (#trabajos) -> Navbar en color Negro Vino.
        if (seccionActiva === "sobre-mi" || seccionActiva === "trabajos") {
            siteHeader.classList.add("navbar--oscuro");
        } else {
            siteHeader.classList.remove("navbar--oscuro");
        }
    }

    window.addEventListener("scroll", actualizarNavbar);
    actualizarNavbar();
});