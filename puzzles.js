const dist = h => 180 - Math.abs(Math.abs(h - 100) % 360 - 180);
const warmth = h => Math.exp(-(dist(h) ** 2) / (2 * 45 ** 2));

const rgb = hue => {
  const w = warmth(hue);
  return `oklch(${0.90 + 0.05 * w} ${0.065 + 0.055 * w} ${hue})`;
}

const PUZZLES = [
  {
    id: '1',
    starter: true,
    name: 'Lovely',
    difficulty: 1,
    bestKnown: 13,
    pieces: [
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
      { cells:[[0,0],[0,1],[0,2],[0,3]] }, // I
      { cells:[[0,0],[0,1],[0,2],[0,3]] }, // I
    ],
  },
  {
    id: '2',
    starter: true,
    name: '4XL',
    difficulty: 2,
    bestKnown: 12,
    pieces: [
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
      { cells:[[0,0],[0,1],[0,2],[1,2]] }, // L
    ],
  },
  {
    id: '3',
    starter: true,
    name: 'In-N-Out',
    difficulty: 3,
    bestKnown: 5,
    pieces: [
      { cells:[[0,0],[1,0],[2,0],[2,1]] },
      { cells:[[0,0],[0,1]] },
      { cells:[[1,0],[2,1],[3,1],[4,1],[1,1]] },
    ],
  },
  {
  id: '4',
  starter: true,
  name: 'Merry-go Round',
  difficulty: 4,
  bestKnown: 13,
  pieces: [
    { cells:[[0,0],[0,1],[1,1]] }, // corner tromino
    { cells:[[0,0],[0,1],[1,1]] },
    { cells:[[0,0],[0,1],[1,1]] },
    { cells:[[0,0],[0,1],[1,1]] },
    { cells:[[0,0],[0,1],[1,1]] },
    { cells:[[0,0],[0,1],[1,1]] },
  ],
  },
  {
    id: '5',
    name: 'Inception',
    difficulty: 5,
    bestKnown: 8,
    starter: true,
    pieces: [
      { cells:[[0,0],[0,3],[3,0],[3,3]] }, // 3-square hollow corners
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
    ],
  },
  {
    id: '6',
    name: 'Sibilance',
    difficulty: 2,
    bestKnown: 8,
    pieces: [
      { cells:[[0,0],[0,1],[1,1],[1,2]] },
      { cells:[[0,0],[0,1],[1,1],[1,2]] },
      { cells:[[0,0],[0,1],[1,1],[1,2]] },
      { cells:[[0,0],[0,1],[1,1],[1,2]] },
    ],
  },
  {
    id: '7',
    name: 'Case Study #1',
    difficulty: 3,
    bestKnown: 11,
    notes: '33 with one more piece, then 48?',
    pieces: [
      { cells:[[0,0],[1,1],[2,2],[3,3]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
    ],
  },
  {
    id: '8',
    name: 'Tetris',
    difficulty: 6,
    bestKnown: 15,
    pieces: [
      { cells:[[0,0],[1,0],[1,1],[2,1]] },
      { cells:[[0,0],[1,0],[2,0],[2,1]] },
      { cells:[[0,0],[1,0],[2,0],[1,1]] },
      { cells:[[0,0],[1,0],[0,1],[1,1]] },
      { cells:[[0,0],[1,0],[2,0],[3,0]] },
    ],
  },
  {
    id: '9',
    name: 'Angular',
    difficulty: 7,
    bestKnown: 10,
    pieces: [
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
    ],
  },
  {
    id: '10',
    name: 'French Fry',
    difficulty: 10,
    bestKnown: 22,
    pieces: [
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
    ],
  },
  {
    id: '11',
    name: 'Shiny!',
    difficulty: 1,
    bestKnown: 5,
    pieces: [
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
    ],
  },
  {
    id: '12',
    name: 'Sokoban',
    difficulty: 3,
    bestKnown: 7,
    pieces: [
      { cells:[[0,0],[2,2],[-2,2],[0,4]] }, // diamond corners
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
    ],
  },
  {
    id: '13',
    name: 'Case Study #2',
    difficulty: 5,
    bestKnown: 18,
    notes: '33 with one more piece, then 50, 67, 88',
    pieces: [
      { cells:[[0,0],[1,1],[2,2],[3,3]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },

    ],
  },
  {
    id: '14',
    name: 'Turnip',
    difficulty: 8,
    bestKnown: 15,
    pieces: [
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3],[3,1]] },
      { cells:[[0,0],[0,4],[4,0],[4,4]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3],[3,1]] },

    ],
  },
  {
    id: '15',
    name: 'Case Study #3',
    difficulty: 9,
    bestKnown: 50,
    notes: '33 with one more piece, then 48?',
    pieces: [
      { cells:[[0,0],[1,1],[2,2],[3,3]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
    ],
  },
  {
    id: '16',
    name: 'Bokosan',
    difficulty: 2,
    bestKnown: 8,
    pieces: [
      { cells:[[0,0],[0,3],[3,3],[3,0]] },   // 3-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
    ],
  },
  {
    id: '17',                             // was '999' — clashed with LLL
    name: 'Polyplet',
    difficulty: 3,
    bestKnown: 9,
    pieces: [
      { cells:[[1,1],[-1,-1],[1,-1],[-1,1]] }, // corners
      { cells:[[1,1],[-1,-1],[3,-1]] },
      { cells:[[1,1],[-1,1],[0,0],[2,2],[-2,2]] },
    ],
  },

  {
    id: '980',
    name: 'Box-in-a-Box',
    difficulty: 10,
    bestKnown: 31,
    pieces: [
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,1],[0,2]] },       // 3-bar
      { cells:[[0,0],[0,1],[0,2]] },       // 3-bar
      { cells:[[0,0],[0,1],[0,2]] },       // 3-bar
      { cells:[[0,0],[0,1],[0,2]] },       // 3-bar
    ],
  },
  {
    id: '999',
    name: 'LLL',
    difficulty: 1,
    bestKnown: 8,
    pieces: [
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
    ],
  },
  {
    id: '994',
    name: 'Staircase',
    difficulty: 5,
    bestKnown: 5,
    pieces: [
      { cells:[[1,0],[2,0],[3,0],[3,1]] },
      { cells:[[0,0],[0,2]] },
      { cells:[[0,0],[2,1]] },
      { cells:[[0,0],[2,1]] },
    ],
  },
  {
    id: '800',
    name: 'Puzzle 13',
    difficulty: 5,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[1,0],[2,1],[2,-1],[2,0]] },
      { cells:[[0,0],[1,0],[2,1],[2,-1],[2,0]] },
      { cells:[[1,0],[2,1],[2,-1]] },
      { cells:[[1,0],[2,1],[2,-1]] },
    ],
  },
  {
    id: '888',
    name: 'Lobster',
    difficulty: 6,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[1,0],[2,1],[2,-1]] },
      { cells:[[0,0],[1,0],[2,1],[2,-1]] },
      { cells:[[0,0],[1,0],[2,1],[2,-1]] },
      { cells:[[0,0],[1,0],[2,1],[2,-1]] },
      { cells:[[0,0],[5,0],[0,5],[5,5]] },   // 5-square hollow corners
    ],
  },
  {
    id: '998',
    name: 'Puzzle 4',
    difficulty: 9,
    bestKnown: 13,
    pieces: [
      { cells:[[0,0],[0,3],[3,3],[3,0]] }, // 3-square hollow corners
      { cells:[[0,0],[0,3],[3,3],[3,0]] }, // 3-square hollow corners
      { cells:[[0,0],[0,1]] },             // domino
      { cells:[[0,0],[0,1]] },             // domino
      { cells:[[0,0],[-1,1],[1,3],[2,2]] },
    ],
  },
  {
    id: '993',
    name: 'Puzzle 8',
    difficulty: 6,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,1],[1,1]] },       // corner tromino
      { cells:[[0,0],[0,1],[0,2],[0,3]] }, // I
      { cells:[[0,0],[0,1],[0,2],[1,1]] }, // T
      { cells:[[0,0],[0,1],[1,2],[1,1]] }, // S
    ],
  },
  {
    id: '979',                             // was '980' — clashed with Box-in-a-Box
    name: 'Puzzle 10',
    difficulty: 6,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,0],[3,3]] },   // 3-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
    ],
  },
  {
    id: '700',
    name: 'Puzzle 14',
    difficulty: 3.5,
    bestKnown: null,
    pieces: [
      { cells:[[1,1],[-1,-1],[1,-1],[-1,1]] }, // corners
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,1],[0,0],[2,2],[-2,2]] },
    ],
  },
  {
    id: '1500',
    name: 'Puzzle 15',
    difficulty: 5,
    bestKnown: 11,
    pieces: [
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
    ],
  },
  {
    id: '21',
    name: 'Puzzle 21',
    difficulty: 5,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3],[3,1]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3],[3,1]] },
    ],
  },
  {
    id: '996',
    name: '',
    difficulty: 7,
    bestKnown: 6,
    pieces: [
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
    ],
  },
  {
    id: '995',
    name: '',
    difficulty: 6,
    bestKnown: 8,
    pieces: [
      { cells:[[0,0],[2,3]] },
      { cells:[[0,0],[2,3]] },
      { cells:[[0,0],[2,3]] },
      { cells:[[0,0],[2,3]] },
      { cells:[[0,0],[2,3]] },
    ],
  },
  {
    id: '976',                             // was '994' — clashed with Staircase
    name: '',
    difficulty: 6,
    bestKnown: 6,
    pieces: [
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[3,3]] },
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
    ],
  },
  {
    id: '977',                             // was '993' — clashed with Puzzle 8
    name: '',
    difficulty: 1,
    bestKnown: 2,
    pieces: [
      { cells:[[0,0],[1,2]] }, // diamond corners
      { cells:[[0,0],[1,2]] }, // diamond corners
      { cells:[[0,0],[1,2]] }, // diamond corners
    ],
  },
  {
    id: '992',
    name: '',
    difficulty: 5,
    bestKnown: 2,
    pieces: [
      { cells:[[0,0],[3,3]] },
      { cells:[[0,0],[3,3]] },
      { cells:[[0,0],[3,3]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[2,2]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[2,2]] },
    ],
  },
  {
    id: '991',
    name: '????',
    difficulty: 6,
    bestKnown: 15,
    pieces: [
      { cells:[[0,0],[1,1],[2,0],[4,0]] }, // diamond corners
      { cells:[[0,0],[1,1],[2,0],[4,0]] }, // diamond corners
      { cells:[[0,0],[1,1],[2,0],[4,0]] }, // diamond corners
      { cells:[[0,0],[1,1],[2,0],[4,0]] }, // diamond corners
    ],
  },
  {
    id: '990',
    name: 'Shortstack',
    difficulty: 6,
    bestKnown: 12,
    pieces: [
      { cells:[[0,0],[0,2]] }, // diamond corners
      { cells:[[0,0],[0,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,0]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,0]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,0]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,0]] }, // diamond corners
    ],
  },
  {
    id: '989',
    name: 'Game',
    difficulty: 6,
    bestKnown: 11,
    pieces: [
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
    ],
  },
  {
    id: '987',
    name: 'The Onion',
    difficulty: 4,
    bestKnown: 8,
    pieces: [
      { cells:[[0,0],[0,2],[6,2],[6,0]] }, // diamond corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,2],[2,2],[2,0]] }, // 4-square hollow corners
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1],[1,-3]] },
    ],
  },
  {
    id: '986',
    name: '<3',
    difficulty: 1,
    bestKnown: 3,
    pieces: [
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
    ],
  },
  {
    id: '997',
    name: 'Testing',
    difficulty: 0,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,0],[3,3]] },   // 3-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0]] },
      { cells:[[0,0]] },
      { cells:[[0,0],[2,0]] },
      { cells:[[0,0],[2,0]] },
      { cells:[[0,0],[2,0],[4,0]] },
      { cells:[[0,0],[2,0],[4,0],[6,0]] },
      // { cells:[[0,0],[1,1],[2,2],[3,3]] }, // diamond corners
      // { cells:[[0,0],[0,2],[6,2],[6,0]] }, // diamond corners
    ],
  },

];

