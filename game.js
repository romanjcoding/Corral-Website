const params   = new URLSearchParams(location.search);
const puzzleId = params.get('id');
const PUZZLE   = PUZZLES_BY_ID[puzzleId];

if (!PUZZLE || !isUnlocked(PUZZLE)) {
  location.replace('index.html');
  throw new Error(`Puzzle unavailable: ${puzzleId}`);
}

const ROWS   = PUZZLE.rows ?? 15;
const COLS   = PUZZLE.cols ?? 15;
const PIECES = PUZZLE.pieces;

document.title = `Corral — ${PUZZLE.name}`;
document.getElementById('puzzle-name').textContent = PUZZLE.name;
const diffEl = document.getElementById('puzzle-difficulty');
diffEl.textContent = '';
if (PUZZLE.difficulty != null) {
  diffEl.title = `Difficulty: ${PUZZLE.difficulty}/10`;
  const badgeSize = document.documentElement.clientWidth <= 720 ? 5 : 8;
  diffEl.appendChild(
    miniIcon(difficultyCells(PUZZLE.difficulty), difficultyColor(PUZZLE.difficulty), badgeSize)
  );
}

{
  const open = unlockedPuzzles();     // never step onto a puzzle that isn't out
  const i    = open.indexOf(PUZZLE);
  const prev = document.getElementById('nav-prev');
  const next = document.getElementById('nav-next');
  if (open[i - 1]) prev.href = `puzzle.html?id=${encodeURIComponent(open[i - 1].id)}`;
  else prev.style.visibility = 'hidden';
  if (open[i + 1]) next.href = `puzzle.html?id=${encodeURIComponent(open[i + 1].id)}`;
  else next.style.visibility = 'hidden';
}

const key    = (r, c) => `${r},${c}`;
const rotCW  = cells => cells.map(([r, c]) => [ c, -r]);
const rotCCW = cells => cells.map(([r, c]) => [-c,  r]);
const flip   = cells => cells.map(([r, c]) => [ r, -c]);

const D4 = [
  cells => cells.map(([r, c]) => [ r,  c]),   // 0  identity
  cells => cells.map(([r, c]) => [ c, -r]),   // 1  rotate CW
  cells => cells.map(([r, c]) => [-r, -c]),   // 2  rotate 180
  cells => cells.map(([r, c]) => [-c,  r]),   // 3  rotate CCW
  cells => cells.map(([r, c]) => [ r, -c]),   // 4  mirror
  cells => cells.map(([r, c]) => [-c, -r]),   // 5  mirror + CW
  cells => cells.map(([r, c]) => [-r,  c]),   // 6  mirror + 180
  cells => cells.map(([r, c]) => [ c,  r]),   // 7  mirror + CCW
];

