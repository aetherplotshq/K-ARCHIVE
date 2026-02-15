const CONFIG = {
    gridSize: 100,
    cellSize: 20, // 20px per plot = 2000px wide grid
    updateFee: 9
};

// 1. Pricing Logic
function calculatePlotPrice(y) {
    let base = 39;
    if (y <= 3 || y >= 96) base = 99; // Tier 1
    else if (y === 4 || y === 95) base = 89; // Tier 2
    else if (y === 5 || y === 94) base = 59; // Tier 3
    return base;
}

// 2. Grid Interaction State
let selectedPlots = new Set();
let hoveredPlot = null;

function initGrid() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = CONFIG.gridSize * CONFIG.cellSize;
    canvas.height = CONFIG.gridSize * CONFIG.cellSize;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let y = 0; y < CONFIG.gridSize; y++) {
            for (let x = 0; x < CONFIG.gridSize; x++) {
                const px = x * CONFIG.cellSize;
                const py = y * CONFIG.cellSize;
                const id = `${x}-${y}`;

                // Background
                ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
                ctx.strokeRect(px, py, CONFIG.cellSize, CONFIG.cellSize);

                // Selected State
                if (selectedPlots.has(id)) {
                    ctx.fillStyle = 'rgba(197, 160, 89, 0.2)';
                    ctx.fillRect(px, py, CONFIG.cellSize, CONFIG.cellSize);
                    ctx.strokeStyle = '#C5A059';
                    ctx.strokeRect(px + 1, py + 1, CONFIG.cellSize - 2, CONFIG.cellSize - 2);
                }
            }
        }
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / CONFIG.cellSize);
        const y = Math.floor((e.clientY - rect.top) / CONFIG.cellSize);
        
        if (x >= 0 && x < 100 && y >= 0 && y < 100) {
            const price = calculatePlotPrice(y);
            document.getElementById('current-price').innerText = `$${price}`;
            document.getElementById('current-coords').innerText = `${x}, ${y}`;
        }
        draw();
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / CONFIG.cellSize);
        const y = Math.floor((e.clientY - rect.top) / CONFIG.cellSize);
        const id = `${x}-${y}`;

        if (selectedPlots.has(id)) selectedPlots.delete(id);
        else selectedPlots.add(id);
        
        updateTotal();
        draw();
    });

    function updateTotal() {
        let total = 0;
        selectedPlots.forEach(id => {
            const y = parseInt(id.split('-')[1]);
            total += calculatePlotPrice(y);
        });
        document.getElementById('total-price').innerText = `$${total}`;
    }

    draw();
}

document.addEventListener('DOMContentLoaded', initGrid);
