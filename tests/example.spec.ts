import { test, expect } from '@playwright/test';

// Import the fetch library for sending data to the backend.
import fetch from 'node-fetch';

test('navigate and get H1 text', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  await page.getByLabel('Accepter').click();
  await page.getByRole('link', { name: 'Meilleures ventes' }).click();
  await page.locator('.zg-carousel-general-faceout').first().click()
  const title = await page.locator('#title').textContent()

  // Prepare the data to send to the backend.
  const scrapedData = { title };

  // Send the scraped data to the backend.
  try {
    const response = await fetch('http://localhost:3000/scraped-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scrapedData),
    });

    if (response.ok) {
      console.log('Data sent successfully:', await response.json());
    } else {
      console.error('Failed to send data:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
});