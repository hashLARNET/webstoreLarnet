// Base de datos de bodegas por región
const WAREHOUSES_DATA = {
    arica: [
        { name: "Bodega Arica Centro", address: "Av. Santa María 1234, Arica", phone: "+56 58 234 5678" }
    ],
    tarapaca: [
        { name: "Bodega Iquique", address: "Av. Arturo Prat 567, Iquique", phone: "+56 57 345 6789" }
    ],
    antofagasta: [
        { name: "Bodega Antofagasta", address: "Av. Argentina 890, Antofagasta", phone: "+56 55 456 7890" },
        { name: "Bodega Calama", address: "Calle Ramírez 123, Calama", phone: "+56 55 567 8901" }
    ],
    atacama: [
        { name: "Bodega Copiapó", address: "Av. Copayapu 456, Copiapó", phone: "+56 52 678 9012" }
    ],
    coquimbo: [
        { name: "Bodega La Serena", address: "Av. Francisco de Aguirre 789, La Serena", phone: "+56 51 789 0123" },
        { name: "Bodega Coquimbo", address: "Av. Costanera 321, Coquimbo", phone: "+56 51 890 1234" }
    ],
    valparaiso: [
        { name: "Bodega Valparaíso", address: "Av. Argentina 1456, Valparaíso", phone: "+56 32 901 2345" },
        { name: "Bodega Viña del Mar", address: "Av. Libertad 789, Viña del Mar", phone: "+56 32 012 3456" },
        { name: "Bodega San Antonio", address: "Av. Centenario 234, San Antonio", phone: "+56 35 123 4567" }
    ],
    metropolitana: [
        { name: "Bodega Santiago Centro", address: "Av. Libertador Bernardo O'Higgins 1234, Santiago", phone: "+56 2 2234 5678" },
        { name: "Bodega Santiago Norte", address: "Av. Recoleta 567, Recoleta", phone: "+56 2 2345 6789" },
        { name: "Bodega Santiago Sur", address: "Av. Vicuña Mackenna 890, La Florida", phone: "+56 2 2456 7890" },
        { name: "Bodega Maipú", address: "Av. Pajaritos 1234, Maipú", phone: "+56 2 2567 8901" },
        { name: "Bodega Las Condes", address: "Av. Apoquindo 567, Las Condes", phone: "+56 2 2678 9012" }
    ],
    ohiggins: [
        { name: "Bodega Rancagua", address: "Av. Libertador Bernardo O'Higgins 789, Rancagua", phone: "+56 72 789 0123" },
        { name: "Bodega San Fernando", address: "Av. Manuel Rodríguez 321, San Fernando", phone: "+56 72 890 1234" }
    ],
    maule: [
        { name: "Bodega Talca", address: "Av. San Miguel 456, Talca", phone: "+56 71 901 2345" },
        { name: "Bodega Curicó", address: "Av. Manso de Velasco 123, Curicó", phone: "+56 75 012 3456" }
    ],
    nuble: [
        { name: "Bodega Chillán", address: "Av. Libertad 789, Chillán", phone: "+56 42 123 4567" }
    ],
    biobio: [
        { name: "Bodega Concepción", address: "Av. Paicaví 234, Concepción", phone: "+56 41 234 5678" },
        { name: "Bodega Los Ángeles", address: "Av. Ricardo Vicuña 567, Los Ángeles", phone: "+56 43 345 6789" },
        { name: "Bodega Talcahuano", address: "Av. Colón 890, Talcahuano", phone: "+56 41 456 7890" }
    ],
    araucania: [
        { name: "Bodega Temuco", address: "Av. Alemania 123, Temuco", phone: "+56 45 567 8901" },
        { name: "Bodega Villarrica", address: "Av. Pedro de Valdivia 456, Villarrica", phone: "+56 45 678 9012" }
    ],
    rios: [
        { name: "Bodega Valdivia", address: "Av. Ramón Picarte 789, Valdivia", phone: "+56 63 789 0123" }
    ],
    lagos: [
        { name: "Bodega Puerto Montt", address: "Av. Diego Portales 321, Puerto Montt", phone: "+56 65 890 1234" },
        { name: "Bodega Osorno", address: "Av. Juan Mackenna 654, Osorno", phone: "+56 64 901 2345" }
    ],
    aysen: [
        { name: "Bodega Coyhaique", address: "Av. Ogana 987, Coyhaique", phone: "+56 67 012 3456" }
    ],
    magallanes: [
        { name: "Bodega Punta Arenas", address: "Av. Colón 147, Punta Arenas", phone: "+56 61 123 4567" }
    ]
};

// Nombres de regiones para mostrar
const REGION_NAMES = {
    arica: "Arica y Parinacota",
    tarapaca: "Tarapacá",
    antofagasta: "Antofagasta",
    atacama: "Atacama",
    coquimbo: "Coquimbo",
    valparaiso: "Valparaíso",
    metropolitana: "Metropolitana",
    ohiggins: "O'Higgins",
    maule: "Maule",
    nuble: "Ñuble",
    biobio: "Biobío",
    araucania: "Araucanía",
    rios: "Los Ríos",
    lagos: "Los Lagos",
    aysen: "Aysén",
    magallanes: "Magallanes"
};

// Función para obtener bodegas por región
function getWarehousesByRegion(region) {
    return WAREHOUSES_DATA[region] || [];
}

// Función para obtener nombre de región
function getRegionName(regionCode) {
    return REGION_NAMES[regionCode] || regionCode;
}

// Función para obtener todas las regiones
function getAllRegions() {
    return Object.keys(REGION_NAMES).map(code => ({
        code,
        name: REGION_NAMES[code]
    }));
}

// Hacer las funciones disponibles globalmente
window.WarehousesData = {
    getWarehousesByRegion,
    getRegionName,
    getAllRegions,
    WAREHOUSES_DATA,
    REGION_NAMES
};