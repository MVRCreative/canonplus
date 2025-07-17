# Webflow Export Files

This folder contains the **READ-ONLY** export files from Webflow.

## ⚠️ DO NOT MODIFY THESE FILES

- These files are exported directly from Webflow
- Any changes made here will be **lost** when you re-export from Webflow
- These files serve as **reference** for building custom components

## Contents

### HTML Files
- **`canon-2025.webflow/index.html`** - Main homepage
- **`canon-2025.webflow/style-guide.html`** - Design system/style guide 
- **`canon-2025.webflow/swipe-test.html`** - Swiper testing page
- **`canon-2025.webflow/401.html`** - Unauthorized page
- **`canon-2025.webflow/404.html`** - Not found page

### Stylesheets 
- **`canon-2025.webflow/css/canon-2025.webflow.css`** - Main Webflow styles
- **`canon-2025.webflow/css/normalize.css`** - CSS reset
- **`canon-2025.webflow/css/webflow.css`** - Webflow framework styles

### JavaScript
- **`canon-2025.webflow/js/webflow.js`** - Webflow interactions and functionality

### Assets
- **`canon-2025.webflow/images/`** - All image assets used in the site

## How to Use These Files

1. **Reference only** - Use these to understand the structure and classes
2. **Find class names** - Look up Webflow-generated class names for your custom components
3. **Test locally** - Open HTML files to test your custom components
4. **Copy class references** - Use the exact class names in your custom CSS/JS

## Updating These Files

When you make changes in Webflow:
1. Export the site from Webflow
2. Replace the entire `canon-2025.webflow/` folder
3. Your custom components in `../custom/` will remain intact 