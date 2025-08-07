// productUtils.js - Funciones compartidas para productos

// Función para generar el JSON de productos
export function generateProductsJSON(productsArray, filename = 'products.json') {
    const productsData = {
        lastUpdated: new Date().toISOString(),
        totalProducts: productsArray.length,
        products: productsArray
    };
    return JSON.stringify(productsData, null, 2);
}

// Función para descargar el JSON
export function downloadProductsJSON(productsArray, filename = 'products-backup.json') {
    const jsonStr = generateProductsJSON(productsArray);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

// Función para convertir Form → Objeto Producto
export function formToProduct(formId) {
    const form = document.getElementById(formId);
    const data = new FormData(form);
    const product = {
        id: Date.now(), // ID único
        name: data.get('name'),
        price: parseFloat(data.get('price')),
        oldPrice: data.get('oldPrice') ? parseFloat(data.get('oldPrice')) : null,
        onSale: data.get('onSale') === 'on',
        image: data.get('image') || 'assets/images/default-product.jpg',
        stock: parseInt(data.get('stock')) || 0,
        category: data.get('category') || 'general'
    };
    
    return product;
}

// Función para validar un producto
export function validateProduct(product) {
    if (!product.name || product.name.length < 3) {
        return { valid: false, error: 'El nombre debe tener al menos 3 caracteres' };
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
        return { valid: false, error: 'El precio debe ser un número positivo' };
    }
    if (product.oldPrice && product.oldPrice <= product.price) {
        return { valid: false, error: 'El precio anterior debe ser mayor al actual' };
    }
    return { valid: true };
}