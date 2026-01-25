const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('public/archive/방사선분야 정기검사수검가이드(2022년 개정)_최종본.pdf');

pdf(dataBuffer).then(function (data) {
    // Search for keywords related to findings
    const text = data.text;
    const keywords = ['지적', '위반', '사례', '권고'];

    // Simple extraction of lines containing keywords to locate the section
    const lines = text.split('\n');
    let foundSection = false;
    let extractedLines = [];

    lines.forEach((line, index) => {
        if (line.includes('지적사항') || line.includes('위반사례')) {
            console.log(`--- Possible Section Header at line ${index}: ${line} ---`);
            foundSection = true;
        }
        if (foundSection || keywords.some(k => line.includes(k))) {
            // content context
            if (line.trim().length > 10) {
                console.log(`${index}: ${line.trim()}`);
            }
        }
    });
});
