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
    const btni1 = container.querySelector('.btni1');
    let btni1c = false;
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
        busy: false,
        gridSize: INITIAL_GRID_SIZE
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
        if (boxContainer) boxContainer.style.setProperty('--cols', cols);
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
    const getDesiredGridSizeForLevel = (level) => {
        const expansions = Math.floor((level - 1) / 7);
        return INITIAL_GRID_SIZE + expansions;
    };

    const ensureGridForLevel = () => {
        const s = container._state;
        const desired = getDesiredGridSizeForLevel(s.level);
        if (!s.gridSize || s.gridSize !== desired) {
            setGridSize(desired);
            s.gridSize = desired;
        }
    };
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

        const ensureGridForLevel = () => {
            const s = container._state;
            const desired = getDesiredGridSizeForLevel(s.level);
            if (!s.gridSize || s.gridSize !== desired) {
                setGridSize(desired);
                s.gridSize = desired;
                refreshCells();
            }
        };
        // visual reset + states
        clearVisual();
        s.selected.clear();
        s.solution.clear();
        container.classList.add('tog');
        btni1.classList.add('visible');
        if (btni1 && !btni1c) {
            btni1.addEventListener('click', () => {
                container.classList.remove('tog');
                btni1.classList.remove('visible');
            });
            btni1c = true;
        }
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
            vm_pushTopScore(s.level - 1);
            vm_renderScoreboard();
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
        resetGridToInitial();
        s.gridSize = INITIAL_GRID_SIZE;
        clearVisual();
        btnStart.disabled = false;
        btnConfirm.disabled = true;
        setStatus('Game reset. Press Start.');
        vm_renderScoreboard();
    };
    // listeners atached once
    container.addEventListener('click', onCellClick);
    btnStart.addEventListener('click', () => {
        requireAuth(() => startRound());
    });
    btnConfirm.addEventListener('click', confirmSelection);
    btnReset.addEventListener('click', resetGame);
    // init UI
    btnConfirm.disabled = true;
    setStatus('Ready. Press Start.');
}
document.querySelectorAll('.con1').forEach(initGame);

// user, and score storage 
const VM_STORE = {
    currentKey: 'vm_current_player',
    playersKey: 'vm_players'
};
const vm_loadPlayers = () => {
    try { return JSON.parse(localStorage.getItem(VM_STORE.playersKey)) || {}; }
    catch { return {}; }
};
const vm_savePlayers = (obj) => localStorage.setItem(VM_STORE.playersKey, JSON.stringify(obj || {}));

const vm_getCurrentId = () => localStorage.getItem(VM_STORE.currentKey) || null;
const vm_setCurrentId = (id) => localStorage.setItem(VM_STORE.currentKey, id);

const vm_getCurrentPlayer = () => {
    const id = vm_getCurrentId();
    if (!id) return null;
    const players = vm_loadPlayers();
    return players[id] || null;
};
const vm_upsertPlayer = ({ name, email }) => {
    const players = vm_loadPlayers();
    const id = (email && email.trim()) ? `email:${email.trim().toLowerCase()}` :
        (name && name.trim()) ? `name:${name.trim().toLowerCase()}` :
            `anon:${Date.now()}`;
    if (!players[id]) {
        players[id] = { id, name: name?.trim() || '', email: email?.trim() || '', records: { visualMemory: { highLevel: 1 } } };
    } else {
        if (name && name.trim()) players[id].name = name.trim();
        if (email && email.trim()) players[id].email = email.trim();
        if (!players[id].records?.visualMemory) players[id].records = { visualMemory: { highLevel: 1 } };
    }
    vm_savePlayers(players);
    vm_setCurrentId(id);
    return players[id];
};
const vm_updateHighLevel = (levelReached) => {
    const player = vm_getCurrentPlayer();
    if (!player) return;
    const players = vm_loadPlayers();
    const p = players[player.id];
    const cur = p.records?.visualMemory?.highLevel || 1;
    if (levelReached > cur) {
        p.records.visualMemory.highLevel = levelReached;
        vm_savePlayers(players);
    }
};
const authModal = document.getElementById('sign');
const authForm = document.getElementById('registration-form');
const authClose = authModal?.querySelector('.sign-btnc');

