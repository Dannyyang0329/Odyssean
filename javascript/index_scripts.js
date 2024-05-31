// navigation bar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// quote in hero section
fetch('https://api.quotable.io/random?maxLength=80')
    .then(response => response.json())
    .then(data => {
        const quote = data.content;
        document.getElementById('quote').textContent = quote;
    })
    .catch(error => {
        console.error(error)
        const defaultQuote = "The world is a book, and those who do not travel read only one page.";
        document.getElementById('quote').textContent = defaultQuote;
    });

// get random attractions 
function getRandomAttractions(data, count) {
    const countries = Object.keys(data);
    const attractions = [];
    const attractions_country = [];

    // choose a random country first, then choose a random attraction from that country
    while (attractions.length < count) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const countryAttractions = data[randomCountry];
        const randomAttraction = countryAttractions[Math.floor(Math.random() * countryAttractions.length)];

        if (!attractions.some(a => a.name === randomAttraction.name)) {
            attractions.push(randomAttraction);
            attractions_country.push(randomCountry);
        }
    }
    return { attractions: attractions, attractions_country: attractions_country};
}

// display random attractions 
function displayAttractions(randomAttractions) {
    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    cardContainer.classList.add('card-container');
    for (let i = 0; i < 3; i++) {
        randomAttractions.attractions.slice(i * 5, i * 5 + 5).forEach((attraction, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-image">
                    <img src="${attraction.image_url}" alt="${attraction.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${attraction.name}</h3>
                    <p class="card-location">${randomAttractions.attractions_country[i*5+index]}</p>
                    <div class="card-rating">
                        <span class="rating-score">${attraction.score}</span>
                        <span class="rating-stars">
                            ${Array(Math.round(attraction.score)).fill('&#9733;').join('')}
                        </span>
                    </div>
                    <div class='heart-btn-wrapper text-right'>
                        <ion-icon name="heart">
                            <div class='red-bg'></div>
                        </ion-icon>
                    </div>
                </div>
            `;

            cardContainer.appendChild(card);
        });
    }
    const destinationsSection = document.getElementById('card-view');
    destinationsSection.appendChild(cardContainer);
}

const randomAttractions = getRandomAttractions(data, 15);
displayAttractions(randomAttractions);


// get favorite attractions from local storage and display the heart icon
var card_container = document.querySelector("#card-container");
const cards = card_container.querySelectorAll('.card');
if(localStorage.getItem('favoriteAttractions')) {
    var favoriteAttractions = JSON.parse(localStorage.getItem('favoriteAttractions'));
}
else
    var favoriteAttractions = [];
for(let i=0 ; i<cards.length ; i++) {
    var card_name = cards[i].querySelector('.card-title').textContent;
    if(favoriteAttractions.some((ele) => ele.name === card_name)) {
        cards[i].querySelector(".heart-btn-wrapper ion-icon").classList.add("active");
    }
}


// click on a card to view the attraction details -> attraction.html
const card_view = document.querySelector("#card-view");
card_view.addEventListener("click", function(event) {
    const card = event.target.closest(".card");
    if(card) {
        // check if the click is on the heart icon
        if(event.target.classList.contains("md")) {
            // console.log("heart clicked");
            let attraction_name = card.querySelector(".card-title").textContent;
            let attraction_country = card.querySelector(".card-location").textContent;
            let attraction = {name: attraction_name, country: attraction_country};
            if(event.target.classList.toggle("active")) {
                favoriteAttractions.push(attraction);
                console.log(favoriteAttractions);
                localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
            }
            else {
                favoriteAttractions = favoriteAttractions.filter(favorite_attraction => favorite_attraction.name !== attraction.name);
                console.log(favoriteAttractions);
                localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
            }
            return;
        }
        else {
            let attraction_name = card.querySelector(".card-title").textContent;
            let attraction_country = card.querySelector(".card-location").textContent;
            localStorage.setItem("attraction_name", attraction_name);
            localStorage.setItem("attraction_country", attraction_country);
            // console.log(favoriteAttractions);
            window.location.href = "attraction.html";
        }
    }
});

