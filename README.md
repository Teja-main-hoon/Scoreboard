# Team Scores Overlay

A scoreboard overlay that displays on top of Google Slides presentations, showing real-time scores for 8 teams (Team1 to Team8) fetched from a Google Sheet. The overlay appears as a full-width horizontal bar at the bottom of the screen.

## Features

- 🎯 Always-on-top overlay spanning the full width of the screen at the bottom
- 📊 Real-time score updates from Google Sheets
- 🎨 Modern, animated UI with smooth transitions
- 🔄 Auto-refreshes every 2 seconds
- ✅ Visual indicators for connection status and score updates
- 📱 Single-row horizontal layout displaying all 8 teams across the full screen width
- ➕ Automatic score totaling - add points per question, totals update automatically

## Setup Instructions

### Step 1: Create Your Google Sheet

1. Create a new Google Sheet
2. Set up your sheet with **teams as columns** and **scores in rows**:

   **Format:**
   ```
   | Team1 | Team2 | Team3 | Team4 | Team5 | Team6 | Team7 | Team8 |
   |  =SUM(B3:B100) | =SUM(C3:C100) | ... (Row 2: Total scores - displayed) |
   |   5   |   3   |   5   |   0   |   5   |   3   |   5   |   3   |  <- Row 3: Q1 points
   |   0   |   5   |   0   |   5   |   0   |   5   |   0   |   5   |  <- Row 4: Q2 points
   |  10   |   5   |  10   |   5   |  10   |   5   |  10   |   5   |  <- Row 5: Q3 points
   ```

3. **Recommended Setup:**
   - **Row 1**: Team names (Team1, Team2, Team3, Team4, Team5, Team6, Team7, Team8)
   - **Row 2**: Total scores using SUM formulas (this row is displayed in the overlay)
   - **Rows 3+**: Points earned per question (one row per question)

4. **To set up automatic totaling:**
   - In Row 2, use SUM formulas for each team that sum all question rows below (Row 3 onwards)
   - Example for Team1 (column B): `=SUM(B3:B100)` (adjust range as needed)
   - Example for Team2 (column C): `=SUM(C3:C100)`
   - Continue for all 8 teams
   - The overlay will read the values from Row 2 (the totals row directly below team names)

5. Make sure your team names in Row 1 match: `Team1`, `Team2`, `Team3`, `Team4`, `Team5`, `Team6`, `Team7`, `Team8`

### Step 2: Publish Your Google Sheet

1. In your Google Sheet, go to **File** > **Share** > **Publish to web**
2. Select the sheet/tab containing your scores
3. Choose **CSV** format
4. Click **Publish**
5. Copy the generated URL (it will look like: `https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=...`)

### Step 3: Configure the Overlay

**Option A: Direct Edit (Recommended)**
Edit `index.html` and replace the `sheetsUrl` in the CONFIG object:
```javascript
sheetsUrl: 'YOUR_GOOGLE_SHEETS_CSV_URL'
```

**Option B: URL Parameter**
Open the HTML file with the Google Sheets URL as a parameter:
```
file:///path/to/index.html?url=YOUR_GOOGLE_SHEETS_CSV_URL
```

### Step 4: Run the Overlay

You have two options:

#### Option A: Electron App (Recommended - True Always-on-Top)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure the Google Sheets URL in `index.html` (edit the `sheetsUrl` in CONFIG) or pass it as URL parameter

3. Run the Electron app:
   ```bash
   npm start
   ```

   The overlay will automatically:
   - Stay on top of all windows
   - Position itself at the bottom of the screen, spanning the full width
   - Display all 8 teams in a single horizontal row across the entire screen width
   - Have a transparent, frameless window
   - Update scores automatically as you add points in the Google Sheet

#### Option B: Browser Window

1. Open `index.html` in a web browser
2. Position the browser window at the bottom of your screen
3. Resize the window to full width and approximately 120px tall
4. For "always on top" behavior:
   - **macOS**: Use a third-party app like "Afloat" or "HacKit"
   - **Windows**: Use "Always on Top" utilities or browser extensions
   - **Linux**: Use window manager features or `wmctrl`

### Option C: Standalone Windows App (.exe)

If you want a simple double-clickable `.exe` file that works on Windows without using the command line (perfect for giving to others):

1. **Build it once** (requires Node.js installed):
   - Open command prompt in this folder
   - Run: `npm run package-win`
   - Wait for the build to finish

