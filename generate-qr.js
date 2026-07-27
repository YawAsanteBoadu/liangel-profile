/**
 * generate-qr.js
 * ---------------------------------------------------------------
 * Generates two QR code files that point at your landing page:
 *   - qr-code.png  (raster, good for print / social)
 *   - qr-code.svg  (vector, scales to any size with no blur)
 *
 * USAGE
 *   1. Install the one dependency:  npm install
 *   2. Run with your URL:           node generate-qr.js "https://your-live-url"
 *
 *   If you omit the URL, a placeholder is used so you can test the
 *   output before deploying:        node generate-qr.js
 *
 * RE-RUN ONCE DEPLOYED
 *   After you publish the page (GitHub Pages / Vercel) and know the
 *   real URL, simply run the command again with that URL to overwrite
 *   the two files, e.g.:
 *       node generate-qr.js "https://liangel.vercel.app"
 * ---------------------------------------------------------------
 */

const QRCode = require('qrcode');

// URL passed as the first CLI argument; falls back to a placeholder.
const url = process.argv[2] || 'https://example.com/your-deployed-page';

// Accent color pulled to match the landing page (see --accent in index.html).
const options = {
  errorCorrectionLevel: 'M', // balances density vs. scan reliability
  margin: 2,
  width: 1024,               // PNG resolution
  color: {
    dark: '#2b2622',         // QR modules (near-black, matches brand text)
    light: '#ffffff',        // background
  },
};

async function main() {
  try {
    await QRCode.toFile('qr-code.png', url, options);
    await QRCode.toFile('qr-code.svg', url, { ...options, type: 'svg' });
    console.log('✅ QR codes generated for:', url);
    console.log('   → qr-code.png');
    console.log('   → qr-code.svg');
  } catch (err) {
    console.error('❌ Failed to generate QR codes:', err.message);
    process.exit(1);
  }
}

main();
