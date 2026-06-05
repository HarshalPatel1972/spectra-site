const fs = require('fs');

const path = 'src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The Z-depths we will assign to each section in order:
// 13 sections total. Let's space them by -800px each.
const Z_SPACING = 800;

let sectionIndex = 0;

// We match `<section className="..."` and `<footer className="..."`
content = content.replace(/<(section|footer) className="([^"]*)"/g, (match, tag, classes) => {
    
    // Add absolute positioning classes
    // We want the section to be vertically centered, absolute, full width.
    // Let's ensure 'absolute', 'w-full', 'top-1/2', '-translate-y-1/2' are in the class list
    let newClasses = classes;
    if (!newClasses.includes('absolute')) {
        // remove relative if present
        newClasses = newClasses.replace(/\brelative\b/g, '').trim();
        newClasses += ' absolute top-1/2 left-0 w-full -translate-y-1/2';
    }

    const zDepth = -(sectionIndex * Z_SPACING);
    sectionIndex++;

    return `<${tag} className="${newClasses}" style={{ transform: "translateZ(${zDepth}px)" }}`;
});

fs.writeFileSync(path, content, 'utf8');
console.log(`Updated ${sectionIndex} sections/footers with Z-depths.`);
