const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );
  next();
});

app.get('/screenshot', async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new",
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);

    const INFOPAGE_URL = process.env.INFOPAGE_URL || 'http://localhost:3000/'; 
    await page.goto(INFOPAGE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForTimeout(500);

    const screenshotBuffer = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="infographic.png"',
      'Content-Length': screenshotBuffer.length,
    });
    return res.send(screenshotBuffer);
  } catch (err) {
    console.error('Error taking screenshot:', err);
    return res
      .status(500)
      .json({ error: 'Failed to capture screenshot' });
  } finally {
    if (browser) await browser.close();
  }
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`📸 Screenshot server is running on http://localhost:${PORT}`);
});
