// Archivo principal de JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada correctamente');
    
    // Inicializar componentes
    Navigation.init();
    
    // Event listeners
    initEventListeners();
    
    // Mostrar mensaje de bienvenida
    showWelcomeMessage();
});

function initEventListeners() {
    const demoBtn = document.getElementById('demo-btn');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            alert('¡Demo button funcionando! 🎉');
            console.log('Demo button clicked');
        });
    }
}

function showWelcomeMessage() {
    const helpers = window.Helpers;
    if (helpers) {
        helpers.logMessage('Bienvenido al proyecto', 'success');
    }
}

// Función de utilidad para smooth scroll
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Exportar funciones globales
window.App = {
    smoothScrollTo
};