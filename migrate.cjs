const fs = require('fs');

const files = ['index.html', 'role-selection.html', 'dashboard.html', 'active-game.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');

    // 1. Remove tailwind CDN
    content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com.*"><\/script>/g, '');

    // 2. Add Vite entrypoint and CSS
    const headInjection = `
    <link href="/src/style.css" rel="stylesheet" />
    <script type="module" src="/src/main.ts"></script>
    `;
    content = content.replace(/<\/head>/, headInjection + '\n</head>');

    // 3. Remove tailwind config script
    content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/g, '');

    // 4. Remove inline styles like .signature-gradient (already in style.css)
    content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
    
    // 5. Hardcode standard link paths for navigation
    if (file === 'index.html') {
        content = content.replace(/<button class="w-full signature-gradient/g, '<a href="/role-selection.html" class="w-full signature-gradient');
        content = content.replace(/<\/button>/g, '</a></button>'); // crude fix
        content = content.replace(/Start Seeking\s*<span/g, 'Start Seeking</span><span');
    }
    if (file === 'role-selection.html') {
        content = content.replace(/<button/g, '<a href="/dashboard.html"');
        content = content.replace(/<\/button>/g, '</a>');
    }

    fs.writeFileSync(file, content);
}
console.log("Migration complete");
