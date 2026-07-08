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

                // Lógica interactiva de Borrachito (Dato curioso según el botón de la ficha)
                const textoBoton = this.innerText.toLowerCase();
                if (textoBoton.includes("borrachito")) mostrarBorrachito("borrachito");
                else if (textoBoton.includes("chinchilla")) mostrarBorrachito("chinchilla");
                else if (textoBoton.includes("caracol")) mostrarBorrachito("caracol");
            }
        });
    });

    // Lógica para el carrusel de información dentro del acordeón
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

    // Diccionario de datos curiosos que leerá al interactuar con fichas o links
    const datosCuriosos = {
        "borrachito": "¡Jeje, ese soy yo! Te cuento un secreto: no puedo volar porque mis alas están atrofiadas. Así que ando a pie a todos lados, ¡lo que hace súper difícil colonizar nuevos territorios!",
        "chinchilla": "¡Qué envidia le tengo a su abrigo! La chinchilla costina tiene el pelaje más denso de los mamíferos terrestres. ¡De un solo folículo le brotan entre 50 y 80 pelitos! Perfecto para no congelarse en las rocas.",
        "caracol": "¡Este amiguito es una verdadera especie reliquia del pasado! Vive en quebradas armando su propio micro-ecosistema con la agüita dulce que saca de la camanchaca. ¡Un sobreviviente aislado por miles de años en pleno desierto!",
        "video_alsodes": "¡Oye! ¿No me crees lo del sapo con sostén de espinas? Haz clic en su nombre celeste para ver un video corto que lo demuestra.",
        "video_zorro": "¡Pst! Si haces clic en el nombre celeste del Zorro de Chiloé, te llevaré a un video genial para que lo veas en su hábitat natural.",
        "video_picaflor": "¡Una verdadera joya voladora! Dale clic al nombre celeste del Picaflor de Juan Fernández para ver un video de esta maravilla."
    };

    function mostrarBorrachito(clave) {
        if (!guiaBorrachito || !textoGlobo || !datosCuriosos[clave]) return;
        
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

    // ==========================================
    // 5. OBSERVAR LINKS PARA VIDEOS DE YOUTUBE
    // ==========================================
    const linksBorrachito = document.querySelectorAll('.link-video-borrachito');
    
    // Activa a Borrachito cuando el link de YouTube aparece en pantalla al scrollear
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerObj) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const especie = entry.target.getAttribute('data-especie');
                    mostrarBorrachito("video_" + especie);
                    
                    // Dejar de observar para que no salte cada vez que el usuario suba y baje mil veces
                    observerObj.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.5 }); // Se activa cuando al menos el 50% del link es visible en pantalla

        linksBorrachito.forEach(link => {
            observer.observe(link);
        });
    }
    
    // También activa a Borrachito por si el usuario pasa el mouse por encima del enlace
    linksBorrachito.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const especie = this.getAttribute('data-especie');
            mostrarBorrachito("video_" + especie);
        });
    });

});