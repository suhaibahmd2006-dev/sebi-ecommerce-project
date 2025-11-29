document.addEventListener('DOMContentLoaded', () => {
    // The initial 'cart' variable gets its value from the global loadCart() in utility.js
    let cart = loadCart(); 
    const cartTableBody = document.querySelector('#cart tbody');
    const subtotalElement = document.querySelector('#subtotal td:nth-child(2)');
    const totalElement = document.getElementById('total-amount');

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
    } else {
        renderCartItems();
    }

    // Function to render cart items and handle interactions
    function renderCartItems() {
        // --- ADD THIS LINE ---
        cart = loadCart(); // Re-fetch the current cart state before rendering
        // ---------------------

        cartTableBody.innerHTML = ''; // Clear existing rows

        cart.forEach(item => {
            const row = cartTableBody.insertRow();

            // Remove button
            const removeCell = row.insertCell();
            const removeButton = document.createElement('a');
            removeButton.href = '#';
            const removeIcon = document.createElement('i');
            removeIcon.classList.add('far', 'fa-times-circle');
            removeButton.appendChild(removeIcon);
            removeCell.appendChild(removeButton);

            // Remove button event listener
            removeButton.addEventListener('click', (event) => {
                event.preventDefault();
                cart = cart.filter(cartItem => cartItem.name !== item.name);  // Filter out the item by name

                // Update localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Re-render the table and update subtotal and cart count
                renderCartItems();
                updateCartCount(); // GLOBAL function call
                updateSubtotal();

                if (cart.length === 0) {
                    cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
                }
            });

            // Image (using item.image)
            const imageCell = row.insertCell();
            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.name;
            imageCell.appendChild(image);

            // Product name
            const nameCell = row.insertCell();
            nameCell.textContent = item.name;

            // Price
            const priceCell = row.insertCell();
            priceCell.textContent = item.price;

            // Quantity
            const quantityCell = row.insertCell();
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityCell.appendChild(quantityInput);

            // Quantity input event listener
            quantityInput.addEventListener('input', () => {
                const newQuantity = parseInt(quantityInput.value) || 1;
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount(); // GLOBAL function call
                updateSubtotal();
            });
        });

        // Update subtotal after rendering items
        updateSubtotal();
    }

    // Function to update subtotal and total amounts
    function updateSubtotal() {
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = 'RS ' + subtotal;
        totalElement.textContent = 'RS ' + subtotal;
    }


});