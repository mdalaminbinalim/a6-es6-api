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
        <button onclick="loadPets(true, '${category.category}')" class="category-btn active-btn flex items-center justify-evenly gap-3 md:gap-5 rounded-full font-bold md:py-3 md:mx-0 px-8 py-2 md:px-16 hover:ring-2 hover:ring-[rgb(14,122,129)] hover:bg-[rgba(14,122,129,0.1)]"><img class="inline" src="${category.category_icon}"><p class="font-bold text-xl md:text-2xl">${category.category}</p></button>
        <div>
        </div>
        `;

        categorySection.append(categoryDiv);
    });

    // Active Button
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.style.backgroundColor = '';
                btn.style.boxShadow = '';
            });
            button.style.backgroundColor = 'rgba(14,122,129,0.1)';
            button.style.boxShadow = '0 0 0 2px rgb(14,122,129)';
        });
    });
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

    // Sort By Price

    const sortBtn = document.getElementById('sort-btn');
    sortBtn.addEventListener('click', function () {
        petDetails.innerHTML = '';
        spinner.style.display = 'block';
        likedContainer.classList.add('hidden');
        document.getElementById('pet-details').innerHTML = '';

        setTimeout(function () {
            spinner.style.display = 'none';
            likedContainer.classList.remove('hidden');
            document.getElementById('pet-details').innerHTML = '';

            const sortedArray = pets.map((pet) => pet)
            sortedArray.sort((a, b) => b.price - a.price)

            if (pets.length !== 0) {
                sortedArray.forEach((sortedPet) => {
                    console.log(sortedPet.price)

                    const petDiv2 = document.createElement('div');
                    const { petId, breed, category, birth, price, image, gender } = sortedPet;

                    petDiv2.innerHTML = `
        <div class="p-6 border-2 shadow-xl md:shadow-md rounded-xl space-y-2 md:h-[432px]">
                <img src="${image}" class="rounded-xl w-[272px] h-[160px]">
                <h2 class="text-xl font-extrabold">${sortedPet.pet_name ? sortedPet.pet_name : 'Not Named Yet'}</h2>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-apps-48.png" alt=""> Breed: ${breed ? breed : 'Normal Breed'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-date-50.png" alt=""> Birth: ${sortedPet.date_of_birth ? sortedPet.date_of_birth : 'Not Recorded'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-male-female-32.png" alt=""> Gender: ${gender ? gender : 'Not Mentioned'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-dollar-50.png" alt=""> Price: ${price ? '$' + price : ' Not Available'}</p>
                <div class="flex items-center justify-between gap-5 pt-4">
                    <button onclick="petById(false, '${sortedPet.petId}')" class="hover:bg-[rgb(169,221,224)] rounded-xl"><img class="inline w-5 cursor-pointer" src="images/icons8-like-50.png" alt=""></button>
                    <div><button onclick="petAdopted(this)" class="adopt-btn basic hover:bg-[#0E7A81] hover:text-white font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Adopt</button></div>
                    <div><button onclick="petById(true, '${sortedPet.petId}')" class="basic hover:bg-[#0E7A81] hover:text-white font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Details</button></div>
                </div>
            </div>
        `;

                    petDetails.append(petDiv2);

                })
                petsContainer.append(petDetails);
                petDetails.classList = "grid md:grid-cols-3 grid-cols-1 md:my-8 my-6 gap-6 mx-auto";
            }
            else {
                petDetails.classList = "items-center grid grid-cols-1";
                petDetails.innerHTML = `
            <div class="flex flex-col justify-center items-center md:w-3/4 md:my-8 my-6 gap-6 mx-auto">
                    <img src="./images/error.webp">
                    <h1 class="text-3xl font-extrabold text-center">No Information Available</h1>
                    <p class="basic font-bold text-center">As the rate of selling birds was comparatively higher last month, it went out of stock. We are currently unable to provide you your desired pet. Keep in touch with us for further information.</p>
            </div>
        `;
                petsContainer.append(petDetails);
            }

        }, 2000)



    })

    // Regular display of pets

    const spinner = document.getElementById('spinner');
    const likedContainer = document.getElementById('liked-pets');
    spinner.style.display = 'block';
    likedContainer.classList.add('hidden');
    document.getElementById('pet-details').innerHTML = '';
    const petsContainer = document.getElementById('all-pets-container');
    const petDetails = document.getElementById('pet-details');

    setTimeout(function () {
        spinner.style.display = 'none';
        likedContainer.classList.remove('hidden');
        document.getElementById('pet-details').innerHTML = '';



        if (pets.length !== 0) {
            pets.forEach((pet) => {
                const petDiv = document.createElement('div');
                const { petId, breed, category, birth, price, image, gender } = pet;

                petDiv.innerHTML = `
        <div class="p-6 border-2 shadow-xl md:shadow-md rounded-xl space-y-2 md:h-[432px]">
                <img src="${image}" class="rounded-xl w-[272px] h-[160px]">
                <h2 class="text-xl font-extrabold">${pet.pet_name ? pet.pet_name : 'Not Named Yet'}</h2>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-apps-48.png" alt=""> Breed: ${breed ? breed : 'Normal Breed'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-date-50.png" alt=""> Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Recorded'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-male-female-32.png" alt=""> Gender: ${gender ? gender : 'Not Mentioned'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-dollar-50.png" alt=""> Price: ${price ? '$' + price : ' Not Available'}</p>
                <div class="flex items-center justify-between gap-5 pt-4">
                    <button onclick="petById(false, '${pet.petId}')" class="hover:bg-[rgb(169,221,224)] rounded-xl"><img class="inline w-5 cursor-pointer" src="images/icons8-like-50.png" alt=""></button>
                    <div><button onclick="petAdopted(this)" class="adopt-btn basic hover:bg-[#0E7A81] hover:text-white font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Adopt</button></div>
                    <div><button onclick="petById(true, '${pet.petId}')" class="basic hover:bg-[#0E7A81] hover:text-white font-semibold text-lg rounded-xl md:py-2 py-1 md:px-5 px-3">Details</button></div>
                </div>
            </div>
        `;

                petDetails.append(petDiv);
            })
            petsContainer.append(petDetails);
            petDetails.classList = "grid md:grid-cols-3 grid-cols-1 md:my-8 my-6 gap-6 mx-auto";
        }
        else {
            petDetails.classList = "items-center grid grid-cols-1";
            petDetails.innerHTML = `
            <div class="flex flex-col justify-center items-center md:w-3/4 md:my-8 my-6 gap-6 mx-auto">
                    <img src="./images/error.webp">
                    <h1 class="text-3xl font-extrabold text-center">No Information Available</h1>
                    <p class="basic font-bold text-center">As the rate of selling birds was comparatively higher last month, it went out of stock. We are currently unable to provide you your desired pet. Keep in touch with us for further information.</p>
            </div>
        `;
            petsContainer.append(petDetails);
        }
    }, 2000);

}


// Liked pets Function
const petById = async (details, petID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`);
    const data = await res.json();
    if (details) {
        showDetails(data.petData);
    }
    else {
        likedPets(data.petData);
    }
}

