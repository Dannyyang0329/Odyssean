document.addEventListener("DOMContentLoaded", function() {
    // Add scroll event listener to change nav background and fade out/in navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});


// index.html most popular destination cards
function getRandomAttractions(data, count) {
    const countries = Object.keys(data);
    const attractions = [];

    while (attractions.length < count) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const countryAttractions = data[randomCountry];
        const randomAttraction = countryAttractions[Math.floor(Math.random() * countryAttractions.length)];

        if (!attractions.some(a => a.name === randomAttraction.name)) {
            attractions.push(randomAttraction);
        }
    }

    return attractions;
}

function displayAttractions(attractions) {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');

    attractions.slice(0, 5).forEach((attraction, index) => {
        const cell = rows[0].children[index];
        cell.innerHTML = `
            <div class="card">
                <img src="${attraction.image_url}" alt="${attraction.name}">
                <div class="card-body">
                    <div class="card-title">${attraction.name}</div>
                    <div class="card-score">Rating: ${attraction.score} ⭐</div>
                </div>
            </div>
        `;
    });

    attractions.slice(5, 10).forEach((attraction, index) => {
        const cell = rows[1].children[index];
        cell.innerHTML = `
            <div class="card">
                <img src="${attraction.image_url}" alt="${attraction.name}">
                <div class="card-body">
                    <div class="card-title">${attraction.name}</div>
                    <div class="card-score">Rating: ${attraction.score} ⭐</div>
                </div>
            </div>
        `;
    });

    attractions.slice(10, 15).forEach((attraction, index) => {
        const cell = rows[2].children[index];
        cell.innerHTML = `
            <div class="card">
                <img src="${attraction.image_url}" alt="${attraction.name}">
                <div class="card-body">
                    <div class="card-title">${attraction.name}</div>
                    <div class="card-score">Rating: ${attraction.score} ⭐</div>
                </div>
            </div>
        `;
    });
}

const randomAttractions = getRandomAttractions(data, 15);
displayAttractions(randomAttractions);

//end of index.html most popular destination cards