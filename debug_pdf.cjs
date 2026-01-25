const fs = require('fs');
const pdfLib = require('pdf-parse');

console.log('Type of pdfLib:', typeof pdfLib);
console.log('pdfLib keys:', Object.keys(pdfLib));

try {
    let dataBuffer = fs.readFileSync('public/archive/방사선분야 정기검사수검가이드(2022년 개정)_최종본.pdf');
    // Try to call it if it's a function, or look for a default export
    if (typeof pdfLib === 'function') {
        pdfLib(dataBuffer).then(function (data) {
            console.log(data.text);
        });
    } else if (pdfLib.default && typeof pdfLib.default === 'function') {
        pdfLib.default(dataBuffer).then(function (data) {
            console.log(data.text);
        });
    } else {
        console.log("Could not find pdf function");
    }
} catch (e) {
    console.error(e);
}
