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

if(localStorage.getItem("attraction_name") && localStorage.getItem("attraction_country")) {
    const attraction_name = localStorage.getItem("attraction_name");
    const attraction_country = localStorage.getItem("attraction_country");
    displayAttraction(attraction_name, attraction_country);
}