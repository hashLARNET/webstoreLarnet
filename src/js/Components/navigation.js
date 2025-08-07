// Componente de navegación
const Navigation = {
    init() {
        this.bindEvents();
        this.setActiveLink();
    },

    bindEvents() {
        const navLinks = document.querySelectorAll('.nav__menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Si es un enlace interno (hash)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    this.scrollToSection(targetId);
                    this.setActiveLink(link);
                }
            });
        });
    },

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    setActiveLink(activeLink = null) {
        const navLinks = document.querySelectorAll('.nav__menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
};

// Hacer disponible globalmente
window.Navigation = Navigation;