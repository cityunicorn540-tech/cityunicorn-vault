// ========================================
// The CityUnicorn Vault - Main JavaScript
// ========================================

// Game Data - Add your games here
const gamesData = [
    {
        id: 1,
        title: "Retro Snake",
        description: "Classic snake game - eat food, grow longer, avoid walls and your tail!",
        cover: "🐍",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Snake_(video_game)",
        category: "arcade",
        author: "Classic"
    },
    {
        id: 2,
        title: "Puzzle Challenge",
        description: "Test your brain with challenging puzzles and mind-bending riddles.",
        cover: "🧩",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Puzzle_video_game",
        category: "puzzle",
        author: "Brain Games"
    },
    {
        id: 3,
        title: "Space Defender",
        description: "Defend Earth from alien invasion in this action-packed space shooter.",
        cover: "🚀",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Shoot_%27em_up",
        category: "action",
        author: "Space Games"
    },
    {
        id: 4,
        title: "Tower Defense",
        description: "Build towers and defend your base from waves of enemies.",
        cover: "🏰",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Tower_defense",
        category: "strategy",
        author: "Strategy Pro"
    },
    {
        id: 5,
        title: "Memory Match",
        description: "Find matching pairs of cards in this memory training game.",
        cover: "🎴",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Concentration_(card_game)",
        category: "puzzle",
        author: "Memory Master"
    },
    {
        id: 6,
        title: "Racing Legends",
        description: "High-speed racing action with stunning tracks and vehicles.",
        cover: "🏎️",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Racing_video_game",
        category: "action",
        author: "Speed Demons"
    },
    {
        id: 7,
        title: "Chess Master",
        description: "The classic strategy board game. Challenge the computer or friends.",
        cover: "♟️",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Chess",
        category: "strategy",
        author: "Board Games"
    },
    {
        id: 8,
        title: "Tetris Blocks",
        description: "Stack falling blocks and clear lines in this iconic puzzle game.",
        cover: "🧱",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Tetris",
        category: "puzzle",
        author: "Classic Games"
    },
    {
        id: 9,
        title: "Flappy Bird Clone",
        description: "Navigate the bird through obstacles - simple but addictive!",
        cover: "🐦",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Flappy_Bird",
        category: "arcade",
        author: "Arcade Fun"
    },
    {
        id: 10,
        title: "Word Search",
        description: "Find hidden words in letter grids - great for vocabulary building.",
        cover: "🔤",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Word_search",
        category: "puzzle",
        author: "Word Games"
    },
    {
        id: 11,
        title: "Fighter Combat",
        description: "Epic fighting game with combos, special moves, and intense battles.",
        cover: "🥊",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Fighting_game",
        category: "action",
        author: "Fight Club"
    },
    {
        id: 12,
        title: "Sudoku Classic",
        description: "Fill the grid with numbers - the ultimate logic puzzle challenge.",
        cover: "🔢",
        coverImage: "",
        gameUrl: "https://en.wikipedia.org/wiki/Sudoku",
        category: "puzzle",
        author: "Logic Pro"
    }
];

// DOM Elements
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const filterBtns = document.querySelectorAll('.filter-btn');
const gameModal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const modalGameTitle = document.getElementById('modalGameTitle');
const modalGameDescription = document.getElementById('modalGameDescription');
const modalGameAuthor = document.getElementById('modalGameAuthor');
const modalGameCategory = document.getElementById('modalGameCategory');
const closeModal = document.getElementById('closeModal');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const totalGamesEl = document.getElementById('totalGames');
const noGames = document.getElementById('noGames');

// State
let currentCategory = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    updateStats();
    setupEventListeners();
});

// Render Games
function renderGames() {
    const filteredGames = filterGames();
    
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '';
        noGames.style.display = 'block';
        return;
    }
    
    noGames.style.display = 'none';
    gamesGrid.innerHTML = filteredGames.map((game, index) => createGameCard(game, index)).join('');
    
    // Add click listeners to cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = parseInt(card.dataset.gameId);
            openGame(gameId);
        });
    });
}

// Create Game Card HTML
function createGameCard(game, index) {
    const coverContent = game.coverImage 
        ? `<img src="${game.coverImage}" alt="${game.title}" loading="lazy">`
        : `<span class="game-emoji">${game.cover}</span>`;
    
    return `
        <div class="game-card" data-game-id="${game.id}" style="animation-delay: ${index * 0.05}s">
            <div class="game-cover">
                ${coverContent}
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-footer">
                    <span class="game-category-badge">${game.category}</span>
                    <button class="play-btn">
                        <span>▶</span> Play
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Filter Games
function filterGames() {
    return gamesData.filter(game => {
        const matchesCategory = currentCategory === 'all' || game.category === currentCategory;
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Update Stats
function updateStats() {
    totalGamesEl.textContent = gamesData.length;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderGames();
    });
    
    // Category Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderGames();
        });
    });
    
    // Modal Controls
    closeModal.addEventListener('click', closeGameModal);
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameModal.classList.contains('active')) {
            closeGameModal();
        }
    });
}

// Open Game
function openGame(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;
    
    modalGameTitle.textContent = game.title;
    modalGameDescription.textContent = game.description;
    modalGameAuthor.textContent = `By: ${game.author}`;
    modalGameCategory.textContent = game.category;
    
    // Load game in iframe
    gameFrame.src = game.gameUrl;
    
    gameModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Game Modal
function closeGameModal() {
    gameModal.classList.remove('active');
    gameFrame.src = '';
    document.body.style.overflow = '';
}

// Toggle Fullscreen
function toggleFullscreen() {
    const container = document.querySelector('.game-frame-container');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Export for potential future use
window.CityUnicornVault = {
    gamesData,
    openGame,
    closeGameModal
};
