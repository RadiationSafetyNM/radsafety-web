import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('public/archive/방사선분야 정기검사수검가이드(2022년 개정)_최종본.pdf');

async function run() {
    try {
        let pdfFunc = pdf;
        // Handle potential default export wrapper
        if (pdf.default) pdfFunc = pdf.default;

        const data = await pdfFunc(dataBuffer);
        console.log(data.text);
    } catch (e) {
        console.error(e);
        console.log('Keys:', Object.keys(pdf));
    }
}

run();
