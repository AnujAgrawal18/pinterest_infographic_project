# Pinterest Infographic Project

This project is a backend service that generates screenshots of an infographic page.  

## Overview

- **Express Server:** Serves the screenshot API endpoint and static files from the `/public` directory.
- **Puppeteer:** Automates Chrome to capture screenshots.  
  - Uses the new headless mode, specified with `headless: "new"` in the Puppeteer launch configuration.
  - Sets navigation timeout to 30 seconds for stable page loading.

## Configuration

- **INFOPAGE_URL:**  
  The URL used to capture the screenshot. This is set with an environment variable. If not defined, it defaults to `http://localhost:3000/`.
  
- **CORS:**  
  CORS headers are configured to allow all origins (for development). Update these for production.

## Usage

1. Ensure Node.js is installed.
2. Install dependencies:
   ```
   npm install
   ```
3. Set the `INFOPAGE_URL` environment variable if needed.
4. Start the server:
   ```
   node server.js
   ```
5. Access the screenshot endpoint at:
   ```
   http://localhost:3000/screenshot
   ```

## Notes

- The project serves the frontend from the `/public` folder. Adjust static file serving as needed.
- In production, update both CORS settings and the fallback URL for screenshots.