function anchored(cells) {
  const mr = Math.min(...cells.map(x => x[0]));
  const mc = Math.min(...cells.map(x => x[1]));
  return cells.map(([r, c]) => [r - mr, c - mc]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}
const shapeKey = cells => anchored(cells).map(([r, c]) => `${r},${c}`).join(' ');

function orientationOf(base, cells) {
  const want = shapeKey(cells);
  for (let d = 0; d < 8; d++) if (shapeKey(D4[d](base)) === want) return d;
  return -1;
}

function centerCell(shape) {
  const cr = shape.reduce((s, [r]) => s + r, 0) / shape.length;
  const cc = shape.reduce((s, [, c]) => s + c, 0) / shape.length;
  const d2 = ([r, c]) => (r - cr) ** 2 + (c - cc) ** 2;
  return shape.reduce((best, x) => d2(x) < d2(best) ? x : best);
}

function placement(shape, hr, hc) {
  const [gr, gc] = grabOffset;
  const cells = shape.map(([r, c]) => [r - gr + hr, c - gc + hc]);
  const rs = cells.map(x => x[0]), cs = cells.map(x => x[1]);
  const dr = -Math.min(0, ...rs) - Math.max(0, Math.max(...rs) - (ROWS - 1));
  const dc = -Math.min(0, ...cs) - Math.max(0, Math.max(...cs) - (COLS - 1));
  return cells.map(([r, c]) => [r + dr, c + dc]);
}

const occupied = new Map();              // "r,c" -> piece index
const shapes   = PIECES.map(p => p.cells.map(x => [...x]));
let selected   = null;                   // index of piece being placed, or null
let hovered    = null;                   // [r,c] under the cursor, or null
let grabOffset = [0, 0];                 // shape cell currently held

const gridEl = document.getElementById('grid');
const trayEl = document.getElementById('tray');

gridEl.style.gridTemplateColumns = `repeat(${COLS}, var(--cell-size))`;
gridEl.style.gridTemplateRows    = `repeat(${ROWS}, var(--cell-size))`;

let touchMode = matchMedia('(hover: none) and (pointer: coarse)').matches;

const pieceControls = document.getElementById('piece-controls');

let dragFrom = null;
let fromTray = false;

const AIM_LIFT = 1.6;   // cells the piece sits above that first placing touch

const MAX_CELL       = 32;
const MAX_CELL_PHONE = 16;
const PHONE_WIDTH    = 500;
const MIN_CELL       = 12;
const BAR_RESERVE    = 80;

const mainEl   = document.querySelector('main');
const headerEl = document.querySelector('.puzzle-header');
const wrapEl   = document.querySelector('.board-wrapper');

function fitBoard() {
  const doc  = document.documentElement;
  const body = getComputedStyle(document.body);
  const padX = parseFloat(body.paddingLeft) + parseFloat(body.paddingRight);
  const padY = parseFloat(body.paddingTop)  + parseFloat(body.paddingBottom);
  const gap  = parseFloat(getComputedStyle(mainEl).rowGap) || 0;

  const availW = doc.clientWidth - padX - 2;
  const byW = Math.floor((availW - (COLS - 1)) / COLS);

  const barRow = wrapEl.offsetHeight - gridEl.offsetHeight;   // 0 unless the tools wrap above
  const chrome = padY + headerEl.offsetHeight + trayEl.offsetHeight + barRow + gap * 2;

  const availH = doc.clientHeight - chrome - (touchMode ? BAR_RESERVE : 0);
  const byH = Math.floor((availH - (ROWS - 1)) / ROWS);

  const cap = doc.clientWidth <= PHONE_WIDTH ? MAX_CELL_PHONE : MAX_CELL;
  const size = Math.max(MIN_CELL, Math.min(cap, byW, byH));
  doc.style.setProperty('--cell-size', `${size}px`);
}

const gridStep  = () => (gridEl.getBoundingClientRect().width + 1) / COLS;
const clampCell = (r, c) => [
  Math.max(0, Math.min(ROWS - 1, r)),
  Math.max(0, Math.min(COLS - 1, c)),
];

function cellFromPoint(x, y, lift = 0) {
  const rect = gridEl.getBoundingClientRect();
  const step = gridStep();                   // cell size plus the 1px gap
  return clampCell(
    Math.floor((y - rect.top  - lift * step) / step),
    Math.floor((x - rect.left) / step),
  );
}

function render() {
  const preview = new Set(), previewBad = new Set();
  if (selected !== null && hovered) {
    for (const [r, c] of placement(shapes[selected], ...hovered)) {
      const k = key(r, c);
      (occupied.has(k) ? previewBad : preview).add(k);
    }
  }
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const cell = gridEl.children[r * COLS + c], k = key(r, c);
    cell.style.background =
      previewBad.has(k) ? '#f88' :
      preview.has(k)    ? PIECES[selected].color :
      occupied.has(k)   ? PIECES[occupied.get(k)].color :
                          '#f6eee3';
    cell.style.cursor = (selected === null && occupied.has(k)) ? 'grab' : '';
  }
  [...trayEl.children].forEach((el, i) => el.classList.toggle('active', i === selected));

  pieceControls.hidden = !(touchMode && selected !== null);
}

