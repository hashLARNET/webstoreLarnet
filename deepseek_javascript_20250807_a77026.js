// Utilidades y funciones helper
const Helpers = {
    // Log con colores
    logMessage(message, type = 'info') {
        const styles = {
            info: 'color: #17a2b8',
            success: 'color: #28a745',
            warning: 'color: #ffc107',
            error: 'color: #dc3545'
        };
        
        console.log(`%c${message}`, styles[type] || styles.info);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Formatear fecha
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Date(date).toLocaleDateString('es-ES', {
            ...defaultOptions,
            ...options
        });
    },

    // Validar email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Generar ID único
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};

// Hacer disponible globalmente
window.Helpers = Helpers;