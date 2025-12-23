# Scoreboard Overlay

A professional, always-on-top scoreboard overlay for live streams and presentations. It displays real-time scores from a Google Sheet, featuring smooth animations and a modern design.

## Features

- 🎯 **Always-on-top**: Stays visible over full-screen apps (like Google Slides/PowerPoint).
- 📊 **Real-time Updates**: Syncs with Google Sheets.
- ⚡ **Instant Mode**: Updates in ~1 second using direct sheet links.
- 🎨 **Modern UI**: Glassmorphism design with animated rank badges.
- 🛠 **Easy Setup**: Built-in configuration panel - no coding required.
- 📱 **Flexible Layout**: Automatically handles horizontal or vertical score data.

## How to Use

### 1. Set up your Google Sheet
1. Create a new Google Sheet.
2. Enter team names and scores. The app recognizes two formats:
   - **Horizontal (Recommended)**: Row 1 = Names, Row 2 = Scores (e.g. totals).
   - **Vertical**: Column A = Names, Column B = Scores.
3. **Sharing**:
   - Click **Share** (top right).
   - Change "Restricted" to **"Anyone with the link"**.
   - Copy the URL (from your browser address bar).

   *> **Note**: You can also use "Publish to Web" (File > Share > Publish to web), but updates will be slower (~5 mins delay).*

### 2. Run the App
- **Mac**: Double-click the `.app` file.
- **Windows**: Double-click the `.exe` file.

### 3. Configure
1. When the app opens, you will see a **Setup Panel**.
2. Paste your **Google Sheet URL**.
3. Set the number of **Teams**.
4. Click **START**.

The overlay will minimize to the bottom of your screen and start syncing!

---

## For Developers (Building from Source)

If you want to modify the code or build the app yourself:

### Installation
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/scoreboard-overlay.git

# Install dependencies
npm install
```

### Development
```bash
# Run locally
npm start
```

### Building Executables
To create the shareable apps (`.app` or `.exe`):

**For Mac (Apple Silicon)**:
```bash
npm run package-mac-arm64
```
*Output: `release-builds/Scoreboard Overlay-darwin-arm64`*

**For Windows**:
```bash
npm run package-win
```
*Output: `release-builds/Scoreboard Overlay-win32-x64`*

## Troubleshooting

- **Scores not updating?**
  - Make sure your Google Sheet is shared with "Anyone with the link".
  - If using "Publish to Web", updates take ~5 minutes (Google's cache). Use the direct URL for speed.
  
- **Overlay assumes wrong teams?**
  - Ensure your data is in the first few rows/columns.
  - The app looks for the first row with text (Names) and the next row with numbers (Scores).

- **Window not always on top?**
  - On Mac, full-screen apps sometimes hide other windows. Try using "Windowed" fullscreen modes if possible, or desktop spaces.