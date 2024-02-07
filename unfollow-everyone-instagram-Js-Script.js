// Run GOOGLE CHROME - WORKING AS OF DEC 26 2023
// Please @ me in the comments if this stops working, I will try to get it working again within the month

// INSTRUCTIONS
// 1. Open Instagram in Chrome
// 2. Click on "FOLLOWING" on your Instagram profile 
// 3. Open developer tools by right clicking on the page and clicking "INSPECT"
// 4. Copy the code below and paste in the developer tools console and press enter to run
// 5. Script will not run if tab is navigated away from, minimized of unfocused (It is recommended to open a new chrome window or push tab to the side and let script run in background)


const unfollowEveryone = (async () => {
  // Modify these variables to your liking
  const UNFOLLOW_LIMIT = 800;

  const BREAK_DURATION = 5 * 60 * 1000; // 5 minutes break

  const TOTAL_DURATION = 10 * 60 * 1000; // 10 minutes duration - Timeout after 10 minutes

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // Find target button
  const findButton = (txt) =>
    [...document.querySelectorAll("button").entries()]
      .map(([pos, btn]) => btn)
      .filter((btn) => btn.innerText === txt)[0];

  console.log("Start unfollowing script...");

  let startTime = new Date().getTime();

  while (new Date().getTime() - startTime < TOTAL_DURATION) {
    for (let i = 0; i < UNFOLLOW_LIMIT; i++) {
      const followingButton = findButton("Following");
      if (!followingButton) {
        continue;
      }
      followingButton.scrollIntoViewIfNeeded();
      followingButton.click();
      await delay(100);
      const confirmUnfollowButton = findButton("Unfollow");
      if (confirmUnfollowButton) {
        await confirmUnfollowButton.click(); // Wait for the unfollow to complete
      }

      // Increase UNFOLLOW_INTERVAL if you are getting rate limited
      // Set this to 0 unfollow as quickly as possible - not recommended
      // Random unfollow interval for each follow to avoid rate limiting
      const UNFOLLOW_INTERVAL = Math.floor(Math.random() * 10 + 1) * 5000;

      console.log(`Wait ${UNFOLLOW_INTERVAL} milliseconds`);
      await delay(UNFOLLOW_INTERVAL);
      console.log(`Unfollowed #${i}`);
    }

    console.log(`Taking a break for ${BREAK_DURATION / 1000} seconds...`);
    await delay(BREAK_DURATION); // Take a break to avoid rate limiting
    startTime = new Date().getTime(); // Reset start time for the next cycle
  }

  console.log("Unfollow script complete!");
})()