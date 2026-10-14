// 1. Read which treat was clicked from the URL
const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const flavor = params.get("flavor");

// 2. Prices and sizes for each category (change these however your group wants)
const menu = {
    cake: {
        name: "Cake",
        base: 35,
        sizes: [
            { label: '6 inch', add: 0 },
            { label: '8 inch', add: 10 },
            { label: '10 inch', add: 20 }
        ]
    },
    cupcake: {
        name: "Cupcakes",
        base: 18,
        sizes: [
            { label: 'Half dozen (6)', add: 0 },
            { label: 'Dozen (12)', add: 16 }
        ]
    },
    cookie: {
        name: "Cookies",
        base: 12,
        sizes: [
            { label: 'Half dozen (6)', add: 0 },
            { label: 'Dozen (12)', add: 10 }
        ]
    },
    cakepop: {
        name: "Cake Pops",
        base: 15,
        sizes: [
            { label: 'Half dozen (6)', add: 0 },
            { label: 'Dozen (12)', add: 12 }
        ]
    }
};

const SPRINKLES_PRICE = 2;

// 3. Grab the page elements
const title = document.getElementById("item-title");
const image = document.getElementById("item-image");
const sizeSelect = document.getElementById("size");
const colorSelect = document.getElementById("color");
const messageInput = document.getElementById("message");
const sprinklesBox = document.getElementById("sprinkles");
const quantityInput = document.getElementById("quantity");
const priceDisplay = document.getElementById("price");
const addButton = document.getElementById("add-to-cart");
const confirmText = document.getElementById("confirm");

// 4. Turn "red-velvet" into "Red Velvet"
function prettyName(text) {
    return text
        .split("-")
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

const item = menu[type];

if (!item || !flavor || !/^[a-z-]+$/.test(flavor)) {
    // bad or missing link
    title.textContent = "Oops, we couldn't find that treat";
    document.querySelector(".customize-form").innerHTML +=
        '<p><a href="bakery.html">Back to home</a></p>';
    addButton.disabled = true;
} else {
    const flavorName = prettyName(flavor);

    title.textContent = flavorName + " " + item.name;
    image.alt = flavorName + " " + item.name;

    // image filenames follow flavor-type.jpg, like chocolate-cake.jpg
    image.src = flavor + "-" + type + ".jpg";

    // fill in the size dropdown
    item.sizes.forEach(function (size, index) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = size.label + (size.add > 0 ? " (+$" + size.add + ")" : "");
        sizeSelect.appendChild(option);
    });

    function getUnitPrice() {
        const size = item.sizes[sizeSelect.value];
        let price = item.base + size.add;
        if (sprinklesBox.checked) {
            price += SPRINKLES_PRICE;
        }
        return price;
    }

    function getQuantity() {
        let qty = parseInt(quantityInput.value, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > 20) qty = 20;
        return qty;
    }

    function updatePrice() {
        priceDisplay.textContent = getUnitPrice() * getQuantity();
    }

    sizeSelect.addEventListener("change", updatePrice);
    sprinklesBox.addEventListener("change", updatePrice);
    quantityInput.addEventListener("input", updatePrice);
    updatePrice();

    // 5. Add to cart saves everything in localStorage
    addButton.addEventListener("click", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            type: type,
            flavor: flavorName,
            size: item.sizes[sizeSelect.value].label,
            color: colorSelect.value,
            message: messageInput.value,
            sprinkles: sprinklesBox.checked,
            quantity: getQuantity(),
            price: getUnitPrice() * getQuantity()
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        confirmText.textContent = "Added to your cart!";
    });
}