function boardChanged() {
  render();
  updateAreaCounter();
  syncUrl();
}

function liftPiece(idx, clickR, clickC) {
  const boardCells = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    if (occupied.get(key(r, c)) === idx) { boardCells.push([r, c]); occupied.delete(key(r, c)); }
  const minR = Math.min(...boardCells.map(x => x[0]));
  const minC = Math.min(...boardCells.map(x => x[1]));
  const sMinR = Math.min(...shapes[idx].map(x => x[0]));
  const sMinC = Math.min(...shapes[idx].map(x => x[1]));
  grabOffset = [clickR - minR + sMinR, clickC - minC + sMinC];

  trayEl.children[idx].classList.remove('used');
  selected = idx;
  boardChanged();
}

function place(r, c) {
  if (flooding) return;
  if (selected === null) {
    if (occupied.has(key(r, c))) liftPiece(occupied.get(key(r, c)), r, c);
    return;
  }
  const cells = placement(shapes[selected], r, c);
  if (cells.some(([r2, c2]) => occupied.has(key(r2, c2)))) return;
  for (const [r2, c2] of cells) occupied.set(key(r2, c2), selected);
  trayEl.children[selected].classList.add('used');
  selected = null;
  dragFrom = null;
  fromTray = false;
  boardChanged();
}

function transform(fn) {
  shapes[selected] = fn(shapes[selected]);
  grabOffset = fn([grabOffset])[0];
}

function buildGrid() {
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.onmouseenter = () => { if (!touchMode && !flooding) { hovered = [r, c]; render(); } };
    cell.onclick      = () => { if (!touchMode) place(r, c); };
    gridEl.appendChild(cell);
  }
  gridEl.onmouseleave = () => { if (!touchMode) { hovered = null; render(); } };

  const startDrag = e => {
    if (!hovered) hovered = cellFromPoint(e.clientX, e.clientY, AIM_LIFT);
    dragFrom = { x: e.clientX, y: e.clientY, r: hovered[0], c: hovered[1] };
  };

  gridEl.addEventListener('pointerdown', e => {
    const isTouch = e.pointerType === 'touch';
    if (isTouch !== touchMode) { touchMode = isTouch; fitBoard(); render(); }
    if (!touchMode || flooding) return;
    e.preventDefault();

    if (selected === null) {
      const [r, c] = cellFromPoint(e.clientX, e.clientY);
      if (!occupied.has(key(r, c))) return;
      liftPiece(occupied.get(key(r, c)), r, c);
      hovered = [r, c];
      fromTray = false;
    } else if (fromTray) {
      hovered = cellFromPoint(e.clientX, e.clientY, AIM_LIFT);
      fromTray = false;
    }
    startDrag(e);
    render();
    gridEl.setPointerCapture(e.pointerId);   // keep tracking even off the board
  });

  gridEl.addEventListener('pointermove', e => {
    if (!touchMode || selected === null || !dragFrom) return;
    if (!gridEl.hasPointerCapture(e.pointerId)) return;

    const step = gridStep();
    hovered = clampCell(
      dragFrom.r + Math.round((e.clientY - dragFrom.y) / step),
      dragFrom.c + Math.round((e.clientX - dragFrom.x) / step),
    );
    render();
  });

  gridEl.addEventListener('pointerup',     () => { dragFrom = null; });
  gridEl.addEventListener('pointercancel', () => { dragFrom = null; });
}

