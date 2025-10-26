// toggle navbar 
const navBarr = document.getElementById('barr');
const navMenu = document.querySelector('.nav-menu');
if (navBarr && navMenu) {
    navBarr.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
    });
}

// pick unique number 
function pickUnique(count, max) {
    const out = [];
    while (out.length < count) {
        const idx = Math.floor(Math.random() * max);
        if (!out.includes(idx)) out.push(idx);
    }
    return out;
}
// game init 
function initGame(container) {
    const cells = Array.from(container.querySelectorAll('.vis-memory-box'));
    const btnStart = container.querySelector('.btn1'); // Start / Next
    const btnConfirm = container.querySelector('.btn3'); // Confirm
    const btnReset = container.querySelector('.btn2'); // Reset
    const statusEl = container.querySelector('.status'); // message UX
    if (!cells.length || !btnStart || !btnConfirm || !btnReset) return;
    // game state attached to the container
    container._state = {
        level: 1,
        baseCount: 3,
        memTime: 1000,  
        solution: new Set(),
        selected: new Set(),
        phase: 'idle',
        busy: false
    };
}
document.querySelectorAll('.con1').forEach(initGame);