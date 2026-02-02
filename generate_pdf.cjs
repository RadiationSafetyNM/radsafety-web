const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generatePdf() {
    try {
        // Check if puppeteer is installed, if not try to install it or use npx
        console.log('Installing puppeteer...');
        execSync('npm install puppeteer', { stdio: 'inherit' });

        const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
        });

        const page = await browser.newPage();

        // Path to the HTML file
        const htmlPath = path.join(process.cwd(), 'public/archive/안전관리규정_작성지침.html');
        const pdfPath = path.join(process.cwd(), 'public/archive/안전관리규정_작성지침.pdf');

        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Set content and wait for network idle
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generate PDF
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '20mm',
                right: '20mm'
            },
            printBackground: true
        });

        console.log(`PDF successfully generated at: ${pdfPath}`);

        await browser.close();
    } catch (error) {
        console.error('PDF Generation failed:', error);
        process.exit(1);
    }
}

generatePdf();
