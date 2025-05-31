
const BACKEND_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const screenshotBtn = document.getElementById('screenshot-btn');

  screenshotBtn.addEventListener('click', async () => {
    screenshotBtn.disabled = true;
    screenshotBtn.textContent = 'Capturing…';

    try {
      const response = await fetch(`${BACKEND_URL}/screenshot`);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'infographic-screenshot.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
      alert('Error capturing screenshot. See console.');
    } finally {
      screenshotBtn.disabled = false;
      screenshotBtn.textContent = 'Take Screenshot';
    }
  });
});
