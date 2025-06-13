// Navegación suave al hacer clic en los enlaces del menú
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('header nav a');
    
    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }
    
    // También para el botón de agenda tu cita en la sección hero
    const ctaButton = document.querySelector('.hero .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', smoothScroll);
    }
});

function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Validación del formulario
function validateForm() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fechaCita = document.getElementById('fecha_cita').value;
    const horaCita = document.getElementById('hora_cita').value;
    
    if (nombre.trim() === '') {
        alert('Por favor, ingresa tu nombre completo');
        return false;
    }
    
    if (telefono.trim() === '') {
        alert('Por favor, ingresa tu número de teléfono');
        return false;
    }
    
    if (email.trim() === '') {
        alert('Por favor, ingresa tu correo electrónico');
        return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return false;
    }
    
    if (fechaCita.trim() === '') {
        alert('Por favor, selecciona una fecha para tu cita');
        return false;
    }
    
    if (horaCita.trim() === '') {
        alert('Por favor, selecciona una hora para tu cita');
        return false;
    }
    
    // Aquí normalmente enviarías el formulario a un servidor
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    return true; // Prevenir el envío del formulario para esta demostración
}

// Funcionalidad del Carrusel de Casos Clínicos
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Crear indicadores
    function createIndicators() {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Actualizar indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Ir a una diapositiva específica
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        updateIndicators();
    }
    
    // Siguiente diapositiva
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Diapositiva anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play del carrusel
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play al hacer hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Soporte para gestos táctiles (móvil)
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Inicializar
    createIndicators();
});

