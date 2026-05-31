let cart = {};

window.onload = () => {
    loadFoods("a");
};

async function loadFoods(foodName) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    );

    const data = await response.json();

    const container = document.getElementById("foodContainer");

    container.innerHTML = "";

    if (!data.meals) {
        container.innerHTML = "<h2>No Food Found</h2>";
        return;
    }

    data.meals.forEach(meal => {

        container.innerHTML += `
        <div class="card">

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h2>${meal.strMeal}</h2>

            <p><b>Category:</b> ${meal.strCategory}</p>

            <p><b>Origin:</b> ${meal.strArea}</p>

            <h3>₹199</h3>

            ${
                cart[meal.idMeal]
                ? `
                <div class="qty-controls">
                    <button onclick="decreaseQty('${meal.idMeal}')">-</button>
                    <span>${cart[meal.idMeal]}</span>
                    <button onclick="increaseQty('${meal.idMeal}')">+</button>
                </div>
                `
                : `
                <button onclick="addToCart('${meal.idMeal}')">
                    Add To Cart
                </button>
                `
            }

        </div>
        `;
    });
}

function searchFood() {

    const food =
        document.getElementById("searchInput").value;

    if (food.trim() === "") {
        loadFoods("a");
    }
    else {
        loadFoods(food);
    }
}

function addToCart(id) {

    cart[id] = 1;

    updateCart();

    loadFoods(
        document.getElementById("searchInput").value || "a"
    );
}

function increaseQty(id) {

    cart[id]++;

    updateCart();

    loadFoods(
        document.getElementById("searchInput").value || "a"
    );
}

function decreaseQty(id) {

    cart[id]--;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    updateCart();

    loadFoods(
        document.getElementById("searchInput").value || "a"
    );
}

function updateCart() {

    let totalItems = 0;
    let totalPrice = 0;

    for (let item in cart) {
        totalItems += cart[item];
        totalPrice += cart[item] * 199;
    }

    document.getElementById("cartCount").innerText =
    totalItems;

    document.getElementById("totalAmount").innerText =
    totalPrice;
}