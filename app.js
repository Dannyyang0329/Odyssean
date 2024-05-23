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
