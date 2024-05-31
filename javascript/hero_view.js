// get the hero view object
var hero_view = document.getElementById('hero');
const url_link = "https://wallpapers.com/images/hd/travel-hd-2fsg31b3wqteinpa.jpg"

// get the hero view object
var hero_view = document.getElementById('hero');
hero_view.style.background = "url('https://source.unsplash.com/1920x1080/?travel') no-repeat center center/cover";
var backgroundImageUrl = hero_view.style.background.slice(4, -1).replace(/"/g, "");
var image = new Image();
image.src = backgroundImageUrl;
image.onerror = function() {
    console.log("Background image is not valid or accessible. Using default image.");
    hero_view.style.background = `url(${url_link}) no-repeat center center/cover`;
};