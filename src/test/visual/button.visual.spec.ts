import { expect, test } from '@playwright/test';

test.describe('Ladle visual stories', () => {
  test('button default story renders', async ({ page }) => {
    // Navigate to button default story
    await page.goto('/?story=button--default');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForLoadState('networkidle');

    // Wait for main content area to be present
    const main = page.locator('main');
    await expect(main).toBeVisible({ timeout: 10000 });
    
    // Take screenshot of the story area
    await expect(main).toHaveScreenshot('button-default.png');
  });
});
