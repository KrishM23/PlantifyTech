document.addEventListener('DOMContentLoaded', () => {
    const contactPopupBtn = document.querySelector('.contact-popup-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closeBtn = document.querySelector('.close-btn');

    contactPopupBtn.addEventListener('click', () => {
        contactPopup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        contactPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === contactPopup) {
            contactPopup.style.display = 'none';
        }
    });
});
