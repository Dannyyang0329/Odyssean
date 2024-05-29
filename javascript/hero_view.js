// get the hero view object
var hero_view = document.getElementById('hero');
// const url_link = '../data/image/hero-image.webp';
const url_link = "https://wallpapers.com/images/hd/travel-hd-2fsg31b3wqteinpa.jpg"
// get the hero view object
var hero_view = document.getElementById('hero');
var backgroundImageUrl = hero_view.style.backgroundImage.slice(4, -1).replace(/"/g, "");
var image = new Image();
image.src = backgroundImageUrl;
image.onerror = function() {
    console.log("Background image is not valid or accessible. Using default image.");
    hero_view.style.background = `url(${url_link}) no-repeat center center/cover`;
};