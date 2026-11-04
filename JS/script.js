document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. NAVEGACIÓN Y COLORES DE NAVEGADOR
    // ==========================================
    const enlaces = document.querySelectorAll(".navbar__link, .navbar__brand");
    const secciones = document.querySelectorAll("section[id]");
    const siteHeader = document.querySelector(".site-header");
    const heroSection = document.querySelector(".hero");
    const themeColorMeta = document.getElementById("theme-color-meta");

    function actualizarNavbar() {
        // 1. SI ESTAMOS EN UNA SUBPÁGINA (Sin sección Hero)
        if (!heroSection) {
            if (siteHeader) siteHeader.classList.add("navbar--oscuro");
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#D9D9D9");
            document.documentElement.style.backgroundColor = "#D9D9D9";
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

        // Marcar enlace activo
        enlaces.forEach(enlace => {
            enlace.classList.toggle(
                "activo",
                enlace.getAttribute("href") === `#${seccionActiva}`
            );
        });

        // CAMBIO DINÁMICO DE COLOR (Navbar + Theme-Color del Navegador)
        if (seccionActiva === "sobre-mi" || seccionActiva === "trabajos") {
            // SECCIONES CLARAS (Color Hueso)
            siteHeader.classList.add("navbar--oscuro");
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#D9D9D9");
            document.documentElement.style.backgroundColor = "#D9D9D9";
        } else {
            // SECCIONES OSCURAS (Color Negro Vino: Hero e Inicio/Contacto)
            siteHeader.classList.remove("navbar--oscuro");
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#100103");
            document.documentElement.style.backgroundColor = "#100103";
        }
    }

    window.addEventListener("scroll", actualizarNavbar);
    actualizarNavbar();

    // ==========================================
    // 2. PRELOADER GLOBAL (4 SVG / Mínimo 2s / Una vez por sesión)
    // ==========================================
    const icons = document.querySelectorAll(".preloader__icon");
    const preloader = document.getElementById("preloader");
    let currentIndex = 0;

    // Si ya se mostró el preloader en esta sesión, lo oculta directo
    if (sessionStorage.getItem("portfolio_preloader_shown")) {
        if (preloader) {
            preloader.style.display = "none";
        }
        return;
    }

    // 1. Animación de rotación e intercambio de SVG cada 500ms
    let iconInterval;
    if (icons.length > 0) {
        iconInterval = setInterval(() => {
            icons[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % icons.length;
            icons[currentIndex].classList.add("active");
        }, 500);
    }

    // 2. Promesa para forzar un tiempo mínimo de 2000ms (2 segundos)
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Promesa que espera a que la ventana descargue TODOS los assets locales
    const pageLoadPromise = new Promise(resolve => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            window.addEventListener("load", resolve, { once: true });
        }
    });

    // 4. Se ejecuta SOLO cuando AMBAS condiciones se cumplen
    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
        if (preloader) {
            preloader.classList.add("preloader--hidden");
            if (iconInterval) clearInterval(iconInterval); // Detiene el intervalo al ocultar
            sessionStorage.setItem("portfolio_preloader_shown", "true"); // Guarda en la sesión
        }
    });
});