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
    
    // Si estamos usando FormSubmit, permitimos que el formulario se envíe
    return true;
}
// Aquí normalmente enviarías el formulario a un servidor
alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    return true; // Prevenir el envío del formulario para esta demostración
