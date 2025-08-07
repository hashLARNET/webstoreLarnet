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

const products = [
    {
        id: 1,
        title: "Producto Ejemplo 1",
        price: 29.99,
        description: "Descripción breve del producto de ejemplo.",
        image: "https://via.placeholder.com/300x200?text=Producto+1"
    },
    {
        id: 2,
        title: "Producto Ejemplo 2",
        price: 39.99,
        description: "Descripción breve del producto de ejemplo.",
        image: "https://via.placeholder.com/300x200?text=Producto+2"
    },
    // Agrega más productos según necesites
];

// Función para renderizar productos
function renderProducts() {
    const container = document.getElementById('products-container');
    
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Función para añadir al carrito (simplificada)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Añadido al carrito: ${product.title}`);
        console.log('Producto añadido:', product);
        // Aquí podrías implementar lógica real del carrito
    }
}

// Llama a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // ... tu código existente ...
    renderProducts();
});

// Exportar funciones globales
window.App = {
    smoothScrollTo
};