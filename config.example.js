// Example configuration
// Copy this to config.js and update with your Google Sheets URL

const CONFIG = {
    // Your Google Sheets CSV export URL
    // Get this by: File > Share > Publish to web > CSV format
    sheetsUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID',
    
    // How often to refresh scores (in milliseconds)
    refreshInterval: 2000, // 2 seconds
    
    // Team names (must match your Google Sheet exactly)
    teams: ['Team1', 'Team2', 'Team3', 'Team4', 'Team5']
};

// Example Google Sheet format:
// 
// Team Name,Score
// Team1,10
// Team2,15
// Team3,8
// Team4,12
// Team5,20


