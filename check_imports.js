const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

for (const file of files) {
  const fullPath = path.join(pagesDir, file);
  const code = fs.readFileSync(fullPath, 'utf8');
  
  // Find all JSX tag names starting with uppercase
  const jsxTags = code.match(/<([A-Z][a-zA-Z]+)/g) || [];
  const used = [...new Set(jsxTags.map(t => t.slice(1)))].filter(n => 
    !['React', 'Fragment'].includes(n)
  );
  
  // Find what's imported from @mui/material
  const muiImportMatch = code.match(/import\s*\{([^}]+)\}\s*from\s*['"]@mui\/material['"]/s);
  const muiImported = muiImportMatch 
    ? muiImportMatch[1].split(',').map(s => s.trim().replace(/\s/g, '').replace(/\n/g, '')).filter(Boolean)
    : [];
  
  // Also find other named imports (e.g. from @mui/icons-material, react-router-dom)
  const allImportMatches = [...code.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]/gs)];
  const allImported = allImportMatches.flatMap(m => 
    m[1].split(',').map(s => {
      const part = s.trim().split(/\s+as\s+/);
      return part[part.length - 1].trim().replace(/\n/g, '');
    })
  ).filter(Boolean);
  
  // Also find default imports
  const defaultImports = [...code.matchAll(/import\s+([A-Z][a-zA-Z]+)\s+from/g)].map(m => m[1]);
  const allKnown = [...new Set([...allImported, ...defaultImports])];
  
  const missing = used.filter(u => !allKnown.includes(u));
  
  if (missing.length > 0) {
    console.log(`\n❌ ${file}: MISSING: ${missing.join(', ')}`);
  } else {
    console.log(`✅ ${file}: OK`);
  }
}
