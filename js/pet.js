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

// Display pets categories
const displayCategories = (categories) => {
    const categorySection = document.getElementById('category-container');

    categories.forEach((category) => {
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button onclick="loadPets(true, '${category.category}')" class="flex items-center justify-evenly gap-3 md:gap-5 rounded-full font-bold md:py-3 md:mx-0 px-8 py-2 md:px-16 hover:ring-2 hover:ring-[rgb(14,122,129)] hover:bg-[rgba(14,122,129,0.1)]"><img class="inline" src="${category.category_icon}"><p class="font-bold text-xl md:text-2xl">${category.category}</p></button>
        <div>
        </div>
        `;

        categorySection.append(categoryDiv);
    })
}

// All Pets data fetched
const loadPets = async (status, petType) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/${status ? `category/${petType}` : 'pets'}`);
        const data = await response.json();
        if (status) {
            displayPets(data.data);
        }
        else {
            displayPets(data.pets);
        }
    } catch (error) {
        console.error("ERROR in loading data", error);
    }
}

// Display all pets
const displayPets = (pets) => {
    document.getElementById('pet-details').innerHTML = '';
    const petsContainer = document.getElementById('all-pets-container');
    const petDetails = document.getElementById('pet-details');

    pets.forEach((pet) => {
        const petDiv = document.createElement('div');
        const { petId, breed, category, birth, price, image, gender } = pet;

        petDiv.innerHTML = `
        <div class="p-6 border-2 shadow-xl md:shadow-md rounded-xl space-y-2 md:h-[432px]">
                <img src="${image}" class="rounded-xl w-[272px] h-[160px]">
                <h2 class="text-xl font-extrabold">${pet.pet_name}</h2>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-apps-48.png" alt=""> Breed: ${breed}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-date-50.png" alt=""> Birth: ${pet.date_of_birth}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-male-female-32.png" alt=""> Gender: ${gender}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-dollar-50.png" alt=""> Price: $${price}</p>
                <div class="flex items-center gap-5 pt-4">
                    <div><img class="inline w-5 cursor-pointer" src="images/icons8-like-50.png" alt=""></div>
                    <div><button class="basic hover:ring-2 hover:ring-[rgb(14,122,129)] hover:bg-[rgba(14,122,129,0.1)] font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Adopt</button></div>
                    <div><button class="basic hover:ring-2 hover:ring-[rgb(14,122,129)] hover:bg-[rgba(14,122,129,0.1)] font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Details</button></div>
                </div>
            </div>
        `;

        petDetails.append(petDiv);
    })
    petsContainer.append(petDetails);
}


// Category Section's function called
loadCategories();
// All pets function called
loadPets(false, 'pets');