const UNLOCK = {
  start: '2026-08-17',
  perRelease: 1,
  days: [1, 2, 3, 4, 5],
  skip: [],
};

const STARTERS = PUZZLES.filter(p => p.starter);
const DAILY    = PUZZLES.filter(p => !p.starter);

const midnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

const daysBetween = (a, b) => Math.round((midnight(b) - midnight(a)) / 86400000);

const iso = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Does a puzzle come out on this date?
function isReleaseDay(d) {
  if (UNLOCK.skip?.includes(iso(d))) return false;
  const elapsed = daysBetween(parseDay(UNLOCK.start), d);
  if (elapsed < 0) return false;
  if (UNLOCK.everyDays) return elapsed % UNLOCK.everyDays === 0;
  return UNLOCK.days.includes(d.getDay());
}

// How many release days have happened, counting today.
function releasesSoFar(now = new Date()) {
  const start   = parseDay(UNLOCK.start);
  const elapsed = daysBetween(start, now);
  if (elapsed < 0) return 0;

  const span = elapsed + 1;                 // days in the window, inclusive

  let count;
  if (UNLOCK.everyDays) {
    count = Math.floor(elapsed / UNLOCK.everyDays) + 1;
  } else {
    // whole weeks contribute a fixed number, then walk the remainder
    const allowed = new Set(UNLOCK.days);
    count = Math.floor(span / 7) * allowed.size;
    const dow = start.getDay();
    for (let i = 0; i < span % 7; i++) if (allowed.has((dow + i) % 7)) count++;
  }

  // subtract any skipped dates that land inside the window
  for (const s of UNLOCK.skip ?? []) {
    const d   = parseDay(s);
    const off = daysBetween(start, d);
    if (off < 0 || off > elapsed) continue;
    if (UNLOCK.everyDays ? off % UNLOCK.everyDays === 0 : UNLOCK.days.includes(d.getDay())) count--;
  }

  return Math.max(0, count);
}

