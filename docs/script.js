document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 0. PANTALLA DE INICIO
    // ==========================================
    const btnComenzar = document.getElementById('btn-comenzar');
    const pantallaInicio = document.getElementById('pantalla-inicio');

    if (btnComenzar && pantallaInicio) {
        btnComenzar.addEventListener('click', function() {
            pantallaInicio.classList.add('oculto');
            document.body.classList.remove('bloqueo-scroll');
        });
    }

    // ==========================================
    // 1. ANIMACIÓN DE APARICIÓN (ScrollReveal)
    // ==========================================
    ScrollReveal().reveal('.animar-seccion', {
        delay: 200,
        distance: '30px',
        duration: 800,
        easing: 'ease-in-out',
        origin: 'bottom'
    });

    ScrollReveal().reveal('.grafico-container', {
        delay: 300,
        distance: '20px',
        duration: 1000,
        origin: 'bottom'
    });

    ScrollReveal().reveal('.ficha-centrada', {
        delay: 300,
        distance: '20px',
        duration: 800,
        origin: 'bottom'
    });

    // ==========================================
    // 2. FICHAS INTERACTIVAS (Acordeón y Carrusel)
    // ==========================================
    var acordeones = document.querySelectorAll(".acordeon-btn");

    acordeones.forEach(function(btn) {
        btn.addEventListener("click", function() {
            this.classList.toggle("active");
           
            var panel = this.nextElementSibling;
            var icono = this.querySelector('.icono-acordeon');
           
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                if(icono) icono.textContent = '+'; 
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if(icono) icono.textContent = '-'; 

                // Lógica interactiva de Borrachito (Dato curioso según el botón)
                const textoBoton = this.innerText.toLowerCase();
                if (textoBoton.includes("borrachito")) mostrarBorrachito("borrachito");
                else if (textoBoton.includes("chinchilla")) mostrarBorrachito("chinchilla");
                else if (textoBoton.includes("pingüino")) mostrarBorrachito("pingüino");
                else if (textoBoton.includes("caracol")) mostrarBorrachito("caracol");
            }
        });
    });

    // Lógica para el carrusel de información
    const panelesFicha = document.querySelectorAll('.acordeon-panel');
    
    panelesFicha.forEach(panel => {
        const slides = panel.querySelectorAll('.slide');
        const btnNext = panel.querySelector('.next');
        const btnPrev = panel.querySelector('.prev');
        let indexActual = 0;

        if (slides.length > 0 && btnNext && btnPrev) {
            btnNext.addEventListener('click', () => {
                slides[indexActual].classList.remove('activa');
                indexActual = (indexActual + 1) % slides.length;
                slides[indexActual].classList.add('activa');
            });

            btnPrev.addEventListener('click', () => {
                slides[indexActual].classList.remove('activa');
                indexActual = (indexActual - 1 + slides.length) % slides.length;
                slides[indexActual].classList.add('activa');
            });
        }
    });

    // ==========================================
    // 3. MENÚ SUPERIOR CONTRAÍBLE AL SCROLLEAR
    // ==========================================
    const navbar = document.getElementById('menu-superior');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
       
        if (scrollTop > 80) {
            navbar.classList.add('contraida');
        } else {
            navbar.classList.remove('contraida');
        }
    });

    // ==========================================
    // 4. LÓGICA DE BORRACHITO FLOTANTE (GUÍA)
    // ==========================================
    const guiaBorrachito = document.getElementById('guia-borrachito-flotante');
    const textoGlobo = document.getElementById('texto-borrachito');
    const btnCerrarBorrachito = document.getElementById('cerrar-borrachito');
    let timeoutBorrachito;

    // Diccionario de datos curiosos que leerá al abrir los acordeones
    const datosCuriosos = {
        "borrachito": "¡Ese soy yo! Me llamo así porque bebo la savia fermentada de los árboles hasta caer rendido. ¡Salud!",
        "chinchilla": "La Chinchilla costina es súper famosa en internet como mascota, ¡pero en su hábitat natural está al borde de la extinción!",
        "pingüino": "¡El pingüino de Humboldt tiene el megáfono mediático! Se lleva toda la atención, mientras otras especies son ignoradas.",
        "caracol": "¡Un caracol que vive en el desierto! El Caracol de Paposo sobrevive solo tomando el agüita que deja la niebla costera. ¡Mágico!"
    };

    function mostrarBorrachito(clave) {
        if (!guiaBorrachito || !textoGlobo) return;
        
        textoGlobo.innerText = datosCuriosos[clave];
        guiaBorrachito.classList.add('asomar');
        
        clearTimeout(timeoutBorrachito);
        // Se oculta automáticamente después de 10 segundos
        timeoutBorrachito = setTimeout(() => {
            guiaBorrachito.classList.remove('asomar');
        }, 10000);
    }

    if (btnCerrarBorrachito) {
        btnCerrarBorrachito.addEventListener('click', () => {
            guiaBorrachito.classList.remove('asomar');
        });
    }

});