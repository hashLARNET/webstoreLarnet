// Componente de productos
const Products = {
    currentCategory: 'all',
    currentRegion: '',
    currentView: 'grid',
    searchQuery: '',

    init() {
        this.bindEvents();
        this.renderProducts();
    },

    bindEvents() {
        // Filtros de categoría
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentCategory = e.target.dataset.category;
                this.renderProducts();
            });
        });

        // Selector de región
        const regionSelector = document.getElementById('region-selector');
        if (regionSelector) {
            regionSelector.addEventListener('change', (e) => {
                this.currentRegion = e.target.value;
                this.renderProducts();
            });
        }

        // Búsqueda
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', window.Helpers.debounce((e) => {
                this.searchQuery = e.target.value;
                this.renderProducts();
            }, 300));

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchQuery = e.target.value;
                    this.renderProducts();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchQuery = searchInput.value;
                this.renderProducts();
            });
        }

        // Vista (grid/list)
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');

        if (gridView) {
            gridView.addEventListener('click', () => {
                this.setView('grid');
            });
        }

        if (listView) {
            listView.addEventListener('click', () => {
                this.setView('list');
            });
        }
    },

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    },

    setView(view) {
        this.currentView = view;
        const productsGrid = document.getElementById('products-grid');
        const gridBtn = document.getElementById('grid-view');
        const listBtn = document.getElementById('list-view');

        if (productsGrid) {
            productsGrid.className = view === 'list' ? 'products-grid list-view' : 'products-grid';
        }

        if (gridBtn && listBtn) {
            gridBtn.classList.toggle('active', view === 'grid');
            listBtn.classList.toggle('active', view === 'list');
        }
    },

    getFilteredProducts() {
        let products = window.ProductsData.getProductsByCategory(this.currentCategory);

        // Filtrar por búsqueda
        if (this.searchQuery.trim()) {
            products = window.ProductsData.searchProducts(this.searchQuery);
            if (this.currentCategory !== 'all') {
                products = products.filter(p => p.category === this.currentCategory);
            }
        }

        // Filtrar por región si está seleccionada
        if (this.currentRegion) {
            products = products.filter(product => product.stock[this.currentRegion]);
        }

        return products;
    },

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        const loading = document.getElementById('loading');
        
        if (!productsGrid) return;

        // Mostrar loading
        if (loading) {
            loading.classList.remove('hidden');
        }

        // Simular delay de carga
        setTimeout(() => {
            const products = this.getFilteredProducts();

            if (products.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-products">
                        <h3>No se encontraron productos</h3>
                        <p>Intenta cambiar los filtros o la búsqueda</p>
                    </div>
                `;
            } else {
                productsGrid.innerHTML = products.map(product => this.renderProductCard(product)).join('');
            }

            if (loading) {
                loading.classList.add('hidden');
            }
        }, 300);
    },

    renderProductCard(product) {
        const regionStock = this.currentRegion ? product.stock[this.currentRegion] : null;
        const stockInfo = this.getStockInfo(product, this.currentRegion);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toLocaleString('es-CL')}</div>
                    <p class="product-description">${product.description}</p>
                    
                    ${stockInfo.html}
                    
                    <div class="product-actions">
                        <button class="add-to-cart" 
                                onclick="Cart.addItem(${product.id})"
                                ${stockInfo.hasStock ? '' : 'disabled'}>
                            ${stockInfo.hasStock ? '🛒 Agregar' : 'Sin Stock'}
                        </button>
                        <button class="view-details" onclick="Products.showProductDetails(${product.id})">
                            👁️ Ver
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    getStockInfo(product, selectedRegion) {
        if (!selectedRegion) {
            const totalStock = Object.values(product.stock).reduce((sum, stock) => sum + stock.quantity, 0);
            const stockLevel = window.ProductsData.getStockLevel(totalStock);
            
            return {
                hasStock: totalStock > 0,
                html: `
                    <div class="product-stock">
                        <span class="stock-indicator ${stockLevel}"></span>
                        <span>Stock total: ${totalStock} unidades</span>
                    </div>
                    <div class="warehouse-info">
                        📍 Disponible en ${Object.keys(product.stock).length} regiones
                    </div>
                `
            };
        }

        const regionStock = product.stock[selectedRegion];
        if (!regionStock) {
            return {
                hasStock: false,
                html: `
                    <div class="product-stock">
                        <span class="stock-indicator low"></span>
                        <span>Sin stock en esta región</span>
                    </div>
                `
            };
        }

        const stockLevel = window.ProductsData.getStockLevel(regionStock.quantity);
        return {
            hasStock: regionStock.quantity > 0,
            html: `
                <div class="product-stock">
                    <span class="stock-indicator ${stockLevel}"></span>
                    <span>${regionStock.quantity} unidades disponibles</span>
                </div>
                <div class="warehouse-info">
                    📍 ${regionStock.warehouse}
                </div>
            `
        };
    },

    getCategoryName(category) {
        const names = {
            ceramicas: 'Cerámicas',
            cemento: 'Cemento',
            pinturas: 'Pinturas',
            herramientas: 'Herramientas',
            sanitarios: 'Sanitarios',
            electricidad: 'Electricidad'
        };
        return names[category] || category;
    },

    showProductDetails(productId) {
        const product = window.ProductsData.getProductById(productId);
        if (!product) return;

        const modalTitle = document.getElementById('product-modal-title');
        const modalContent = document.getElementById('product-modal-content');

        if (modalTitle) {
            modalTitle.textContent = product.name;
        }

        if (modalContent) {
            modalContent.innerHTML = `
                <div class="product-detail">
                    <div class="product-detail-image">${product.image}</div>
                    <div class="product-detail-info">
                        <h4>${this.getCategoryName(product.category)}</h4>
                        <div class="product-detail-price">$${product.price.toLocaleString('es-CL')}</div>
                        <div class="product-detail-description">${product.description}</div>
                        
                        <h4>Stock por Región:</h4>
                        <div class="warehouse-list">
                            ${Object.entries(product.stock).map(([region, stock]) => `
                                <div class="warehouse-item">
                                    <div>
                                        <div class="warehouse-name">${window.WarehousesData.getRegionName(region)}</div>
                                        <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">
                                            ${stock.warehouse}
                                        </div>
                                    </div>
                                    <div class="warehouse-stock">
                                        <span class="stock-indicator ${window.ProductsData.getStockLevel(stock.quantity)}"></span>
                                        ${stock.quantity} unidades
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="margin-top: var(--spacing-lg);">
                            <button class="btn btn--primary" onclick="Cart.addItem(${product.id}); window.Modal.hide('product-modal');">
                                🛒 Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        window.Modal.show('product-modal');
    }
};

// Hacer disponible globalmente
window.Products = Products;