function unlockedDailyCount(now = new Date()) {
  return Math.min(DAILY.length, releasesSoFar(now) * UNLOCK.perRelease);
}

function isUnlocked(puzzle, now = new Date()) {
  if (!puzzle) return false;
  if (puzzle.starter) return true;
  return DAILY.indexOf(puzzle) < unlockedDailyCount(now);
}

function unlockedPuzzles(now = new Date()) {
  return PUZZLES.filter(p => isUnlocked(p, now));
}

// Next date a puzzle appears, or null once the queue runs dry.
function nextUnlock(now = new Date()) {
  if (unlockedDailyCount(now) >= DAILY.length) return null;
  const d = midnight(now);
  for (let i = 1; i <= 366; i++) {
    d.setDate(d.getDate() + 1);
    if (isReleaseDay(d)) return new Date(d);
  }
  return null;
}

const PUZZLES_BY_ID = Object.fromEntries(PUZZLES.map(p => [p.id, p]));

{
  const seen = new Set(), dupes = new Set();
  for (const p of PUZZLES) (seen.has(p.id) ? dupes : seen).add(p.id);
  if (dupes.size) console.warn('Duplicate puzzle ids:', [...dupes].join(', '));
}

ARC_START = 250;
const ARC_SWEEP_PER = 45;

