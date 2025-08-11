// Componente de modales
const Modal = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Cerrar modal al hacer clic en el fondo
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hide(e.target.id);
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.hide(openModal.id);
                }
            }
        });

        // Botones de cerrar
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hide(modal.id);
                }
            });
        });
    },

    show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            // Pequeño delay para la animación
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
        }
    },

    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
        }
    }
};

// Hacer disponible globalmente
window.Modal = Modal;