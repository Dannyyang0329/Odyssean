document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.opacity = '1';
    formContainer.style.transform = 'translateY(0)';

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        event.preventDefault();
        alert('Form submitted.');
    });
});
