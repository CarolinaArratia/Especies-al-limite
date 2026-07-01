document.addEventListener("DOMContentLoaded", function() {
    
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
    // 2. FICHAS INTERACTIVAS (Acordeón)
    // ==========================================
    var acordeones = document.querySelectorAll(".acordeon-btn");

    acordeones.forEach(function(btn) {
        btn.addEventListener("click", function() {
            this.classList.toggle("active");
            
            var panel = this.nextElementSibling;
            var icono = this.querySelector('.icono-acordeon');
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                icono.textContent = '+';
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                icono.textContent = '-';
            }
        });
    });

    // ==========================================
    // 3. MENÚ SUPERIOR CONTRAÍBLE AL SCROLLEAR
    // ==========================================
    const navbar = document.getElementById('menu-superior');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si el usuario baja más de 80px, la barra se contrae
        if (scrollTop > 80) {
            navbar.classList.add('contraida');
        } else {
            // Si sube al tope, la barra vuelve a su tamaño normal
            navbar.classList.remove('contraida');
        }
    });

});