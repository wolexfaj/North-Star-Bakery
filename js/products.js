
// Product categories used by the filter
const categories = [
    { value: "all", label: "All Products" },
    { value: "bread", label: "Breads" },
    { value: "pastry", label: "Pastries" },
    { value: "cake", label: "Cakes" }
];

// Get the HTML elements we need
const filter = document.getElementById("product-filter");
const products = document.querySelectorAll(".product");
const result = document.getElementById("filter-result");

// Find the products that belong to the selected category
function getVisibleProducts(category) {
    return Array.from(products).filter(function (product) {
        return category === "all" ||
               product.dataset.category === category;
    });
}

// Show the selected products and hide the others
function displayProducts(category) {
    const visibleProducts = getVisibleProducts(category);

    products.forEach(function (product) {
        product.hidden = !visibleProducts.includes(product);
    });

    return visibleProducts;
}

// Update the message below the filter
function updateResult(category, visibleProducts) {
    const selectedCategory = categories.find(function (item) {
        return item.value === category;
    });

    const categoryName = selectedCategory
        ? selectedCategory.label
        : "All Products";

    if (category === "all") {
        result.textContent =
            `Showing all ${products.length} products.`;
    } else {
        result.textContent =
            `Showing ${visibleProducts.length} product(s) in ${categoryName}.`;
    }
}

// Handle changes made to the category filter
function handleFilterChange() {
    const selectedCategory = filter.value;

    const visibleProducts =
        displayProducts(selectedCategory);

    updateResult(selectedCategory, visibleProducts);
}

// Run the filter whenever the user changes the selection
filter.addEventListener("change", handleFilterChange);
