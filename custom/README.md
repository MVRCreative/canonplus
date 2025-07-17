# Custom Components

This folder contains **custom components and scripts** that extend the functionality of the Webflow site.

## 🚨 Important Rules

- **DO NOT** modify files in `../webflow-export/` - those are read-only Webflow exports
- **DO** add custom functionality here that will be included in the live site
- **DO** reference Webflow classes and IDs from the export files for integration

## Current Components

### Swiper Component
- **`swiper-component.css`** - Custom styles for Swiper.js sliders
- **`swiper-component.js`** - JavaScript functionality for Swiper initialization and animations

## Integration with Webflow

1. **Include these files** in your Webflow project's custom code sections
2. **Reference Webflow classes** from the export files to target elements
3. **Test locally** using the files in `../webflow-export/` as reference

## Adding New Components

When adding new custom components:
1. Create separate CSS/JS files for each component
2. Follow the naming convention: `component-name.css` and `component-name.js`
3. Document the component's purpose and usage
4. Test with the Webflow export files as reference

## CSS Variables

When using Webflow design tokens, reference them exactly as they appear in the Webflow export:
```css
/* Example from Webflow */
background-color: var(--_primitives---colors--neutral-darker);
``` 