for (const puzzle of PUZZLES) {
  const n = puzzle.pieces.length;
  ARC_START += 50
  puzzle.pieces.forEach((piece, i) => {
    const t = n < 2 ? 0.5 : i / (n - 1);
    if (!piece.color) piece.color = rgb(ARC_START + t * (ARC_SWEEP_PER * n));
  });
}

const DIFFICULTY_COLORS = [
  '#32BB60', '#58B92D', '#A9BE33', '#D5CD3B', '#EAC93B',
  '#E99530', '#D46423', '#C83D1D', '#B42027', '#9B1A35',
];

const DIFFICULTY_CELLS = [
  [[0,0]],
  [[0,0],[0,1]],
  [[0,0],[0,1],[-1,1]],
  [[0,0],[0,1],[-1,1],[1,0]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2],[0,2]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2],[0,2],[1,2]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2],[0,2],[1,2],[0,3]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2],[0,2],[1,2],[0,3],[-2,2]],
  [[0,0],[0,1],[-1,1],[1,0],[-1,2],[0,2],[1,2],[0,3],[-2,2],[-2,0]],
];

const diffIndex      = d => Math.min(10, Math.max(1, Math.round(d))) - 1;
const difficultyColor = d => DIFFICULTY_COLORS[diffIndex(d)] ?? '#8e7456';
const difficultyCells = d => DIFFICULTY_CELLS[diffIndex(d)] ?? [[0,0]];

function miniIcon(cells, color, size = 8) {
  const minR = Math.min(...cells.map(x => x[0])), minC = Math.min(...cells.map(x => x[1]));
  const filled = new Set(cells.map(([r, c]) => `${r - minR},${c - minC}`));
  const rows = Math.max(...cells.map(x => x[0])) - minR;
  const cols = Math.max(...cells.map(x => x[1])) - minC;

  const g = document.createElement('div');
  g.className = 'mini-grid';
  g.style.gridTemplateColumns = `repeat(${cols + 1}, ${size}px)`;
  for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++) {
    const d = document.createElement('div');
    d.className = 'mini-cell';
    d.style.width = d.style.height = `${size}px`;
    if (filled.has(`${r},${c}`)) d.style.background = color;
    g.appendChild(d);
  }
  return g;
}

function pieceToCanvas(cells, color, { cell = 64, gap = 4, pad = 8 } = {}) {
  const minR = Math.min(...cells.map(x => x[0])), minC = Math.min(...cells.map(x => x[1]));
  const rows = Math.max(...cells.map(x => x[0])) - minR + 1;
  const cols = Math.max(...cells.map(x => x[1])) - minC + 1;

  const cv = document.createElement('canvas');
  cv.width  = cols * cell + (cols - 1) * gap + pad * 2;
  cv.height = rows * cell + (rows - 1) * gap + pad * 2;

  const ctx = cv.getContext('2d');
  ctx.fillStyle = color;
  for (const [r, c] of cells) {
    const x = pad + (c - minC) * (cell + gap);
    const y = pad + (r - minR) * (cell + gap);
    ctx.beginPath();
    ctx.roundRect(x, y, cell, cell, cell * 0.12);  // drop roundRect for hard corners
    ctx.fill();
  }
  return cv;
}

function savePiecePNG(piece, name = 'piece', opts) {
  pieceToCanvas(piece.cells, piece.color, opts).toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, 'image/png');
}
