document.addEventListener('DOMContentLoaded', () => {
    // This now calls the GLOBAL updateCartCount() from utility.js
    updateCartCount(); 

    // Get productID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('productID'); // e.g., "Zipper_Jacket"

    if (!productID) {
        console.error('Product ID is missing in the URL.');
        return;
    }

    fetch('Products.json')  // Assuming you have a Products.json file or API endpoint
        .then(response => response.json())
        .then(data => {
            const product = findProductByID(data, productID);

            if (product) {
                updateProductDetails(product);
            } else {
                console.error('Product not found!');
                document.getElementById('product-details').textContent = 'Product not found.';
            }
        })
        .catch(error => {
            console.error('Error loading product details:', error);
            document.getElementById('product-details').textContent = 'Failed to load product details.';
        });
});

function findProductByID(data, productID) {
    const normalizedProductID = productID.trim().toLowerCase();
    return [...data.featuredProducts, ...data.newArrivals].find(product => product.name.trim().toLowerCase() === normalizedProductID);
}

function updateProductDetails(product) {
    const defaultImage = 'img/default.webp';

    // Update images dynamically
    document.querySelector('#Mainimg').src = product.image || defaultImage;
    document.querySelector('#small1').src = product['small-img']?.["image.1"] || defaultImage;
    document.querySelector('#small2').src = product['small-img']?.["image.2"] || defaultImage;
    document.querySelector('#small3').src = product['small-img']?.["image.3"] || defaultImage;
    document.querySelector('#small4').src = product['small-img']?.["image.4"] || defaultImage;
    var Mainimg = document.getElementById("Mainimg");
    var smallimg = document.getElementsByClassName("small-img");
    
    smallimg[0].onclick = function (){
        Mainimg.src =smallimg[0].src;
    }
    smallimg[1].onclick = function (){
        Mainimg.src =smallimg[1].src;
    }
    smallimg[2].onclick = function (){
        Mainimg.src =smallimg[2].src;
    }
    smallimg[3].onclick = function (){
        Mainimg.src =smallimg[3].src;
    }

    // Update text content dynamically
    document.querySelector('#category').textContent = product.category || 'Home / Tracksuits';
    document.querySelector('#product-name').textContent = product.name;
    document.querySelector('#price').innerHTML = `RS ${product.price} <span>RS ${product.originalPrice}</span>`;
    document.querySelector('#product-description').textContent = product.description || 'No description available';

    handleSizeSelection(product);
}

function handleSizeSelection(product) {
    let selectedSize = null;
    const sizeButtons = document.querySelectorAll('.productdisplaysize button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('act'));
            button.classList.add('act');
            selectedSize = button.textContent;
            document.getElementById('size-error').style.display = 'none'; // Hide error if size is selected
        });
    });

    document.querySelector('.normal').addEventListener('click', () => {
        if (!selectedSize) {
            document.getElementById('size-error').style.display = 'inline'; // Show error if size isn't selected
            return;
        }

        const quantity = parseInt(document.querySelector('.quantity-option').value) || 1;

        const productDetails = {
            name: product.name,
            price: product.price,
            size: selectedSize,
            quantity: quantity,
            image: product.image || 'img/default.webp'
        };

        addToCart(productDetails);
    });
}

function addToCart(productDetails) {
    const cart = loadCart(); // GLOBAL function call
    
    const existingProductIndex = cart.findIndex(item => item.name === productDetails.name && item.size === productDetails.size);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += productDetails.quantity;
    } else {
        cart.push(productDetails);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // GLOBAL function call
}