// Base de datos de productos
const PRODUCTS_DATA = [
    // Cerámicas
    {
        id: 1,
        name: "Cerámica Porcelanato Mármol Carrara 60x60",
        category: "ceramicas",
        price: 12990,
        description: "Cerámica porcelanato esmaltado con diseño mármol Carrara. Ideal para pisos y muros interiores.",
        image: "🏺",
        stock: {
            metropolitana: { quantity: 150, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 80, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 45, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 25, warehouse: "Bodega Antofagasta" }
        }
    },
    {
        id: 2,
        name: "Cerámica Gres Rústico 30x30",
        category: "ceramicas",
        price: 8990,
        description: "Cerámica gres antideslizante perfecta para exteriores y áreas húmedas.",
        image: "🧱",
        stock: {
            metropolitana: { quantity: 200, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 120, warehouse: "Bodega Viña del Mar" },
            maule: { quantity: 60, warehouse: "Bodega Talca" },
            biobio: { quantity: 90, warehouse: "Bodega Concepción" }
        }
    },
    {
        id: 3,
        name: "Cerámica Subway Blanco 7.5x15",
        category: "ceramicas",
        price: 4990,
        description: "Clásica cerámica tipo subway para revestimientos de cocinas y baños.",
        image: "⬜",
        stock: {
            metropolitana: { quantity: 300, warehouse: "Bodega Santiago Norte" },
            valparaiso: { quantity: 180, warehouse: "Bodega Valparaíso" },
            ohiggins: { quantity: 70, warehouse: "Bodega Rancagua" }
        }
    },

    // Cemento
    {
        id: 4,
        name: "Cemento Polpaico Especial 25kg",
        category: "cemento",
        price: 6490,
        description: "Cemento de alta resistencia para construcción general y obras estructurales.",
        image: "🏗️",
        stock: {
            metropolitana: { quantity: 500, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 300, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 250, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 180, warehouse: "Bodega Antofagasta" },
            maule: { quantity: 200, warehouse: "Bodega Talca" }
        }
    },
    {
        id: 5,
        name: "Cemento Melón Extra 25kg",
        category: "cemento",
        price: 6290,
        description: "Cemento portland puzolánico ideal para todo tipo de construcciones.",
        image: "🏭",
        stock: {
            metropolitana: { quantity: 400, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 280, warehouse: "Bodega Viña del Mar" },
            ohiggins: { quantity: 150, warehouse: "Bodega Rancagua" },
            maule: { quantity: 180, warehouse: "Bodega Talca" }
        }
    },
    {
        id: 6,
        name: "Cemento Blanco Polpaico 25kg",
        category: "cemento",
        price: 8990,
        description: "Cemento blanco especial para trabajos decorativos y acabados finos.",
        image: "⚪",
        stock: {
            metropolitana: { quantity: 80, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 45, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 30, warehouse: "Bodega Concepción" }
        }
    },

    // Pinturas
    {
        id: 7,
        name: "Pintura Látex Interior Sherwin Williams 1GL",
        category: "pinturas",
        price: 18990,
        description: "Pintura látex lavable de alta cobertura para interiores. Disponible en múltiples colores.",
        image: "🎨",
        stock: {
            metropolitana: { quantity: 120, warehouse: "Bodega Santiago Norte" },
            valparaiso: { quantity: 80, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 60, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 35, warehouse: "Bodega Antofagasta" }
        }
    },
    {
        id: 8,
        name: "Esmalte Sintético Tricolor 1/4GL",
        category: "pinturas",
        price: 12490,
        description: "Esmalte sintético brillante para maderas y metales, resistente a la intemperie.",
        image: "✨",
        stock: {
            metropolitana: { quantity: 90, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 65, warehouse: "Bodega Viña del Mar" },
            maule: { quantity: 40, warehouse: "Bodega Talca" },
            biobio: { quantity: 50, warehouse: "Bodega Concepción" }
        }
    },
    {
        id: 9,
        name: "Primer Anticorrosivo Rojo 1GL",
        category: "pinturas",
        price: 15990,
        description: "Primer anticorrosivo para protección de estructuras metálicas.",
        image: "🔴",
        stock: {
            metropolitana: { quantity: 70, warehouse: "Bodega Santiago Centro" },
            antofagasta: { quantity: 85, warehouse: "Bodega Antofagasta" },
            valparaiso: { quantity: 45, warehouse: "Bodega Valparaíso" }
        }
    },

    // Herramientas
    {
        id: 10,
        name: "Taladro Percutor Bosch 650W",
        category: "herramientas",
        price: 89990,
        description: "Taladro percutor profesional con mandril de 13mm y maletín incluido.",
        image: "🔧",
        stock: {
            metropolitana: { quantity: 25, warehouse: "Bodega Santiago Norte" },
            valparaiso: { quantity: 15, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 12, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 8, warehouse: "Bodega Antofagasta" }
        }
    },
    {
        id: 11,
        name: "Amoladora Angular Makita 4.5\"",
        category: "herramientas",
        price: 65990,
        description: "Amoladora angular de 4.5 pulgadas, 840W de potencia, ideal para corte y desbaste.",
        image: "⚙️",
        stock: {
            metropolitana: { quantity: 30, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 18, warehouse: "Bodega Viña del Mar" },
            biobio: { quantity: 20, warehouse: "Bodega Concepción" },
            maule: { quantity: 10, warehouse: "Bodega Talca" }
        }
    },
    {
        id: 12,
        name: "Nivel Láser Autonivelante Stanley",
        category: "herramientas",
        price: 125990,
        description: "Nivel láser autonivelante con alcance de 15 metros y precisión ±3mm.",
        image: "📏",
        stock: {
            metropolitana: { quantity: 15, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 8, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 6, warehouse: "Bodega Concepción" }
        }
    },

    // Sanitarios
    {
        id: 13,
        name: "Inodoro One Piece Twyford Blanco",
        category: "sanitarios",
        price: 189990,
        description: "Inodoro de una pieza con descarga dual, incluye asiento y tapa con bisagras metálicas.",
        image: "🚽",
        stock: {
            metropolitana: { quantity: 40, warehouse: "Bodega Santiago Norte" },
            valparaiso: { quantity: 25, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 20, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 12, warehouse: "Bodega Antofagasta" }
        }
    },
    {
        id: 14,
        name: "Lavamanos Pedestal Fanaloza",
        category: "sanitarios",
        price: 79990,
        description: "Lavamanos con pedestal en loza blanca, incluye grifería monocomando.",
        image: "🚿",
        stock: {
            metropolitana: { quantity: 35, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 22, warehouse: "Bodega Viña del Mar" },
            maule: { quantity: 15, warehouse: "Bodega Talca" },
            biobio: { quantity: 18, warehouse: "Bodega Concepción" }
        }
    },
    {
        id: 15,
        name: "Ducha Telefónica Cromada FV",
        category: "sanitarios",
        price: 24990,
        description: "Ducha telefónica cromada con manguera flexible de 1.5m y soporte ajustable.",
        image: "🚿",
        stock: {
            metropolitana: { quantity: 80, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 50, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 35, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 20, warehouse: "Bodega Antofagasta" }
        }
    },

    // Electricidad
    {
        id: 16,
        name: "Cable Eléctrico 2.5mm THW Procobre",
        category: "electricidad",
        price: 890,
        description: "Cable eléctrico THW 2.5mm por metro lineal, certificado SEC.",
        image: "⚡",
        stock: {
            metropolitana: { quantity: 1000, warehouse: "Bodega Santiago Norte" },
            valparaiso: { quantity: 600, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 500, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 300, warehouse: "Bodega Antofagasta" },
            maule: { quantity: 400, warehouse: "Bodega Talca" }
        }
    },
    {
        id: 17,
        name: "Interruptor Simple Bticino Magic",
        category: "electricidad",
        price: 3990,
        description: "Interruptor simple 10A con placa incluida, color blanco.",
        image: "🔌",
        stock: {
            metropolitana: { quantity: 200, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 120, warehouse: "Bodega Viña del Mar" },
            biobio: { quantity: 100, warehouse: "Bodega Concepción" },
            maule: { quantity: 80, warehouse: "Bodega Talca" }
        }
    },
    {
        id: 18,
        name: "Tablero Eléctrico 12 Polos Schneider",
        category: "electricidad",
        price: 45990,
        description: "Tablero eléctrico metálico para 12 polos con puerta y cerradura.",
        image: "📦",
        stock: {
            metropolitana: { quantity: 30, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 18, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 15, warehouse: "Bodega Concepción" },
            antofagasta: { quantity: 10, warehouse: "Bodega Antofagasta" }
        }
    },

    // Productos adicionales para completar el catálogo
    {
        id: 19,
        name: "Adhesivo Cerámico Topex 25kg",
        category: "ceramicas",
        price: 8990,
        description: "Adhesivo cementoso para instalación de cerámicas en pisos y muros.",
        image: "🧪",
        stock: {
            metropolitana: { quantity: 180, warehouse: "Bodega Santiago Centro" },
            valparaiso: { quantity: 100, warehouse: "Bodega Valparaíso" },
            biobio: { quantity: 80, warehouse: "Bodega Concepción" }
        }
    },
    {
        id: 20,
        name: "Fragüe Topex Gris 5kg",
        category: "ceramicas",
        price: 4990,
        description: "Fragüe cementoso para juntas de cerámicas, resistente al agua.",
        image: "🔘",
        stock: {
            metropolitana: { quantity: 150, warehouse: "Bodega Santiago Sur" },
            valparaiso: { quantity: 90, warehouse: "Bodega Viña del Mar" },
            maule: { quantity: 60, warehouse: "Bodega Talca" }
        }
    }
];

// Función para obtener todos los productos
function getAllProducts() {
    return PRODUCTS_DATA;
}

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'all') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(product => product.category === category);
}

// Función para buscar productos
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return PRODUCTS_DATA.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// Función para obtener producto por ID
function getProductById(id) {
    return PRODUCTS_DATA.find(product => product.id === parseInt(id));
}

// Función para obtener stock por región
function getProductStock(productId, region) {
    const product = getProductById(productId);
    if (!product || !product.stock[region]) return null;
    return product.stock[region];
}

// Función para determinar el nivel de stock
function getStockLevel(quantity) {
    if (quantity > 100) return 'high';
    if (quantity > 20) return 'medium';
    return 'low';
}

// Hacer las funciones disponibles globalmente
window.ProductsData = {
    getAllProducts,
    getProductsByCategory,
    searchProducts,
    getProductById,
    getProductStock,
    getStockLevel
};