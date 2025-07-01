// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a elementos del DOM ---
    const body = document.body;

    // Botones de la cabecera (ajustados para capturar cualquier ID común o específico)
    const cartBtn = document.querySelector('[id^="cart-btn"]'); // Busca ID que comience con 'cart-btn'
    const wishlistBtn = document.querySelector('[id^="wishlist-btn"]'); // Busca ID que comience con 'wishlist-btn'
    const userBtn = document.querySelector('[id^="user-btn"]'); // Busca ID que comience con 'user-btn'

    // Modales y sus botones de cierre
    const cartModal = document.getElementById('cart-modal');
    const wishlistModal = document.getElementById('wishlist-modal');
    const authModal = document.getElementById('auth-modal');
    const closeBtns = document.querySelectorAll('.modal .close-btn');

    // Secciones de Login/Registro
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Formularios (pueden no existir en todas las páginas, por eso la comprobación)
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const contactForm = document.getElementById('contact-form');
    const profileForm = document.getElementById('profile-form');
    const changePasswordForm = document.getElementById('change-password-form');

    // Contenido del Carrito y Wishlist
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const wishlistItemsContainer = document.getElementById('wishlist-items');

    // Menú de Usuario
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');


    // --- Estado Global (simulado) ---
    // En un proyecto real, esto vendría de un backend o una base de datos.
    let cart = JSON.parse(localStorage.getItem('essenceGlowCart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('essenceGlowWishlist')) || [];
    let currentUser = JSON.parse(localStorage.getItem('essenceGlowUser')) || null; // Simula usuario logueado

    // Array de productos disponibles (para simular el catálogo)
    // HE AÑADIDO MÁS DETALLES A LOS PRODUCTOS PARA LA PÁGINA DE DETALLE
    const products = [
        {
            id: 1,
            name: 'Serum Iluminador',
            price: 25.00,
            image: 'assets/images/serum3.png',
            category: 'skincare',
            description: 'Descubre los beneficios de nuestro Serum Iluminador, formulado con Vitamina C para revitalizar y unificar el tono de tu piel. Aporta un brillo natural y reduce las manchas oscuras. Ideal para todo tipo de piel.',
            brand: 'EssenceGlow',
            thumbnails: ['assets/images/serum3.png', 'assets/images/serum1.png', 'assets/images/serum2.png'], // Si tienes más imágenes
            reviews: [
                { author: 'Ana M.', date: '15 de Mayo, 2025', rating: 5, text: 'Mi piel se ve mucho más luminosa y uniforme.' },
                { author: 'Carlos R.', date: '01 de Junio, 2025', rating: 4, text: 'Textura ligera, me encanta el efecto. Un poco caro pero lo vale.' }
            ]
        },
        {
            id: 2,
            name: 'Mascarilla Hidratante',
            price: 30.00,
            image: 'assets/images/mascarilla.png',
            category: 'skincare',
            description: 'Mascarilla intensiva que hidrata profundamente y calma la piel. Enriquecida con ácido hialurónico y extractos botánicos para una piel suave y elástica. Perfecta para pieles secas o deshidratadas.',
            brand: 'EssenceGlow',
            thumbnails: ['assets/images/mascarilla.png', 'assets/images/mascarilla.png'],
            reviews: [
                { author: 'Sofía L.', date: '20 de Junio, 2025', rating: 5, text: 'Piel supersuave y fresca después de usarla. ¡Totalmente recomendada!' }
            ]
        },
        {
            id: 3,
            name: 'Limpiador Facial Suave',
            price: 18.00,
            image: 'assets/images/limpiador.png',
            category: 'skincare',
            description: 'Gel limpiador suave que elimina impurezas y maquillaje sin resecar la piel. Deja una sensación de limpieza y frescura. Apto para uso diario y para pieles sensibles.',
            brand: 'EssenceGlow',
            thumbnails: ['assets/images/limpiador.png', 'assets/images/limpiador.png'],
            reviews: []
        },
        {
            id: 4,
            name: 'Champú Fortalecedor',
            price: 22.00,
            image: 'assets/images/shampoo.png',
            category: 'haircare',
            description: 'Champú diseñado para fortalecer el cabello desde la raíz hasta las puntas. Reduce la rotura y promueve un crecimiento saludable. Con biotina y queratina para un cabello más resistente.',
            brand: 'EssenceGlow Hair',
            thumbnails: ['assets/images/shampoo.png', 'assets/images/shampoo.png'],
            reviews: []
        },
        {
            id: 5,
            name: 'Acondicionador Nutritivo',
            price: 20.00,
            image: 'assets/images/acondicionador.png',
            category: 'haircare',
            description: 'Acondicionador rico en aceites naturales que nutre e hidrata profundamente el cabello. Desenreda fácilmente y deja el cabello suave, brillante y manejable.',
            brand: 'EssenceGlow Hair',
            thumbnails: ['assets/images/acondicionador.png', 'assets/images/acondicionador.png'],
            reviews: []
        },
        {
            id: 6,
            name: 'Labial Mate Tono Rosa',
            price: 15.00,
            image: 'assets/images/labial.png',
            category: 'makeup',
            description: 'Labial mate de larga duración en un hermoso tono rosa. Fórmula cremosa que no reseca los labios y proporciona un color intenso con una sola pasada.',
            brand: 'EssenceGlow Makeup',
            thumbnails: ['assets/images/labial.png', 'assets/images/labial.png'],
            reviews: []
        },
        {
            id: 7,
            name: 'Base de Maquillaje Natural',
            price: 35.00,
            image: 'assets/images/base.png',
            category: 'makeup',
            description: 'Base de maquillaje ligera con cobertura media y acabado natural. Unifica el tono de la piel y disimula imperfecciones, dejando un aspecto fresco y radiante durante todo el día.',
            brand: 'EssenceGlow Makeup',
            thumbnails: ['assets/images/base.png', 'assets/images/base.png'],
            reviews: []
        },
        // Añade más productos aquí si es necesario
    ];


    // --- Funciones para Abrir/Cerrar Modales ---
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            body.classList.add('no-scroll'); // Evita el scroll del fondo
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            body.classList.remove('no-scroll');
        }
    }

    // Cierra todos los modales si haces clic fuera de ellos
    window.addEventListener('click', (event) => {
        if (cartModal && event.target === cartModal) closeModal(cartModal);
        if (wishlistModal && event.target === wishlistModal) closeModal(wishlistModal);
        if (authModal && event.target === authModal) closeModal(authModal);

        // Cierra el menú de usuario si está abierto y se hace clic fuera de él y de su botón
        if (userMenu && currentUser && userBtn && !userBtn.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.style.display = 'none';
        }
    });

    // Cierra modales con los botones de cierre
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            closeModal(event.target.closest('.modal'));
        });
    });

    // --- Lógica del Carrito de Compras ---
    function saveCart() {
        localStorage.setItem('essenceGlowCart', JSON.stringify(cart));
    }

    function renderCart() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío.</p>';
            cartTotalSpan.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-image">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p>Precio: $${product.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                </div>
                <span class="item-price">$${(product.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += product.price * item.quantity;
        });
        if (cartTotalSpan) {
            cartTotalSpan.textContent = `$${total.toFixed(2)}`;
        }
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        saveCart();
        renderCart();
        if (cartModal) openModal(cartModal); // Abre el modal del carrito automáticamente
        alert('Producto añadido al carrito!'); // Feedback visual simple
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
    }

    function updateCartQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity); // Asegura que la cantidad sea al menos 1
            saveCart();
            renderCart();
        }
    }

    // Delegación de eventos para botones del carrito
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const productId = parseInt(target.dataset.id);

            if (target.classList.contains('plus-btn')) {
                const input = target.previousElementSibling;
                updateCartQuantity(productId, parseInt(input.value) + 1);
            } else if (target.classList.contains('minus-btn')) {
                const input = target.nextElementSibling;
                updateCartQuantity(productId, parseInt(input.value) - 1);
            } else if (target.classList.contains('remove-item-btn') || target.closest('.remove-item-btn')) {
                removeFromCart(productId);
            }
        });

        cartItemsContainer.addEventListener('change', (event) => {
            const target = event.target;
            if (target.classList.contains('quantity-input')) {
                const productId = parseInt(target.dataset.id);
                updateCartQuantity(productId, parseInt(target.value));
            }
        });
    }

    // --- Lógica de la Wishlist ---
    function saveWishlist() {
        localStorage.setItem('essenceGlowWishlist', JSON.stringify(wishlist));
    }

    function renderWishlist() {
        if (!wishlistItemsContainer) return;
        wishlistItemsContainer.innerHTML = '';

        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="empty-message">Tu wishlist está vacía.</p>';
            return;
        }

        wishlist.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            const itemElement = document.createElement('div');
            itemElement.classList.add('wishlist-item');
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-image">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p>Precio: $${product.price.toFixed(2)}</p>
                </div>
                <button class="btn primary-btn add-to-cart-from-wishlist-btn" data-id="${item.id}">Añadir al Carrito</button>
                <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            wishlistItemsContainer.appendChild(itemElement);
        });
    }

    function addToWishlist(productId) {
        if (!wishlist.some(item => item.id === productId)) {
            wishlist.push({ id: productId });
            saveWishlist();
            renderWishlist();
            alert('Producto añadido a la Wishlist!');
        } else {
            alert('Este producto ya está en tu Wishlist.');
        }
    }

    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        saveWishlist();
        renderWishlist();
    }

    // Delegación de eventos para botones de la wishlist
    if (wishlistItemsContainer) {
        wishlistItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const productId = parseInt(target.dataset.id);

            if (target.classList.contains('add-to-cart-from-wishlist-btn') || target.closest('.add-to-cart-from-wishlist-btn')) {
                addToCart(productId);
                removeFromWishlist(productId); // Opcional: remover de wishlist al añadir al carrito
            } else if (target.classList.contains('remove-item-btn') || target.closest('.remove-item-btn')) {
                removeFromWishlist(productId);
            }
        });
    }

    // --- Lógica de Usuario (Login/Registro) ---
    function saveUser(user) {
        localStorage.setItem('essenceGlowUser', JSON.stringify(user));
        currentUser = user;
        updateUserUI(); // Actualiza la UI cuando el usuario cambia
    }

    function removeUser() {
        localStorage.removeItem('essenceGlowUser');
        currentUser = null;
        updateUserUI();
    }

    function updateUserUI() {
        if (userBtn) {
            const userIcon = userBtn.querySelector('i');
            if (userIcon) {
                if (currentUser) {
                    userIcon.classList.remove('fa-user');
                    userIcon.classList.add('fa-user-circle');
                } else {
                    userIcon.classList.remove('fa-user-circle');
                    userIcon.classList.add('fa-user');
                }
            }
        }
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }

    // Manejar el botón de usuario
    if (userBtn) {
        userBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (currentUser) {
                if (userMenu) {
                    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
                }
            } else {
                openModal(authModal);
                if (loginSection && registerSection) {
                    loginSection.style.display = 'block';
                    registerSection.style.display = 'none';
                }
            }
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginSection && registerSection) {
                loginSection.style.display = 'none';
                registerSection.style.display = 'block';
            }
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginSection && registerSection) {
                loginSection.style.display = 'block';
                registerSection.style.display = 'none';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('#login-email').value;
            const password = e.target.querySelector('#login-password').value;

            if (email === 'test@example.com' && password === 'password123') {
                saveUser({ email: email, name: 'Usuario Test' });
                closeModal(authModal);
                alert('¡Inicio de sesión exitoso!');
            } else {
                alert('Credenciales incorrectas. Inténtalo de nuevo.');
            }
            e.target.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = e.target.querySelector('#register-name').value;
            const email = e.target.querySelector('#register-email').value;
            const password = e.target.querySelector('#register-password').value;
            const confirmPassword = e.target.querySelector('#register-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            console.log(`Nuevo usuario: ${name}, ${email}`);
            saveUser({ email: email, name: name });
            closeModal(authModal);
            alert('¡Registro exitoso! Has iniciado sesión.');
            e.target.reset();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            removeUser();
            if (userMenu) {
                userMenu.style.display = 'none';
            }
            alert('Has cerrado sesión.');
        });
    }

    // --- Funcionalidades Comunes ---

    if (cartBtn) cartBtn.addEventListener('click', () => { renderCart(); openModal(cartModal); });
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => { renderWishlist(); openModal(wishlistModal); });

    // Botones para añadir al carrito/wishlist en los productos (Delegación para elementos dinámicos)
    // Estos eventos deberían adjuntarse a un contenedor padre estático, o re-adjuntarse cada vez que los productos se renderizan.
    // Para la página de shop, el renderShopProducts ya lo maneja.
    // Para la página de detalle, los botones ya están en el DOM al cargar.
    const addProductToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addProductToCartBtns.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            addToCart(productId);
        });
    });

    const addProductToWishlistBtns = document.querySelectorAll('.add-to-wishlist-btn');
    addProductToWishlistBtns.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            addToWishlist(productId);
        });
    });

    // --- Funciones para la página de PERFIL (profile.html) ---
    if (profileForm) {
        if (currentUser) {
            document.getElementById('profile-name').value = currentUser.name || '';
            document.getElementById('profile-email').value = currentUser.email || '';
        } else {
            alert('Debes iniciar sesión para ver tu perfil.');
            window.location.href = 'index.html';
        }

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = e.target.querySelector('#profile-name').value;
            if (currentUser) {
                currentUser.name = newName;
                saveUser(currentUser);
                alert('Información del perfil actualizada.');
            }
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = e.target.querySelector('#current-password').value;
            const newPassword = e.target.querySelector('#new-password').value;
            const confirmNewPassword = e.target.querySelector('#confirm-new-password').value;

            if (newPassword !== confirmNewPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (currentUser && currentPassword === 'password123') {
                alert('Contraseña actualizada con éxito (simulado).');
                e.target.reset();
            } else {
                alert('Contraseña actual incorrecta.');
            }
        });
    }

    // --- Lógica para la página de TIENDA (shop.html) ---
    const productListContainer = document.getElementById('product-list');
    if (productListContainer) { // Solo si estamos en la página de tienda
        const searchBar = document.getElementById('search-bar');
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');

        function renderShopProducts() {
            productListContainer.innerHTML = '';
            let filteredProducts = [...products];

            const searchTerm = searchBar.value.toLowerCase();
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(searchTerm)
                );
            }

            const selectedCategory = categoryFilter.value;
            if (selectedCategory !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
            }

            const selectedPriceOrder = priceFilter.value;
            if (selectedPriceOrder === 'low-to-high') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (selectedPriceOrder === 'high-to-low') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            if (filteredProducts.length === 0) {
                productListContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No se encontraron productos con los filtros seleccionados.</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <a href="product-detail.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" class="product-image"></a>
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn add-to-cart-btn" data-product-id="${product.id}">Añadir al Carrito</button>
                    <button class="btn add-to-wishlist-btn" data-product-id="${product.id}"><i class="far fa-heart"></i></button>
                `;
                productListContainer.appendChild(productCard);
            });

            // Volver a adjuntar eventos a los botones de los productos recién renderizados
            const newAddToCartBtns = productListContainer.querySelectorAll('.add-to-cart-btn');
            newAddToCartBtns.forEach(button => {
                button.addEventListener('click', handleProductButtonClick);
            });
            const newAddToWishlistBtns = productListContainer.querySelectorAll('.add-to-wishlist-btn');
            newAddToWishlistBtns.forEach(button => {
                button.addEventListener('click', handleProductButtonClick);
            });
        }

        function handleProductButtonClick(event) {
            const button = event.target.closest('.btn');
            if (!button) return;

            const productId = parseInt(button.dataset.productId);
            if (button.classList.contains('add-to-cart-btn')) {
                addToCart(productId);
            } else if (button.classList.contains('add-to-wishlist-btn')) {
                addToWishlist(productId);
            }
        }

        searchBar.addEventListener('input', renderShopProducts);
        categoryFilter.addEventListener('change', renderShopProducts);
        priceFilter.addEventListener('change', renderShopProducts);

        renderShopProducts(); // Llamada inicial al cargar la página
    }


    // --- Lógica para la página de DETALLE DEL PRODUCTO (product-detail.html) ---
    // Asegurarse de que el script se ejecuta solo en product-detail.html
    if (window.location.pathname.includes('product-detail.html')) {
        console.log("Lógica de detalle de producto activada."); // Para depuración

        const productDetailSection = document.querySelector('.product-detail-section'); // La sección principal
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id')); // Convertir a número para que coincida con los IDs del array 'products'
        const product = products.find(p => p.id === productId); // Buscar por ID NUMÉRICO

        if (product) {
            console.log("Producto encontrado:", product); // Para depuración

            // Rellenar elementos de la página
            const mainProductImageElem = document.getElementById('main-product-image');
            const productNameElem = document.getElementById('product-name');
            const productPriceElem = document.getElementById('product-detail-price');
            const productDescElem = document.getElementById('product-description');
            const productCategoryElem = document.getElementById('product-category'); // Asegúrate de tener este span en tu HTML
            const productBrandElem = document.getElementById('product-brand'); // Asegúrate de tener este span en tu HTML
            const thumbnailImagesContainer = document.querySelector('.thumbnail-images');
            const productReviewsContainer = document.querySelector('.product-reviews');

            if (mainProductImageElem) {
                mainProductImageElem.src = product.image; // Usar product.image directamente
                mainProductImageElem.alt = product.name;
            }
            if (productNameElem) productNameElem.textContent = product.name;
            if (productPriceElem) productPriceElem.textContent = `$${product.price.toFixed(2)}`;
            if (productDescElem) productDescElem.textContent = product.description;
            if (productCategoryElem) productCategoryElem.textContent = product.category;
            if (productBrandElem) productBrandElem.textContent = product.brand;

            // Miniaturas (si existen)
            if (thumbnailImagesContainer && product.thumbnails && product.thumbnails.length > 0) {
                thumbnailImagesContainer.innerHTML = ''; // Limpiar las placeholders existentes
                product.thumbnails.forEach((thumbSrc, index) => {
                    const img = document.createElement('img');
                    img.src = thumbSrc;
                    img.alt = `Miniatura de ${product.name} ${index + 1}`;
                    img.addEventListener('click', () => {
                        if (mainProductImageElem) mainProductImageElem.src = thumbSrc;
                        // Eliminar clase 'active' de todas las miniaturas y añadirla a la actual
                        thumbnailImagesContainer.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                        img.classList.add('active');
                    });
                    thumbnailImagesContainer.appendChild(img);
                });
                // Establecer la primera miniatura como activa por defecto
                if (thumbnailImagesContainer.firstElementChild) {
                    thumbnailImagesContainer.firstElementChild.classList.add('active');
                }
            } else if (thumbnailImagesContainer) {
                 // Si no hay miniaturas definidas en el producto, simplemente oculta el contenedor
                thumbnailImagesContainer.style.display = 'none';
            }

            // Reseñas
            if (productReviewsContainer) {
                productReviewsContainer.innerHTML = '<h3>Opiniones de Clientes</h3>'; // Limpiar y añadir título
                if (product.reviews && product.reviews.length > 0) {
                    product.reviews.forEach(review => {
                        const reviewItem = document.createElement('div');
                        reviewItem.classList.add('review-item');
                        reviewItem.innerHTML = `
                            <h4>${review.text.length > 50 ? review.text.substring(0, 50) + '...' : review.text}</h4>
                            <p class="rating">${'&#9733;'.repeat(review.rating)}${'&#9734;'.repeat(5 - review.rating)}</p>
                            <p>${review.text}</p>
                            <small>Por ${review.author} el ${review.date}</small>
                        `;
                        productReviewsContainer.appendChild(reviewItem);
                    });
                } else {
                    productReviewsContainer.innerHTML += '<p>Aún no hay reseñas para este producto.</p>';
                }
            }

            // Actualizar botones de añadir al carrito/wishlist con el ID correcto
            const detailAddToCartBtn = document.querySelector('.product-detail-info .add-to-cart-btn');
            const detailAddToWishlistBtn = document.querySelector('.product-detail-info .add-to-wishlist-btn');

            if (detailAddToCartBtn) {
                detailAddToCartBtn.dataset.productId = product.id;
                detailAddToCartBtn.addEventListener('click', () => addToCart(product.id));
            }
            if (detailAddToWishlistBtn) {
                detailAddToWishlistBtn.dataset.productId = product.id;
                detailAddToWishlistBtn.addEventListener('click', () => addToWishlist(product.id));
            }

            // Asegurarse de que la sección de detalles del producto sea visible
            if (productDetailSection) productDetailSection.style.display = 'grid'; // O el display original que uses para esa sección

        } else {
            console.log("Producto no encontrado."); // Para depuración
            // Ocultar la sección de detalles y mostrar un mensaje de "no encontrado"
            if (productDetailSection) productDetailSection.style.display = 'none';

            let notFoundDiv = document.getElementById('product-not-found-container');
            if (!notFoundDiv) {
                notFoundDiv = document.createElement('div');
                notFoundDiv.id = 'product-not-found-container';
                notFoundDiv.classList.add('section-padding', 'text-center');
                document.querySelector('main').prepend(notFoundDiv);
            }
            notFoundDiv.innerHTML = `
                <h2 class="section-title">Producto no encontrado</h2>
                <p class="section-subtitle">Lo sentimos, el producto que buscas no está disponible.</p>
                <a href="shop.html" class="btn primary-btn">Volver a la Tienda</a>
            `;
            notFoundDiv.style.display = 'block';
        }
    }


    // --- Inicialización al cargar la página ---
    updateUserUI(); // Actualiza el estado visual del usuario

    // NO HAY NECESIDAD DE SLIDER DE RESEÑAS SI NO HAY HTML QUE LO SOPORTE AHORA.
    // Si lo tienes en index.html, asegúrate de que el HTML exista.
    // Lógica para el slider de reseñas (si existe en index.html)
    const slider = document.querySelector('.testimonials-slider');
    if (slider) { // Solo si el slider existe en la página actual
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        if (testimonialCards.length > 0) {
            let currentIndex = 0;
            const cardStyle = getComputedStyle(testimonialCards[0]);
            const cardWidthWithMargin = testimonialCards[0].offsetWidth + parseFloat(cardStyle.marginRight || 0) + parseFloat(cardStyle.marginLeft || 0);

            function updateSliderPosition() {
                const sliderContainerWidth = slider.parentElement.offsetWidth;
                const visibleCardsCount = Math.floor(sliderContainerWidth / cardWidthWithMargin);
                const maxIndex = testimonialCards.length - visibleCardsCount;

                if (currentIndex < 0) {
                    currentIndex = 0;
                } else if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                slider.style.transform = `translateX(${-currentIndex * cardWidthWithMargin}px)`;
            }

            if (prevArrow) {
                prevArrow.addEventListener('click', () => {
                    currentIndex--;
                    updateSliderPosition();
                });
            }

            if (nextArrow) {
                nextArrow.addEventListener('click', () => {
                    currentIndex++;
                    updateSliderPosition();
                });
            }

            updateSliderPosition(); // Llamada inicial
            window.addEventListener('resize', updateSliderPosition); // Ajusta al redimensionar
        }
    }
});