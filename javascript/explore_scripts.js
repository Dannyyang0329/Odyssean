function getCountryAttractions(countries, country) {
    const attraction = countries[country];
    return { attraction: attraction, attractionsCount: attraction.length };
}

function displayTargetCountryAttractions(countryAttractions) {
    const cardContainer = document.createElement('div');
    cardContainer.id = "main-card-container";
    cardContainer.classList.add("main-card-container");
    for(let i=0 ; i<countryAttractions.length ; i++) {
        attraction = countryAttractions[i];
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-image">
                <img src="${attraction.image_url}" alt="${attraction.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${attraction.name}</h3>
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
    }
    const mainCardSection = document.getElementById("main-card-view");
    mainCardSection.appendChild(cardContainer);
}

function displayNeighborCountryAttractions(mainCountry) {
    var neighborCountryContainer = document.getElementById('neighbor-country-container');
    fetch("data/neighbor_countries.json").then((res) => res.json()).then((neighborCountryDict) => { 
        const neighborCountries = neighborCountryDict[mainCountry];
        const neighborCountryNum = Math.min(neighborCountries.length, 4);
        // each neighbor country
        neighborCnt = 1;
        neighborCountries.forEach((neighborCountry) => {
            if(neighborCnt > neighborCountryNum) {
                return;
            }
            const neighborCountryAttractions = data[neighborCountry];
            // if neighborCountryAttractions undefined -> continue
            if (neighborCountryAttractions === undefined) {
                return;
            }

            // create a section for each neighbor country
            const neighborCountrySection = document.createElement('div');
            neighborCountrySection.id = `neighbor-country-section-${neighborCnt}`;
            neighborCountrySection.classList.add(`neighbor-country-section-${neighborCnt}`);
            neighborCountryContainer.appendChild(neighborCountrySection);

            // add neighbor country name
            let h2_element = document.createElement('h2')
            h2_element.innerHTML = neighborCountry;
            neighborCountrySection.appendChild(h2_element)

            neighborObject = new NeighborCarousel(neighborCountryAttractions, neighborCnt);

            neighborCnt++;
        });
    }).catch((error) => console.error("Unable to fetch data:", error));
}




var country = localStorage.getItem('country');
if(country == "United States of America")
    country = "United States";
// set the title of the page
document.getElementById("popular-destinations-title").innerText += " " + country;
document.getElementById("country-name").innerHTML = country;
// set the country description and flag image
fetch("data/country_intro.json").then((res) => res.json()).then((country_intro) => {
    const countryInfo = country_intro[country];
    document.getElementById("country-description").innerHTML = countryInfo.intro_text.split('―')[0];
    document.getElementById("country-flag").src = countryInfo.flag_image;
}).catch((error) => console.error("Unable to fetch data:", error));

// set the main country's attractions
displayTargetCountryAttractions(data[country])

// get favorite attractions from local storage and display the heart icon
var main_card_container = document.querySelector("#main-card-container");
const cards = main_card_container.querySelectorAll(".card");
var favoriteAttractions = JSON.parse(localStorage.getItem("favoriteAttractions")) || [];
for(let i=0 ; i<cards.length ; i++) {
    var card_name = cards[i].querySelector(".card-title").textContent;
    if(favoriteAttractions.some((ele) => ele.name === card_name)) {
        cards[i].querySelector(".heart-btn-wrapper ion-icon").classList.add("active");
    }
}

// set the neighbor countries' attractions
displayNeighborCountryAttractions(country);

// Main Card Section
// click on a card to view the attraction details -> attraction.html
const card_container = document.querySelector("#main-card-container");
card_container.addEventListener("click", function(event) {
    const card = event.target.closest(".card");
    if(card) {
        // check if the click is on the heart icon
        if(event.target.classList.contains("md")) {
            // console.log("heart clicked");
            let attraction_name = card.querySelector(".card-title").textContent;
            let attraction = {name: attraction_name, country: country};
            if(event.target.classList.toggle("active")) {
                favoriteAttractions.push(attraction);
                console.log(favoriteAttractions);
                localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
            }
            else {
                favoriteAttractions = favoriteAttractions.filter((attr) => attr.name !== attraction_name);
                console.log(favoriteAttractions);
                localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
            }
            return;
        }
        else {
            let attraction_name = card.querySelector(".card-title").textContent;
            localStorage.setItem("attraction_name", attraction_name);
            localStorage.setItem("attraction_country", country);
            window.location.href = "attraction.html";
        }
    }
});

// Neighbor Country Section
// click on a card to view the attraction details -> attraction.html
window.onload = function () {
    for(let i=1 ; i<=4 ; i++) {
    const neighborCountrySection = document.querySelector(`#card-container-${i}`);
    if(neighborCountrySection === null) {
        continue;
    }
    neighborCountrySection.addEventListener("click", function(event) {
        const card = event.target.closest(".card");
        if(card) {
            let attraction_name = card.querySelector(".card-title").textContent;
            let neighborCountry = card.parentElement.parentElement.querySelector("h2").textContent;
            localStorage.setItem("attraction_name", attraction_name);
            localStorage.setItem("attraction_country", neighborCountry);
            window.location.href = "attraction.html";
        }
    });
}
}

