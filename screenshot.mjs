import puppeteer from '/Users/sophia_w/Desktop/about_me/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'temporary screenshots');
mkdirSync(dir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const existing = readdirSync(dir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const filename = `screenshot-${n}${label}.png`;
const filepath = join(dir, filename);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Users/sophia_w/.cache/puppeteer/chrome/mac_arm-146.0.7680.66/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(`Screenshot saved: temporary screenshots/${filename}`);
