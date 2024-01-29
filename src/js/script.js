document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Calcula el total al cargar la página
    let total = 17.97;

    // Muestra el total al cargar la página
    cartTotal.textContent = "€" + total.toFixed(2);
});

