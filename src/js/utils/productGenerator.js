const fs = require('fs'); // Solo para Node.js (backend)
const path = require('path');

// Función para generar/actualizar el JSON de productos
function generateProductsJSON(productsArray, filename = 'products.json') {
    const productsData = {
        lastUpdated: new Date().toISOString(),
        totalProducts: productsArray.length,
        products: productsArray
    };

    const jsonContent = JSON.stringify(productsData, null, 2);
    
    // En un entorno con Node.js (ej. si usas Express)
    if (typeof fs !== 'undefined') {
        const filePath = path.join(__dirname, '../../public/data', filename);
        fs.writeFileSync(filePath, jsonContent);
        console.log(`✅ JSON generado en: ${filePath}`);
    }
    
    return jsonContent; // Para usar en el frontend
}

// Ejemplo de uso:
const sampleProducts = [
    {
        id: 1,
        title: "Laptop Pro",
        price: 999.99,
        stock: 15,
        image: "assets/products/laptop.jpg"
    },
    {
        id: 2,
        title: "Mouse Inalámbrico",
        price: 29.99,
        stock: 40,
        image: "assets/products/mouse.jpg"
    }
];

// Descomenta para probar (en Node.js):
// generateProductsJSON(sampleProducts);