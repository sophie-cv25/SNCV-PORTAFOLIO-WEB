/* ========================================
   UKHU — LÓGICA DE INTERACTIVIDAD ADAPTATIVA
======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Carga diferida inteligente para el Iframe de Figma
    const figmaIframe = document.querySelector('.ukhu__phone iframe');
    
    if (figmaIframe && 'IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Cargar el iframe solo cuando la sección sea visible
                    const src = figmaIframe.getAttribute('src');
                    if (!src || src === 'about:blank') {
                        figmaIframe.setAttribute('src', figmaIframe.dataset.src);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        iframeObserver.observe(figmaIframe);
    }

    // 2. Feedback visual al tocar tarjetas de negocio en dispositivos táctiles
    const businessCards = document.querySelectorAll('.ukhu__business-card');
    
    businessCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.borderColor = 'var(--Fuccsia-intenso, #FF0051)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.borderColor = 'rgba(16, 1, 3, 0.2)';
            }, 300);
        }, { passive: true });
    });

});