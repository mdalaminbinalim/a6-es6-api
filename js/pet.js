// Category Section API
const loadCategories = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
        const data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        console.error("ERROR in loading data", error);
    }
}

const displayCategories = (categories) => {
    const categorySection = document.getElementById('category-container');

    categories.forEach((category) => {
        const categoryButton = document.createElement('button');
        categoryButton.classList = 'rounded-full font-bold md:p-4 p-3 hover:ring-2 hover:ring-[rgb(14,122,129)] hover:bg-[rgba(14,122,129,0.1)]';

        categoryButton.innerHTML = `
        <div class="flex justify-evenly items-center"><img class="inline" src="${category.category_icon}">
        <p class="font-bold text-xl md:text-2xl">${category.category}</p></div>
        `;

        categorySection.append(categoryButton);
    })
}

// Category Section's function called
loadCategories();