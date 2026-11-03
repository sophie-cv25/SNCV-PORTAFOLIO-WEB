
document.querySelectorAll(".diseno3d__visual").forEach(galeria => {
    const slides = galeria.querySelectorAll(".diseno3d__slide");
    const puntos = galeria.querySelectorAll(".diseno3d__punto");
    const anterior = galeria.querySelector(".diseno3d__flecha--anterior");
    const siguiente = galeria.querySelector(".diseno3d__flecha--siguiente");

    let actual = 0;

    function mostrarSlide(indice) {
        slides[actual].classList.remove("diseno3d__slide--activo");
        puntos[actual]?.classList.remove("diseno3d__punto--activo");

        actual = (indice + slides.length) % slides.length;

        slides[actual].classList.add("diseno3d__slide--activo");
        puntos[actual]?.classList.add("diseno3d__punto--activo");
    }

    anterior?.addEventListener("click", () => {
        mostrarSlide(actual - 1);
    });

    siguiente?.addEventListener("click", () => {
        mostrarSlide(actual + 1);
    });

    puntos.forEach((punto, indice) => {
        punto.addEventListener("click", () => {
            mostrarSlide(indice);
        });
    });
});
