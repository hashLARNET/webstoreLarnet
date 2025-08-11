// Componente del carrito de compras
const Cart = {
    items: [],
    shippingCost: 0,

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateCartUI();
    },

    bindEvents() {
        // Botón del carrito
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCart());
        }

        // Cerrar carrito
        const closeCart = document.getElementById('close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.hideCart());
        }

        // Opciones de envío
        const shippingOptions = document.querySelectorAll('input[name="shipping"]');
        shippingOptions.forEach(option => {
            option.addEventListener('change', () => this.updateShipping());
        });

        // Botones del carrito
        const clearCart = document.getElementById('clear-cart');
        if (clearCart) {
            clearCart.addEventListener('click', () => this.clearCart());
        }

        const checkout = document.getElementById('checkout');
        if (checkout) {
            checkout.addEventListener('click', () => this.checkout());
        }
    },

    addItem(productId, quantity = 1) {
        const product = window.ProductsData.getProductById(productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showAddedMessage(product.name);
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartUI();
        this.renderCartItems();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartUI();
                this.renderCartItems();
            }
        }
    },

    clearCart() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.items = [];
            this.saveToStorage();
            this.updateCartUI();
            this.renderCartItems();
        }
    },

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'inline' : 'none';
        }
    },

    showCart() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            this.renderCartItems();
            this.updateShipping();
            window.Modal.show('cart-modal');
        }
    },

    hideCart() {
        window.Modal.hide('cart-modal');
    },

    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Tu carrito está vacío</p>
                    <p>¡Agrega algunos productos para comenzar!</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString('es-CL')}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="Cart.updateQuantity(${item.id}, parseInt(this.value))" min="1">
                    <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="Cart.removeItem(${item.id})" title="Eliminar">🗑️</button>
                </div>
            </div>
        `).join('');
    },

    updateShipping() {
        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        this.shippingCost = selectedShipping && selectedShipping.value === 'delivery' ? 15000 : 0;
        
        const subtotal = this.getTotal();
        const total = subtotal + this.shippingCost;

        const subtotalEl = document.getElementById('subtotal');
        const shippingCostEl = document.getElementById('shipping-cost');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        if (shippingCostEl) shippingCostEl.textContent = `$${this.shippingCost.toLocaleString('es-CL')}`;
        if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
    },

    checkout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        const selectedRegion = document.getElementById('region-selector').value;
        if (!selectedRegion) {
            alert('Por favor selecciona una región para continuar con la compra');
            return;
        }

        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        const shippingType = selectedShipping.value === 'delivery' ? 'Despacho a domicilio' : 'Retiro en bodega';
        
        const total = this.getTotal() + this.shippingCost;
        const itemCount = this.getItemCount();

        const message = `
¡Gracias por tu compra!

Resumen del pedido:
- ${itemCount} producto(s)
- Total: $${total.toLocaleString('es-CL')}
- Región: ${window.WarehousesData.getRegionName(selectedRegion)}
- Modalidad: ${shippingType}

En breve nos contactaremos contigo para coordinar la entrega.
        `;

        alert(message);
        
        // Limpiar carrito después de la compra
        this.clearCart();
        this.hideCart();
    },

    showAddedMessage(productName) {
        // Crear mensaje temporal
        const message = document.createElement('div');
        message.className = 'added-message';
        message.textContent = `✅ ${productName} agregado al carrito`;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(message);

        // Remover después de 3 segundos
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    },

    saveToStorage() {
        localStorage.setItem('constructo-cart', JSON.stringify(this.items));
    },

    loadFromStorage() {
        const saved = localStorage.getItem('constructo-cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }
};

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Hacer disponible globalmente
window.Cart = Cart;