function pieceIcon(cells, color) {
  const minR = Math.min(...cells.map(x => x[0])), minC = Math.min(...cells.map(x => x[1]));
  const filled = new Set(cells.map(([r, c]) => key(r - minR, c - minC)));
  const rows = Math.max(...cells.map(x => x[0])) - minR;
  const cols = Math.max(...cells.map(x => x[1])) - minC;

  const g = document.createElement('div');
  g.className = 'piece-grid';
  g.style.gridTemplateColumns = `repeat(${cols + 1}, var(--piece-cell))`;
  for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
    const d = document.createElement('div');
    d.className = 'pc';
    if (filled.has(key(r, c))) d.style.background = color;
    g.appendChild(d);
  }
  return g;
}

function buildTray() {
  PIECES.forEach((p, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'piece';
    wrap.appendChild(pieceIcon(p.cells, p.color));
    wrap.onclick = () => {
      if (flooding) return;
      selected = (selected === i) ? null : i;
      dragFrom = null;
      fromTray = selected !== null;
      if (selected !== null) {
        grabOffset = centerCell(shapes[selected]);
        if (touchMode && !hovered) hovered = [Math.floor(ROWS / 2), Math.floor(COLS / 2)];
      }
      render();
    };
    trayEl.appendChild(wrap);
  });
}
function enclosedSet(rows, cols, isWall) {
  const outside = new Set();
  const stack = [];

  const seed = (r, c) => {
    const k = key(r, c);
    if (!isWall(r, c) && !outside.has(k)) { outside.add(k); stack.push([r, c]); }
  };
  for (let c = 0; c < cols; c++) { seed(0, c); seed(rows - 1, c); }
  for (let r = 0; r < rows; r++) { seed(r, 0); seed(r, cols - 1); }

  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r + dr, nc = c + dc, k = key(nr, nc);
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (isWall(nr, nc) || outside.has(k)) continue;
      outside.add(k);
      stack.push([nr, nc]);
    }
  }

  const inside = new Set();
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = key(r, c);
    if (!isWall(r, c) && !outside.has(k)) inside.add(k);
  }
  return inside;
}

function enclosedArea() {
  return enclosedSet(ROWS, COLS, (r, c) => occupied.has(key(r, c))).size;
}

const counterEl = document.getElementById('area-counter');

function updateAreaCounter() {
  const area = enclosedArea();
  let text = String(area);
  if (PUZZLE.bestKnown != null) {
    text = `${area} / ${PUZZLE.bestKnown}`;
  }
  counterEl.textContent = text;

  // green whenever you're at or past the record — the animation is the one-off
  const record = PUZZLE.bestKnown != null && area >= PUZZLE.bestKnown;
  counterEl.classList.toggle('record', record);
  if (record && !celebrated) {
    celebrated = true;
    celebrate();
  }
}

let celebrated = false;
let flooding   = false;   // board input is ignored while the wave runs
let floodToken = 0;       // bumped to cancel a wave in flight

const WAVE_MS      = 10000;        // budget for the flood, however deep it is
const SETTLE_MS    = 300;
const REVEAL_MS    = 750;
const CREST        = '#6FAEDA';  // the advancing edge of the flood
const FLOODED      = '#DCE8F2';  // where it has already been
const ENCLOSED     = '#9FE0B7';  // what it never reached — your score

const sleep = ms => new Promise(r => setTimeout(r, ms));
const paint = (r, c, colour) => { gridEl.children[r * COLS + c].style.background = colour; };

function floodLayers() {
  const isWall = (r, c) => occupied.has(key(r, c));
  const seen = new Set();
  const layers = [];
  let frontier = [];

  const reach = (r, c) => {
    const k = key(r, c);
    if (isWall(r, c) || seen.has(k)) return;
    seen.add(k);
    frontier.push([r, c]);
  };

  for (let c = 0; c < COLS; c++) { reach(0, c); reach(ROWS - 1, c); }
  for (let r = 0; r < ROWS; r++) { reach(r, 0); reach(r, COLS - 1); }

  while (frontier.length) {
    layers.push(frontier);
    const ring = frontier;
    frontier = [];
    for (const [r, c] of ring) {
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
        reach(nr, nc);
      }
    }
  }

  const inside = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    if (!isWall(r, c) && !seen.has(key(r, c))) inside.push([r, c]);

  return { layers, inside };
}

