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
    let cells = Array.from(container.querySelectorAll('.vis-memory-box'));
    const btnStart = container.querySelector('.btn1'); // Start / Next
    const btnConfirm = container.querySelector('.btn3'); // Confirm
    const btnReset = container.querySelector('.btn2'); // Reset
    const statusEl = container.querySelector('.status'); // message UX
    if (!cells.length || !btnStart || !btnConfirm || !btnReset) return;

    //cells expand
    const boxContainer = container.querySelector('.vis-memory-boxes');
    const INITIAL_CELL_COUNT = cells.length;
    const INITIAL_GRID_SIZE = Math.round(Math.sqrt(INITIAL_CELL_COUNT));
    const refreshCells = () => {
        cells = Array.from(container.querySelectorAll('.vis-memory-box'));
    };
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
    const makeCell = () => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vis-memory-box';
        btn.setAttribute('aria-label', 'cell');
        return btn;
    };
    // set number of cells
    const setGridCols = (cols) => {
        if (!boxContainer) return;
        boxContainer.style.display = 'grid';
        boxContainer.style.gridTemplateColumns = `repeat(${cols}, 64px)`;
        if (!boxContainer.style.gap) boxContainer.style.gap = '8px';
    };
    const setGridSize = (size) => {
        if (!boxContainer) return;
        const want = size * size;
        const have = boxContainer.children.length;

        if (have < want) {
            for (let i = 0; i < want - have; i++) boxContainer.appendChild(makeCell());
        } else if (have > want) {
            for (let i = 0; i < have - want; i++) boxContainer.lastElementChild.remove();
        }
        setGridCols(size);
        refreshCells();
    };
    const resetGridToInitial = () => setGridSize(INITIAL_GRID_SIZE);
    // helpers UI
    const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };
    const setBusy = (val) => {
        container._state.busy = val;
        container.classList.toggle('is-busy', val);
    };
    const clearVisual = () => {
        cells.forEach(c => {
            c.classList.remove('is-lit', 'is-selected', 'is-correct', 'is-wrong');
            c.style.backgroundColor = '';
        });
    };
    // logical calculation for how difficult the round is
    const computeTarget = () => {
        const s = container._state;
        return Math.min(s.baseCount + (s.level - 1), cells.length);
    };
    // displaying the memorized pattern
    const showPattern = () => {
        const s = container._state;
        s.phase = 'memorize';
        setBusy(true);
        setStatus('Memorize…');

        s.solution.forEach(idx => cells[idx].classList.add('is-lit'));

        setTimeout(() => {
            s.solution.forEach(idx => cells[idx].classList.remove('is-lit'));
            s.phase = 'select';
            setBusy(false);
            setStatus(`Select ${s.solution.size} cells.`);
            btnConfirm.disabled = true;
        }, s.memTime);
    };
    const startRound = () => {
        const s = container._state;
        if (s.busy) return;
        // visual reset + states
        clearVisual();
        s.selected.clear();
        s.solution.clear();

        // calculate how many cells light up
        const target = computeTarget();
        const chosen = pickUnique(target, cells.length);
        chosen.forEach(i => s.solution.add(i));
        btnStart.disabled = true;
        btnConfirm.disabled = true;
        setStatus(`Level ${s.level}: Get ready!`);
        showPattern();
    };
    const onCellClick = (e) => {
        const s = container._state;
        if (s.phase !== 'select' || s.busy) return;

        const cell = e.target.closest('.vis-memory-box');
        if (!cell) return;

        const idx = cells.indexOf(cell);
        if (idx < 0) return;

        if (s.selected.has(idx)) {
            s.selected.delete(idx);
            cell.classList.remove('is-selected');
        } else {
            if (s.selected.size >= s.solution.size) return;
            s.selected.add(idx);
            cell.classList.add('is-selected');
        }
        btnConfirm.disabled = (s.selected.size !== s.solution.size);
    };
    const confirmSelection = () => {
        const s = container._state;
        if (s.phase !== 'select' || s.busy) return;
        s.phase = 'feedback';
        setBusy(true);
        // visual feedback
        // correct: selected ∩ solution
        s.selected.forEach(idx => {
            if (s.solution.has(idx)) {
                cells[idx].classList.add('is-correct');
            } else {
                cells[idx].classList.add('is-wrong');
            }
        });
        s.solution.forEach(idx => {
            if (!s.selected.has(idx)) {
                cells[idx].classList.add('is-lit');
            }
        });
        // verdict
        const success =
            s.selected.size === s.solution.size &&
            Array.from(s.solution).every(idx => s.selected.has(idx));

        if (success) {
            setStatus('Corect! 🎉');
            s.level += 1;
        } else {
            setStatus('Wrong. Try again.');
        }
        // after short feedback, we prepare next/ retry
        setTimeout(() => {
            // clear temporary markers (but keep visual selection if user want)
            cells.forEach(c => c.classList.remove('is-lit', 'is-correct', 'is-wrong', 'is-selected'));
            s.selected.clear();

            s.phase = 'idle';
            setBusy(false);
            btnStart.disabled = false;
            btnConfirm.disabled = true;
            setStatus(`Current level: ${s.level}. Press Start.`);
        }, 800);
    };
    const resetGame = () => {
        const s = container._state;
        s.level = 1;
        s.solution.clear();
        s.selected.clear();
        s.phase = 'idle';
        setBusy(false);
        clearVisual();
        btnStart.disabled = false;
        btnConfirm.disabled = true;
        setStatus('Game reset. Press Start.');
    };
    // listeners atached once
    container.addEventListener('click', onCellClick);
    btnStart.addEventListener('click', startRound);
    btnConfirm.addEventListener('click', confirmSelection);
    btnReset.addEventListener('click', resetGame);
    // init UI
    btnConfirm.disabled = true;
    setStatus('Ready. Press Start.');
}
document.querySelectorAll('.con1').forEach(initGame);