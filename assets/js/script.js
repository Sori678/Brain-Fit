// toggle navbar 
const navBarr = document.getElementById('barr');
const navMenu = document.querySelector('.nav-menu');
if (navBarr && navMenu) {
    navBarr.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
    });
}