async function celebrate() {
  const token = ++floodToken;
  const alive = () => token === floodToken;

  const { layers, inside } = floodLayers();
  if (!layers.length) return;

  flooding = true;
  selected = null;
  hovered  = null;
  render();
  gridEl.classList.add('flooding');
  pieceControls.hidden = true;

  const step = Math.max(10, Math.min(150, WAVE_MS / layers.length));
  for (let i = 0; i < layers.length; i++) {
    for (const [r, c] of layers[i]) paint(r, c, CREST);
    if (i > 0) for (const [r, c] of layers[i - 1]) paint(r, c, FLOODED);
    await sleep(step);
    if (!alive()) return;
  }
  for (const [r, c] of layers[layers.length - 1]) paint(r, c, FLOODED);

  await sleep(SETTLE_MS);
  if (!alive()) return;

  for (const [r, c] of inside) paint(r, c, ENCLOSED);
  counterEl.classList.add('pop');

  await sleep(REVEAL_MS);
  if (!alive()) return;

  gridEl.classList.remove('flooding');
  counterEl.classList.remove('pop');
  flooding = false;
  render();
}

const SHARE_VERSION = 1;
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const B64_INDEX = Object.fromEntries([...B64].map((ch, i) => [ch, i]));

const bitsFor = n => Math.max(1, Math.ceil(Math.log2(n)));

function cellsByPiece() {
  const out = PIECES.map(() => []);
  for (const [k, idx] of occupied) {
    const [r, c] = k.split(',').map(Number);
    out[idx].push([r, c]);
  }
  return out;
}

function encodeState() {
  const bits = [];
  const put = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >> i) & 1); };
  const rBits = bitsFor(ROWS), cBits = bitsFor(COLS);

  put(SHARE_VERSION, 4);
  cellsByPiece().forEach((cells, i) => {
    if (!cells.length) { put(0, 1); return; }
    const d = orientationOf(PIECES[i].cells, cells);
    if (d < 0) console.warn(`piece ${i} is in an orientation that isn't a transform of its cells`);
    put(1, 1);
    put(Math.max(0, d), 3);
    put(Math.min(...cells.map(x => x[0])), rBits);
    put(Math.min(...cells.map(x => x[1])), cBits);
  });

  while (bits.length % 6) bits.push(0);
  let out = '';
  for (let i = 0; i < bits.length; i += 6)
    out += B64[bits.slice(i, i + 6).reduce((v, b) => (v << 1) | b, 0)];
  return out;
}

// -> { board, orientations } for a valid code, or null for anything else.
function decodeState(code) {
  const bits = [];
  for (const ch of code) {
    const v = B64_INDEX[ch];
    if (v === undefined) return null;
    for (let i = 5; i >= 0; i--) bits.push((v >> i) & 1);
  }

  let p = 0;
  const take = n => {
    if (p + n > bits.length) return null;
    let v = 0;
    for (let i = 0; i < n; i++) v = (v << 1) | bits[p++];
    return v;
  };

  if (take(4) !== SHARE_VERSION) return null;

  const rBits = bitsFor(ROWS), cBits = bitsFor(COLS);
  const board = new Map(), orientations = new Map();

  for (let i = 0; i < PIECES.length; i++) {
    const placed = take(1);
    if (placed === null) return null;
    if (!placed) continue;

    const d = take(3), r0 = take(rBits), c0 = take(cBits);
    if (d === null || r0 === null || c0 === null) return null;

    const shape = anchored(D4[d](PIECES[i].cells));
    orientations.set(i, shape);
    for (const [r, c] of shape) {
      const R = r + r0, C = c + c0;
      if (R < 0 || R >= ROWS || C < 0 || C >= COLS) return null;  // off the board
      if (board.has(key(R, C))) return null;                      // pieces overlap
      board.set(key(R, C), i);
    }
  }

  if (bits.length - p >= 6) return null;
  for (let i = p; i < bits.length; i++) if (bits[i]) return null;

  return { board, orientations };
}

