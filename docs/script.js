document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. ANIMACIÓN DE APARICIÓN (ScrollReveal)
    // ==========================================
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

    // ==========================================
    // 2. FICHAS INTERACTIVAS (Sliders Laterales)
    // ==========================================
    const fichas = document.querySelectorAll('.ficha-interactiva');
    
    fichas.forEach(ficha => {
        const slides = ficha.querySelectorAll('.slide');
        const btnNext = ficha.querySelector('.next');
        const btnPrev = ficha.querySelector('.prev');
        let indexActual = 0;

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
    });

    // ==========================================
    // 3. MENÚ CONTRAÍBLE Y LOGO FLOTANTE
    // ==========================================
    let lastScrollTop = 0;
    const navbar = document.getElementById('menu-superior');
    const logoFlotante = document.getElementById('logo-flotante');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si el usuario scrollea hacia ABAJO (y no está en el tope de la página)
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            navbar.style.transform = 'translateY(-100%)'; // Oculta el menú superior
            logoFlotante.style.opacity = '1';            // Muestra el logo lateral
        } 
        // Si el usuario scrollea hacia ARRIBA
        else if (scrollTop < lastScrollTop) {
            navbar.style.transform = 'translateY(0)';     // Muestra el menú superior
            logoFlotante.style.opacity = '0';            // Oculta el logo lateral
        }
        
        // Prevención: Si está arriba del todo, asegura el estado inicial
        if (scrollTop <= 50) {
            navbar.style.transform = 'translateY(0)';
            logoFlotante.style.opacity = '0';
        }
        
        lastScrollTop = scrollTop;
    });

});