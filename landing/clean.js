const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('C:/Users/Harshal Patel/Desktop/spectra-site/landing/src/app').filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  if (f.endsWith('layout.tsx')) return;
  let code = fs.readFileSync(f, 'utf8');
  const regex = /<header[\s\S]*?<\/header>/;
  const match = regex.exec(code);
  if (match && (match[0].includes('Logo') || match[0].includes('spectra-security-docs'))) {
    code = code.replace(regex, '');
    fs.writeFileSync(f, code);
    console.log('Cleaned', f);
  }
});