function applyState({ board, orientations }) {
  occupied.clear();
  selected = null;
  hovered  = null;
  [...trayEl.children].forEach(el => el.classList.remove('used'));

  for (const [k, i] of board) occupied.set(k, i);
  for (const [i, shape] of orientations) {
    shapes[i] = shape.map(x => [...x]);   // so lifting the piece keeps its pose
    trayEl.children[i].classList.add('used');
  }
}

function shareUrl() {
  const url = new URL(location.href);
  if (occupied.size) url.searchParams.set('s', encodeState());
  else               url.searchParams.delete('s');
  return url.toString();
}

function syncUrl() {
  try { history.replaceState(null, '', shareUrl()); }
  catch { /* file:// and the like — the share button still works */ }
}

const shareButton = document.getElementById('share-button');
const sharePop    = document.getElementById('share-popover');
const shareLink   = document.getElementById('share-link');
const shareCopy   = document.getElementById('share-copy');
const shareStatus = document.getElementById('share-status');
const helpButton  = document.getElementById('help-button');
const helpPop     = document.getElementById('help-popover');

function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

async function copyLink() {
  const url = shareLink.value;
  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = 'Link copied to your clipboard.';
  } catch {
    shareLink.select();
    shareStatus.textContent = 'Press Ctrl/⌘+C to copy.';
  }
}

function closePopovers() { sharePop.hidden = true; helpPop.hidden = true; }
const closeShare = closePopovers;

function openShare() {
  closePopovers();
  shareLink.value = shareUrl();
  shareStatus.textContent = occupied.size ? '' : 'The board is empty. This link just opens the puzzle.';
  sharePop.hidden = false;
  shareLink.select();
  if (occupied.size) copyLink();
}

function openHelp() {
  closePopovers();
  drawHowTo();                       // keyed to the pointer actually in use
  helpPop.hidden = false;
}

shareButton.addEventListener('click', e => {
  e.stopPropagation();
  sharePop.hidden ? openShare() : closePopovers();
});
helpButton.addEventListener('click', e => {
  e.stopPropagation();
  helpPop.hidden ? openHelp() : closePopovers();
});
shareCopy.addEventListener('click', copyLink);
document.getElementById('help-close').addEventListener('click', closePopovers);
sharePop.addEventListener('click', e => e.stopPropagation());
helpPop.addEventListener('click', e => e.stopPropagation());
document.addEventListener('click', () => closePopovers());

const HOW_TO = [
  { caption: '', wall: '#2E9E57', fill: '#9FE0B7', art: [
    '.......',
    '.#####.',
    '.#...#.',
    '.#...#.',
    '.#####.',
    '.......',
  ]},
  { caption: '', wall: '#2C7FB8', fill: '#A5D2EE', art: [
    '...#...',
    '..#.#..',
    '.#...#.',
    '.#...#.',
    '..#.#..',
    '...#...',
  ]},
  { caption: '', wall: '#C4442A', fill: '#F2B3A2', art: [
    '.......',
    '.#####.',
    '.#...#.',
    '.#.....',
    '.#####.',
    '.......',
  ]},
];

function figure({ art, caption, wall, fill }) {
  const rows = art.length, cols = art[0].length;
  const inside = enclosedSet(rows, cols, (r, c) => art[r][c] === '#');

  const fig = document.createElement('div');
  fig.className = 'how-fig';

  const grid = document.createElement('div');
  grid.className = 'how-grid';
  grid.style.gridTemplateColumns = `repeat(${cols}, var(--how-cell))`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const isWall = art[r][c] === '#';
    const isIn   = !isWall && inside.has(key(r, c));
    const cell = document.createElement('div');
    cell.className = 'how-cell' + (isWall ? ' wall' : isIn ? ' in' : '');
    if (isWall) cell.style.background = wall;
    if (isIn)   cell.style.background = fill;
    grid.appendChild(cell);
  }

  const cap = document.createElement('div');
  cap.className = 'how-cap';
  const count = document.createElement('b');
  count.textContent = inside.size;
  count.style.color = wall;
  cap.append(count, ' enclosed', document.createElement('br'), caption);

  fig.append(grid, cap);
  return fig;
}

