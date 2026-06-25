document.addEventListener("DOMContentLoaded", function() {
    // Configuración de la librería ScrollReveal
    ScrollReveal().reveal('.animar-seccion', { 
        delay: 200, 
        distance: '40px', 
        duration: 1000, 
        easing: 'ease-in-out',
        origin: 'bottom'
    });

    ScrollReveal().reveal('.grafico-container', { 
        delay: 400, 
        distance: '30px', 
        duration: 1200, 
        origin: 'left'
    });
});