2. **Run it anywhere**:
   - A new folder `release-builds` will be created
   - Inside, find the `Scoreboard Overlay-win32-x64` folder
   - You can copy this entire folder to any Windows computer
   - Double-click `Scoreboard Overlay.exe` to run!
   - (No Node.js or command line required for the user)

### Alternative: Using Google Apps Script (More Control)

If you need more control or the CSV method doesn't work:

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete the default `myFunction()` and paste this code:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const scores = {};
  
  // Row 1 (index 0) contains team names (columns)
  // Row 2 (index 1) contains the total scores
  if (data.length < 2) {
    return ContentService.createTextOutput(JSON.stringify(scores))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const teamNames = data[0]; // Row 1: Header row with team names
  const totals = data[1]; // Row 2: Total scores row
  
  for (let i = 0; i < teamNames.length && i < 8; i++) {
    if (teamNames[i] && totals[i] !== undefined) {
      scores[teamNames[i]] = totals[i] || 0;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(scores))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as a web app:
   - Click **Deploy** > **New deployment**
   - Choose **Web app**
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click **Deploy** and copy the URL
4. Use this URL in the overlay instead of the CSV URL

## Usage Tips

- **Adding Points**: After each question, enter points for each team in a new row
- **Automatic Totals**: Use SUM formulas in the last row to automatically calculate totals
- The overlay auto-refreshes every 2 seconds
- Green indicator = connected and updating
- Red indicator = connection error
- Scores that change will briefly pulse green
- The overlay remembers your Google Sheets URL in browser localStorage
- The overlay spans the entire bottom of the screen, displaying all 8 teams evenly distributed

## Example Google Sheet Setup

Here's a recommended structure:

|       | Team1 | Team2 | Team3 | Team4 | Team5 | Team6 | Team7 | Team8 |
|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| Total | =SUM(B3:B100) | =SUM(C3:C100) | =SUM(D3:D100) | =SUM(E3:E100) | =SUM(F3:F100) | =SUM(G3:G100) | =SUM(H3:H100) | =SUM(I3:I100) |
| Q1    | 5     | 3     | 5     | 0     | 5     | 3     | 5     | 3     |
| Q2    | 0     | 5     | 0     | 5     | 0     | 5     | 0     | 5     |
| Q3    | 10    | 5     | 10    | 5     | 10    | 5     | 10    | 5     |

The overlay reads from the "Total" row (Row 2), which automatically updates as you add more question rows below it.

## Customization

Edit the `CONFIG` object in `index.html` to customize:
- `refreshInterval`: How often to update (in milliseconds)
- `teams`: Team names (must match your Google Sheet exactly)

Edit the `<style>` section in `index.html` to customize:
- Colors and gradients
- Font sizes
- Spacing and padding
- Animations

The Electron window automatically adjusts to your screen width. To change the height, edit `electron-main.js`:
- `height`: Window height (default: 120px)

## Troubleshooting

**Scores not updating?**
- Check that your Google Sheet is published correctly
- Verify the URL is correct
- Check browser console for errors (F12)
- Ensure team names match exactly (case-sensitive)
- Make sure you have 8 teams in your sheet
- Verify your totals row contains SUM formulas that are calculating correctly

**CORS errors?**
- Make sure your Google Sheet is published (not just shared)
- Try the Google Apps Script method instead

**Overlay not staying on top?**
- Use a window manager tool for your OS
- Consider using Electron for true always-on-top
- Note: Fullscreen presentations on macOS may hide the overlay (use windowed presentation mode instead)

**Teams not displaying correctly?**
- Ensure your Google Sheet has exactly 8 teams as columns
- Check that team names in Row 1 match: Team1, Team2, Team3, Team4, Team5, Team6, Team7, Team8
- Verify the format: teams as columns, scores as rows
- Make sure your totals row (last row) contains the SUM formulas or final scores
- The overlay reads from the last non-empty row, which should be your totals row

**Scores showing as 0 or incorrect?**
- Check that your SUM formulas are calculating correctly
- Verify the formula range includes all question rows
- Make sure the totals row is the last row in your sheet
- Test the formulas manually in Google Sheets

**Overlay not full width?**
- Make sure you're using the Electron version (`npm start`)
- The browser version may require manual resizing
- Check that `electron-main.js` is using `width: width` (screen width) instead of a fixed pixel value

## Browser Compatibility

Works best in:
- Chrome/Edge (recommended)
- Firefox
- Safari

Tested and optimized for modern browsers.

**Summary of changes:**
1. Updated `parseCSV`