function chip(text) {
  const el = document.createElement('span');
  el.className = 'chip';
  el.textContent = text;
  return el;
}

function keyRow(...parts) {
  const row = document.createElement('span');
  for (const part of parts) {
    row.appendChild(typeof part === 'string' ? document.createTextNode(part) : part);
  }
  return row;
}

function drawHowTo() {
  const figs = helpPop.querySelector('.how-figs');
  const keys = helpPop.querySelector('.how-keys');
  figs.replaceChildren(...HOW_TO.map(figure));

  keys.replaceChildren(
    ...(touchMode
      ? [keyRow('tap a piece, drag to move'),
         keyRow(chip('↻'), chip('⇄')),
         keyRow(chip('Place'), ' to drop')]
      : [keyRow(chip('R'), chip('E'), 'Rotate'),
         keyRow(chip('F'), 'Flip')]),
  );
}

function turn(fn) {
  if (selected === null || flooding) return;
  transform(fn);
  render();
}

document.getElementById('ctl-cw').addEventListener('click',   () => turn(rotCW));
document.getElementById('ctl-flip').addEventListener('click', () => turn(flip));
document.getElementById('ctl-place').addEventListener('click', () => {
  if (selected !== null && hovered) place(...hovered);
});
document.getElementById('ctl-cancel').addEventListener('click', () => {
  selected = null;
  dragFrom = null;
  fromTray = false;
  render();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !(sharePop.hidden && helpPop.hidden)) { closePopovers(); return; }
  if (selected === null) return;
  const k = e.key.toLowerCase();
  if      (k === 'r')      transform(rotCW);
  else if (k === 'e')      transform(rotCCW);
  else if (k === 'f')      transform(flip);
  else if (k === 'escape') selected = null;
  else return;
  render();
});

const redo_button = document.getElementById('redo-button');

function reset_pieces() {
  floodToken++;
  flooding = false;
  gridEl.classList.remove('flooding');
  counterEl.classList.remove('pop');
  occupied.clear();
  selected = null;
  hovered = null;

  [...trayEl.children].forEach(piece => {
    piece.classList.remove('used');
  });
  boardChanged();
}

function showSolution() {
  if (!PUZZLE.solution) return;
  reset_pieces();
  for (const { piece, cells } of PUZZLE.solution) {
    for (const [r, c] of cells) occupied.set(key(r, c), piece);
    const d = orientationOf(PIECES[piece].cells, cells);
    if (d >= 0) shapes[piece] = anchored(D4[d](PIECES[piece].cells));
    trayEl.children[piece].classList.add('used');
  }
  closePopovers();
  boardChanged();
}

redo_button.addEventListener('click', reset_pieces);

const solutionButton = document.getElementById('help-solution');
if (PUZZLE.solution) {
  solutionButton.hidden = false;
  solutionButton.addEventListener('click', showSolution);
}

buildGrid();
buildTray();

fitBoard();

let lastWidth = document.documentElement.clientWidth;
function refit() {
  lastWidth = document.documentElement.clientWidth;
  closeShare();
  fitBoard();
}

addEventListener('resize', () => {
  if (document.documentElement.clientWidth !== lastWidth) refit();
});
addEventListener('orientationchange', () => setTimeout(refit, 150));

if (params.get('s')) {
  const state = decodeState(params.get('s'));
  if (state) applyState(state);
  else toast("That link's arrangement doesn't fit this puzzle. Starting empty.");
}

boardChanged();