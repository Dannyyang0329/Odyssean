function get_attraction_info(attraction_name, attraction_country) {
    return new Promise((resolve, reject) => {
        fetch("../data/attractions_with_iframe.json").then((res) => res.json()).then((data) => {
            const attraction = data[attraction_country].find(attraction => attraction.name == attraction_name);
            resolve(attraction);
        }).catch((error) => console.error("Unable to fetch data:", error));
    });
}

function displayAttraction(name, country) {
    get_attraction_info(name, country).then(attraction => {
        document.getElementById("text-center").innerHTML = name;
        document.getElementById("mapModalLabel").innerHTML = `${name} Location`;
        document.getElementById("attraction-intro").innerHTML = attraction.intro;
        document.getElementById("badge-secondary").innerHTML = `Score: ${attraction.score}/5`;
        document.getElementById("badge-primary").innerHTML = `Country: ${country}`;
        document.getElementById("embed-responsive").innerHTML = attraction.iframe_url;
    });
}


function heart_init() {
    const attraction_name = localStorage.getItem("attraction_name");
    if(favoriteAttractions.some((ele) => ele.name === attraction_name)) {
        document.querySelector(".heart-btn-wrapper ion-icon").classList.add("active");
    }
}


const click_container = document.getElementById("click-container");
click_container.addEventListener("click", function(event) {
    // const btn = event.target.closest(".btn");
    if(event.target.classList.contains("md")) {
        const attraction_name = localStorage.getItem("attraction_name");
        const attraction_country = localStorage.getItem("attraction_country");
        let attraction = {name: attraction_name, country: attraction_country};
        if(event.target.classList.toggle("active")) {
            favoriteAttractions.push(attraction);
            localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
        }
        else {
            favoriteAttractions = favoriteAttractions.filter(favorite_attraction => favorite_attraction.name !== attraction.name);
            localStorage.setItem("favoriteAttractions", JSON.stringify(favoriteAttractions));
        }
        return;
    }
});



if(localStorage.getItem("attraction_name") && localStorage.getItem("attraction_country")) {
    const attraction_name = localStorage.getItem("attraction_name");
    const attraction_country = localStorage.getItem("attraction_country");
    displayAttraction(attraction_name, attraction_country);
}

if(localStorage.getItem('favoriteAttractions')) {
    var favoriteAttractions = JSON.parse(localStorage.getItem('favoriteAttractions'));
}
else
    var favoriteAttractions = [];

heart_init();