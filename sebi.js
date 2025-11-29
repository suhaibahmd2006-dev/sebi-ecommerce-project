// Navbar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
bar.addEventListener('click', () => {
nav.classList.add('active')
})
}

if (close) {
close.addEventListener('click', () => {
nav.classList.remove('active')
 })
};
// Products //
fetch ("Products.json")
.then (resoponse => resoponse.json())
.then(data => console.log(data))

document.addEventListener('DOMContentLoaded', () => {
  // Fetch the product data
  fetch("Products.json")
    .then(response => response.json())
    .then(data => {
      const featuredProductsContainer = document.getElementById("featured-products");
      const newArrivalsContainer = document.getElementById("new-arrivals");

      // Check if the data is available
      if (data.featuredProducts && data.featuredProducts.length > 0) {
        populateProducts(data.featuredProducts, featuredProductsContainer);
      } else {
        featuredProductsContainer.innerHTML = "<p>No featured products available at the moment.</p>";
      }

      if (data.newArrivals && data.newArrivals.length > 0) {
        populateProducts(data.newArrivals, newArrivalsContainer);
      } else {
        newArrivalsContainer.innerHTML = "<p>No new arrivals available at the moment.</p>";
      }
    })
    .catch(error => console.error("Error loading products:", error));
});

// Function to populate products dynamically into the page
function populateProducts(products, container) {
  products.forEach(product => {
    let card = document.createElement("div");
    card.classList.add("pro");

    // Create and set the image for the product
    let image = document.createElement("img");
    image.src = product.image;

    // Create the description container
    let description = document.createElement("div");
    description.classList.add("des");

    // Add the brand to the description
    let brand = document.createElement("span");
    brand.innerText = product.brand;

    // Add the product name to the description
    let productName = document.createElement("h5");
    productName.innerText = product.name;

    // Create the rating section with stars
    let rating = document.createElement("div");
    rating.classList.add("star");

    let fullStars = Math.floor(product.rating);
    let halfStar = (product.rating % 1) >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      let star = document.createElement("i");
      star.classList.add("fas", "fa-star");
      rating.appendChild(star);
    }

    // Add half star if necessary
    if (halfStar) {
      let halfStarElement = document.createElement("i");
      halfStarElement.classList.add("fas", "fa-star-half");
      rating.appendChild(halfStarElement);
    }

    // Add empty stars for the remaining rating
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
      let emptyStar = document.createElement("i");
      emptyStar.classList.add("fas", "fa-star", "empty");
      rating.appendChild(emptyStar);
    }

    // Add the rating section to the description
    description.appendChild(brand);
    description.appendChild(productName);
    description.appendChild(rating);

    // Create the price section
    let price = document.createElement("h4");
    price.innerHTML = `RS ${product.price} <span>RS ${product.originalPrice}</span>`;

    // Add the price to the description
    description.appendChild(price);

    // Add the description to the card
    card.appendChild(image);
    card.appendChild(description);

    // Create the shopping cart icon and link
    let cartIcon = document.createElement("a");
    cartIcon.href = `product-details.html?productID=${encodeURIComponent(product.name)}`;
    let cart = document.createElement("i");
    cart.classList.add("fal", "fa-shopping-cart", "cart");
    cartIcon.appendChild(cart);

    // Add the cart icon to the card
    card.appendChild(cartIcon);

    // Add a click event listener to the entire card for navigating to the product details
    card.addEventListener('click', () => {
      window.location.href = `product-details.html?productID=${encodeURIComponent(product.name)}`;
    });

    // Append to the container
    container.appendChild(card);
  });
}