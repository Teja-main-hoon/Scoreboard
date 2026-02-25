# How to Create the Windows (.exe) App

Follow these steps on a Windows computer to turn the code into a standalone application.

### 1. Install Node.js
The app needs a "helper" called Node.js to build.
- Go to [nodejs.org](https://nodejs.org/)
- Download the **"LTS"** version (the one on the left).
- Run the installer and just click "Next" on everything until it's finished.

### 2. Get the Code
- Go to the GitHub repository: https://github.com/Teja-main-hoon/Scoreboard
- Click the green **"<> Code"** button.
- Select **"Download ZIP"**.
- Once downloaded, **Extract/Unzip** the folder to your Desktop.

### 3. Build the App
- Open the extracted folder so you see the files (like `package.json`).
- Click in the **Address Bar** at the top of the folder window, type `cmd` and press **Enter**. A black window (Command Prompt) will open.
- Type these two commands, pressing **Enter** after each one:

```bash
npm install
```
*(Wait a minute for it to finish installing labels/packages)*

```bash
npm run package-win
```
*(Wait for it to say "Wrote new app to: release-builds...")*

### 4. Find the App
- Close the black window.
- Inside your folder, a new folder called **`release-builds`** will have appeared.
- Inside that, look for the folder starting with **`Scoreboard Overlay-win32...`**.
- Your finished app is the **`Scoreboard Overlay.exe`** file!

---
*Note: You can now zip up that entire folder and send it back to your friend!*