const vm_openAuth = () => {
    if (!authModal) return;
    authModal.setAttribute('aria-hidden', 'false');
    authModal.querySelector('#auth-name')?.focus();
};
const vm_closeAuth = () => authModal?.setAttribute('aria-hidden', 'true');

const requireAuth = (onReady) => {
    const user = vm_getCurrentPlayer();
    if (user) { onReady?.(user); return; }
    vm_openAuth();
    const onSubmit = (e) => {
        e.preventDefault();
        const name = authForm.querySelector('#auth-name')?.value || '';
        const email = authForm.querySelector('#auth-email')?.value || '';
        if (!name.trim() && !email.trim()) {
            alert('Enter your name or email (at least one).');
            return;
        }
        const u = vm_upsertPlayer({ name, email });
        vm_closeAuth();
        authForm.removeEventListener('submit', onSubmit);
        onReady?.(u);
    };
    authForm?.addEventListener('submit', onSubmit);
};
authClose?.addEventListener('click', vm_closeAuth);
authModal?.addEventListener('click', (e) => {
    if (e.target === authModal) vm_closeAuth();
});

const vm_pushTopScore = (levelReached) => {
    const players = vm_loadPlayers();
    const cur = vm_getCurrentPlayer(); if (!cur) return;
    const p = players[cur.id];
    const top = Array.isArray(p.records.visualMemory.top) ? p.records.visualMemory.top.slice() : [];
    top.push(levelReached);
    const unique = [...new Set(top)];
    unique.sort((a, b) => b - a);
    p.records.visualMemory.top = unique.slice(0, 3);
    const hl = p.records.visualMemory.highLevel || 1;
    if (levelReached > hl) p.records.visualMemory.highLevel = levelReached;
    vm_savePlayers(players);
};
const vm_renderScoreboard = () => {
    const panel = document.getElementById('records');
    if (!panel) return;
    const title = panel.querySelector('.title');
    const userEl = panel.querySelector('.player-name');
    const list = panel.querySelector('.or-player');

    title && (title.textContent = 'Visual Memory');
    const cur = vm_getCurrentPlayer();
    userEl && (userEl.textContent = cur?.name || cur?.email || 'Guest');

    if (list) {
        list.innerHTML = '';
        const top = cur?.records?.visualMemory?.top || [];
        if (top.length === 0) {
            const li = document.createElement('li');
            li.textContent = '— you don t have any scores yet —';
            list.appendChild(li);
        } else {
            top.forEach((lvl, i) => {
                const li = document.createElement('li');
                li.textContent = `#${i + 1}: Level ${lvl}`;
                list.appendChild(li);
            });
        }
    }
};
document.getElementById('nav-play')?.addEventListener('click', (e) => {
    e.preventDefault();
    requireAuth(() => {
        document.getElementById('vis-memory-game')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Number memory
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.con2');
    containers.forEach(initNumberMemory);
});

function initNumberMemory(container) {
    const box = container.querySelector('.numberr');
    const input = container.querySelector('#number');
    const btnStart = container.querySelector('.btn1');
    const btnSubmit = container.querySelector('.btn3');
    const btnReset = container.querySelector('.btn2');
    const statusEl = container.querySelector('.status');

    if (!box || !input || !btnStart || !btnSubmit || !btnReset || !statusEl) {
        console.warn('NumberMemory: missing items in container', container);
        return;
    }

    const state = {
        level: 1,
        memTime: 1200,
        current: '',
        phase: 'idle',
        busy: false
    };

    const setStatus = (msg) => { statusEl.textContent = msg; };
    const setBusy = (v) => {
        state.busy = v;
        container.classList.toggle('is-busy', v);
    };
    const clearUI = () => { box.textContent = ''; input.value = ''; };

    const randomNumberForLevel = (lvl) => {
        const d = Math.max(1, lvl);
        if (d === 1) {

            return String(Math.floor(Math.random() * 10));
        }
        const min = Math.pow(10, d - 1);
        const max = Math.pow(10, d) - 1;
        const n = Math.floor(Math.random() * (max - min + 1)) + min;
        return String(n);
    };
}