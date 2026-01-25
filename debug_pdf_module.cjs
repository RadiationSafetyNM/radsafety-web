const fs = require('fs');
const pdfLib = require('pdf-parse');

console.log('Type of pdfLib:', typeof pdfLib);
console.log('Keys:', Object.keys(pdfLib));

const dataBuffer = fs.readFileSync('public/archive/방사선분야 정기검사수검가이드(2022년 개정)_최종본.pdf');

// Try different ways to call it
let pdfFunc = pdfLib;
if (typeof pdfLib !== 'function' && typeof pdfLib.default === 'function') {
    pdfFunc = pdfLib.default;
}

if (typeof pdfFunc === 'function') {
    pdfFunc(dataBuffer).then(data => {
        console.log("Success! extracted text length: " + data.text.length);
        const text = data.text;
        const lines = text.split('\n');

        console.log("=== 지적 Search Results ===");
        lines.forEach((line, i) => {
            if (line.includes('지적') && line.length > 5 && line.length < 150) {
                console.log(`[Line ${i}] ${line.trim()}`);
            }
        });

        console.log("\n=== 위반 Search Results ===");
        lines.forEach((line, i) => {
            if (line.includes('위반') && line.length > 5 && line.length < 150) {
                console.log(`[Line ${i}] ${line.trim()}`);
            }
        });

    }).catch(e => console.error("Error running pdf:", e));
} else {
    console.error("Could not find pdf function");
}
