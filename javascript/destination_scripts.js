var attraction = "Eiffel Tower";

function getDestination(attraction, country) {
    console.log(data[country]);
    data[country].forEach(country_attractions => {
        if(country_attractions.name == attraction) {
            attraction_data = country_attractions;
        }
    });
    return { img_url: attraction_data.image_url, score: attraction_data.score };
}

function displayAttraction(attractions, country) {
    const destination = getDestination(attractions, country);
    document.getElementById("destination-name").innerHTML = attractions;
    document.getElementById("destination-image").src = destination.img_url;
    document.getElementById("destination-score").innerHTML = destination.score;
    document.getElementById("rating-stars").innerHTML = Array(Math.round(destination.score)).fill('&#9733;').join('');
}

displayAttraction("Eiffel Tower", "France");

// Object.keys(data).forEach(country => {
//     if(data[country].length == 7) {
//         console.log(country);
//         console.log(data[country].length);
//     }
// });