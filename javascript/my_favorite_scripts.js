if(localStorage.getItem('favoriteAttractions')) {
    var favoriteAttractions = JSON.parse(localStorage.getItem('favoriteAttractions'));
}
else
    var favoriteAttractions = [];
console.log(favoriteAttractions);


// add new row in the table for favorite attractions
function addFavoriteAttractionRow(favoriteAttractions) {
    var table = document.getElementById('favorite-attractions-table');
    favoriteAttractions.forEach(favoriteAttraction => {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        for(let i = 0; i < data[favoriteAttraction.country].length; i++) {
            if(data[favoriteAttraction.country][i].name !== favoriteAttraction.name) 
                continue;
            cell1.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${data[favoriteAttraction.country][i].image_url}" alt="${data[favoriteAttraction.country][i].name}" class="mr-3">
                    <div>
                        <h5 class="mb-0">${data[favoriteAttraction.country][i].name}</h5>
                        <small class="text-muted">${favoriteAttraction.country}</small> <br>
                        <small class="text-muted">${data[favoriteAttraction.country][i].score}</small>
                    </div>
                </div>
            `;
        }
        cell2.innerHTML = `
            <button class="btn btn-danger" onclick="removeFavoriteAttraction('${favoriteAttraction.country}', '${favoriteAttraction.name}')">Remove</button>
        `;
    });
}

// remove favorite attraction from the list
function removeFavoriteAttraction(country, name) {
    favoriteAttractions = favoriteAttractions.filter(favoriteAttraction => favoriteAttraction.country !== country || favoriteAttraction.name !== name);
    localStorage.setItem('favoriteAttractions', JSON.stringify(favoriteAttractions));
    location.reload();
}

// click on a favorite attraction to go to the attraction page
function goToAttractionPage(country, name) {
    localStorage.setItem('attraction_country', country);
    localStorage.setItem('attraction_name', name);
    window.location.href = 'attraction.html';
}


addFavoriteAttractionRow(favoriteAttractions);

window.onload = function() {
    var table = document.getElementById('favorite-attractions-table');
    if(table.rows.length === 0) {
        table.innerHTML = `
            <div class="text-center">
                <h5 class="text-muted">No favorite attractions yet</h5>
            </div>
        `;
    }
    else {
        // add click event for each favorite attraction
        for(let i = 0; i < table.rows.length; i++) {
            table.rows[i].querySelector('td').onclick = function() {
                goToAttractionPage(favoriteAttractions[i].country, favoriteAttractions[i].name);
            }
        }
    }
}