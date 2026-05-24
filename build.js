const fs = require('fs');
const css  = fs.readFileSync('src/style.css',    'utf8');
const data = fs.readFileSync('src/data.js',      'utf8');
const app  = fs.readFileSync('src/app.js',       'utf8');
let html   = fs.readFileSync('src/template.html','utf8');
html = html
  .replace('/* __CSS__ */', css)
  .replace('/* __DATA__ */', data)
  .replace('/* __APP__ */',  app);
fs.writeFileSync('index.html', html);
console.log('Built index.html (' + html.length + ' bytes)');
