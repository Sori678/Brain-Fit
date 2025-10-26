// toggle navbar 
const navBarr = document.getElementById('barr');
const navMenu = document.querySelector('.nav-menu');
if (navBarr && navMenu) {
    navBarr.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
    });
}
// game init 
function initGame(container) {
    const cells = Array.from(container.querySelectorAll('.vis-memory-box'));
    const btnStart = container.querySelector('.btn1'); // Start / Next
    const btnConfirm = container.querySelector('.btn3'); // Confirm
    const btnReset = container.querySelector('.btn2'); // Reset
    const statusEl = container.querySelector('.status'); // message UX
    if (!cells.length || !btnStart || !btnConfirm || !btnReset) return;
}
document.querySelectorAll('.con1').forEach(initGame);