// Liked pets displayed
const likedPets = (liked) => {
    const likedContainer = document.getElementById('liked-pets');
    const likedImage = document.createElement('div');
    likedImage.innerHTML = `
    <img src="${liked.image}" class="w-[124px] h-[124px] rounded-xl object-cover">
    `;
    likedContainer.append(likedImage);
}

// Pet Details Function
const showDetails = (detail) => {
    const detailsModal = document.getElementById('details-container');
    detailsModal.innerHTML = `
    <dialog id="my_modal_4" class="modal">
                <div class="modal-box max-w-3xl">
                <img class="w-full max-h-[320px] object-cover rounded-xl" src="${detail.image}">
                    <h3 class="text-2xl my-4 font-extrabold">${detail.pet_name ? detail.pet_name : 'Not Named Yet'}</h3>
                    <div class="grid grid-cols-2 space-y-1">
                    <p class="basic font-bold"><img class="inline w-5" src="images/icons8-apps-48.png" alt=""> Breed: ${detail.breed ? detail.breed : 'Normal Breed'}</p>
                    <p class="basic font-bold"><img class="inline w-5" src="images/icons8-male-female-32.png" alt=""> Gender: ${detail.gender ? detail.gender : 'Not Mentioned'}</p>
                    <p class="basic font-bold"><img class="inline w-5" src="images/icons8-treatment-50.png" alt=""> Vaccinated Status: ${detail.vaccinated_status ? detail.vaccinated_status : 'Not Checked'}</p>
                    <p class="basic font-bold"><img class="inline w-5" src="images/icons8-date-50.png" alt=""> Birth: ${detail.date_of_birth ? detail.date_of_birth : 'Not Recorded'}</p>
                <p class="basic font-bold"><img class="inline w-5" src="images/icons8-dollar-50.png" alt=""> Price: ${detail.price ? '$' + detail.price : ' Not Available'}</p>
                    </div>
                    <div>
                    <h2 class="text-xl my-4 font-extrabold">Details Information</h2>
                    <p class="basic font-semibold">${detail.pet_details}</p>
                    </div>
                    <div class="modal-action">
                        <form method="dialog" class="w-full">
                            <button class="btn w-full">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `;
    my_modal_4.showModal();
}

// Adoption Function
const petAdopted = (adoptBtn) => {
    document.getElementById('adopt-container').innerHTML = `
    <dialog id="my_modal_1" class="modal">
                <div class="modal-box flex flex-col justify-center items-center">
                <img src="images/icons8-handshake.gif">
                    <h3 class="md:text-4xl text-xl font-extrabold text-center">Congrats!</h3>
                    <p class="py-4 text-center basic font-bold md:text-xl">Adoption process of your pet has been started.</p>
                    <p id="adopt-count" class="md:py-4 md:mb-0 mb-4 font-extrabold md:text-7xl text-4xl text-center">3</p>
                </div>
            </dialog>
    `;

    const modal = document.getElementById('my_modal_1');
    modal.showModal();

    const timer = setInterval(() => {
        const adoptCounter = document.getElementById('adopt-count');
        let countDown = parseInt(adoptCounter.innerText);
        countDown = countDown - 1;
        adoptCounter.innerText = countDown;

        if (countDown === 0) {
            clearInterval(timer);
            modal.close();
            document.getElementById('adopt-container').innerHTML = '';
            adoptBtn.disabled = true;
            adoptBtn.innerText = 'Adopted';
            adoptBtn.style.backgroundColor = '#81d2d7';
            adoptBtn.style.color = 'white';
            adoptBtn.style.cursor = 'not-allowed';
        }
    }, 1000);
}


// Category Section's function called
loadCategories();
// All pets function called
loadPets(false, 'pets');