// Archivo principal de JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ ConstructoChile iniciado correctamente');
    
    // Inicializar componentes
    Modal.init();
    Cart.init();
    Products.init();
    
    // Mensaje de bienvenida
    if (window.Helpers) {
        window.Helpers.logMessage('¡Bienvenido a ConstructoChile! 🏗️', 'success');
    }
});