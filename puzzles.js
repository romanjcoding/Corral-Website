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
    bestKnown: 16,
    pieces: [
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,2],[2,3]] }, // diamond corners
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
    id: '13',
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
    id: '12',
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
    id: '20',
    name: 'Puzzle 20',
    difficulty: 7,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
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
    id: '999',
    name: 'Puzzle 5',
    difficulty: 5,
    bestKnown: 9,
    pieces: [
      { cells:[[1,1],[-1,-1],[1,-1],[-1,1]] }, // corners
      { cells:[[1,1],[-1,-1],[3,-1]] },
      { cells:[[1,1],[-1,1],[0,0],[2,2],[-2,2]] },
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
    id: '980',
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
    id: '11',
    name: 'Puzzle 11',
    difficulty: 2,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,3],[3,0]] },   // 3-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
    ],
  },
  {
    id: '14',
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
    id: '15',
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
    id: '17',
    name: 'Puzzle 17',
    difficulty: 2,
    bestKnown: 5,
    pieces: [
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
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
    id: '22',
    name: 'Puzzle 22',
    difficulty: 2.5,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[2,2],[-2,2],[0,4]] }, // diamond corners
      { cells:[[0,0],[0,3],[3,0]] },
      { cells:[[0,0],[0,3],[3,0]] },
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
    id: '994',
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
    id: '993',
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
    id: '997',
    name: 'Testing',
    difficulty: 0,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,0],[3,3]] },   // 3-square hollow corners
      { cells:[[0,0],[2,2],[-2,2],[0,4]] },  // diamond corners
      { cells:[[0,0],[1,-1],[2,0],[2,2]] },
      { cells:[[0,0],[3,3]] },
      { cells:[[0,0],[0,4],[4,4],[4,0]] }, // 4-square hollow corners
      { cells:[[0,0],[0,1],[0,2]] },       // 3-bar
      { cells:[[1,1],[-1,-1],[1,-1],[-1,1]] }, // corners
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },  
      { cells:[[0,0],[1,0],[2,1],[2,-1]] }, // diamond corners
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
      { cells:[[0,0],[1,0],[2,1],[2,-1],[2,0]] },
      { cells:[[0,0],[0,4],[4,0],[4,4],[3,3],[1,1],[1,3]] },
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
      { cells:[[0,0],[0,1],[2,1],[2,2]] }, // diamond corners
    ],
  },

];

const UNLOCK = {
  start:  '2026-08-17',
  perDay: 1,
};

const STARTERS = PUZZLES.filter(p => p.starter);
const DAILY    = PUZZLES.filter(p => !p.starter);

const midnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

const daysBetween = (a, b) => Math.round((midnight(b) - midnight(a)) / 86400000);

function unlockedDailyCount(now = new Date()) {
  const days = daysBetween(parseDay(UNLOCK.start), now);
  if (days < 0) return 0;
  return Math.min(DAILY.length, (days + 1) * UNLOCK.perDay);
}

function isUnlocked(puzzle, now = new Date()) {
  if (!puzzle) return false;
  if (puzzle.starter) return true;
  return DAILY.indexOf(puzzle) < unlockedDailyCount(now);
}

function unlockedPuzzles(now = new Date()) {
  return PUZZLES.filter(p => isUnlocked(p, now));
}

const PUZZLES_BY_ID = Object.fromEntries(PUZZLES.map(p => [p.id, p]));

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