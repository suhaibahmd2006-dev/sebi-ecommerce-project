
function loadCart() {
    try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            return JSON.parse(cartData);
        }
    } catch (error) {
        console.error("Error loading cart data:", error);
    }
    return []; 
}

function updateCartCount() {
    const cart = loadCart();
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count2');
    let totalQuantity = 0;

    if (Array.isArray(cart)) {
        cart.forEach(item => {
            // Assuming your cart items have a 'quantity' property
            totalQuantity += item.quantity; 
        });
    }

    cartCountElements.forEach(element => {
        element.textContent = totalQuantity;
    });
}

// Run the update function immediately when any page loads
document.addEventListener('DOMContentLoaded', updateCartCount);