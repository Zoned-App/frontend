const fs = require('fs');

let content = fs.readFileSync('dashboard.html', 'utf-8');
content = content.replace(/<button class="bg-surface-container-lowest text-primary[\s\S]*?<\/button>/, 
    '<a href="/active-game.html" class="bg-surface-container-lowest text-primary px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-white transition-colors block text-center mt-4">Create New Game</a>');
fs.writeFileSync('dashboard.html', content);

let activeGame = fs.readFileSync('active-game.html', 'utf-8');
// Link the abort/exit game button in active-game.html back to dashboard if possible, or just add a back button.
// Actually just replace some generic button with a link back to dashboard
activeGame = activeGame.replace(/<button class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant[\s\S]*?<\/button>/,
    '<a href="/dashboard.html" class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined" data-icon="close">close</span></a>');

fs.writeFileSync('active-game.html', activeGame);
console.log('Wiring done.');
