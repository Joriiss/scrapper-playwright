import { test, expect } from '@playwright/test';

// Import the fetch library for sending data to the backend.
import fetch from 'node-fetch';

test('navigate and get H1 text', async ({ page }) => {
  // Navigate to the initial page.
  await page.goto('https://volcasun.fr/');
  
  // Click on the "Blog" link.
  await page.getByRole('link', { name: 'Blog' }).first().click();
  
  // Click on the first link in the article with specified text.
  await page.locator('article').filter({ hasText: 'Photovoltaïque Meilleurs' }).getByRole('link').first().click();
  
  // Get the text of the H1 element.
  const h1Text = await page.locator('h1').textContent();
  console.log('H1 Text:', h1Text); // Print the H1 text to the console.

  // Prepare the data to send to the backend.
  const scrapedData = { h1Text };

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
*