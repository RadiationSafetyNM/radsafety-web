const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('public/archive/방사선분야 정기검사수검가이드(2022년 개정)_최종본.pdf');

pdf(dataBuffer).then(function (data) {
    const text = data.text;
    const lines = text.split('\n');

    // Look for a section that might be "Major Findings"
    // Usually these are at the end or in a specific chapter.

    // Let's just dump lines that contain '지적' to see the context
    console.log("=== 지적사항 Search Results ===");
    lines.forEach((line, i) => {
        if (line.includes('지적') && line.length > 5 && line.length < 100) {
            console.log(`[Line ${i}] ${line.trim()}`);
        }
    });

    // Also look for '위반'
    console.log("\n=== 위반 Search Results ===");
    lines.forEach((line, i) => {
        if (line.includes('위반') && line.length > 5 && line.length < 100) {
            console.log(`[Line ${i}] ${line.trim()}`);
        }
    });
});
