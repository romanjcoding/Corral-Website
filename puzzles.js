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
  id: '9',
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
    id: '6',
    starter: true,
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
    id: '18',
    name: 'Puzzle 18',
    difficulty: 8,
    bestKnown: 10,
    pieces: [
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
      { cells:[[1,1],[-1,-1],[1,-1],[3,-1]] },
    ],
  },
  {
    id: '4',
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
    id: '7',
    name: 'Puzzle 5',
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
    id: '5',
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
    id: '8',
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
    id: '10',
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
    id: '16',
    name: 'Puzzle 16',
    difficulty: 7,
    bestKnown: 18,
    notes: '33 with one more piece, then 48?',
    pieces: [
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[2,2]] },
      { cells:[[0,0],[1,0],[2,0],[2,1],[-1,0]] },
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
    id: '19',
    name: 'Puzzle 19',
    difficulty: 5,
    bestKnown: null,
    pieces: [
      { cells:[[0,0],[0,3],[3,0],[3,3]] }, // 3-square hollow corners
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
      { cells:[[0,0],[0,3],[3,0],[3,3]] },
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
];


const UNLOCK = {
  start:  '2026-08-15',
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