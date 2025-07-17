# Canon Plus - Webflow + Custom Components

This project combines Webflow's visual design with custom components for enhanced functionality.

## 📁 Project Structure

```
canonplus/
├── webflow-export/           # 🔒 READ-ONLY Webflow files
│   └── canon-2025.webflow/   # Complete Webflow export
│       ├── index.html        # Main homepage
│       ├── style-guide.html  # Design system
│       ├── swipe-test.html   # Swiper testing page
│       ├── css/              # Webflow stylesheets
│       ├── js/               # Webflow interactions
│       └── images/           # Site assets
├── custom/                   # ✅ Custom components (editable)
│   ├── swiper-component.css  # Swiper styles
│   ├── swiper-component.js   # Swiper functionality
│   └── README.md            # Custom components guide
└── README.md                # This file
```

## 🚨 Important Rules

### ❌ DO NOT MODIFY
- **`webflow-export/`** - These files are overwritten on every Webflow export
- Changes here will be **lost permanently**

### ✅ DO MODIFY  
- **`custom/`** - Add your custom components here
- These files integrate with Webflow but remain separate

## 🔄 Workflow

### 1. Design in Webflow
- Build layouts, styles, and basic interactions in Webflow
- Export the site when ready to test custom components

### 2. Reference Webflow Classes
- Look at `webflow-export/canon-2025.webflow/` files to find class names
- Copy exact class names for your custom components

### 3. Build Custom Components
- Add functionality in `custom/` folder
- Reference Webflow classes without modifying them
- Test locally using the Webflow export files

### 4. Deploy to Webflow
- Add custom CSS/JS to Webflow's custom code sections
- Upload custom assets if needed
- Publish the updated site

## 🎯 Current Custom Components

### Swiper Component
**Files:** `custom/swiper-component.css` + `custom/swiper-component.js`

Advanced carousel functionality with:
- Responsive breakpoints
- GSAP animations  
- Multiple layout variants (`.is-slider-main`, `.reviews-small`)
- Touch/mouse interactions

**Integration:** Add to Webflow's custom code sections

## 🔍 Finding Webflow Classes

To find the correct classes for your custom components:

1. **Open:** `webflow-export/canon-2025.webflow/index.html`
2. **Search:** For elements you want to target
3. **Copy:** Exact class names to use in your custom CSS/JS

Example:
```html
<!-- From Webflow export -->
<div class="swiper-slide is-slider-main reviews-small">
```

```css
/* In your custom CSS */
.swiper-slide.is-slider-main.reviews-small {
    /* Your custom styles */
}
```

## 🎨 Design System Integration

Webflow creates CSS custom properties for your design tokens:
```css
/* Use Webflow's design tokens in custom components */
background-color: var(--_primitives---colors--neutral-darker);
```

Find all available tokens in `webflow-export/canon-2025.webflow/css/canon-2025.webflow.css`

## 🚀 Getting Started

1. **Review Webflow export** to understand the structure
2. **Examine existing custom components** in `custom/`
3. **Build new components** following the established patterns
4. **Test locally** with Webflow export files
5. **Deploy** custom code to Webflow

## 📚 Additional Resources

- **Custom Components:** See `custom/README.md`
- **Webflow Export:** See `webflow-export/README.md`
- **Swiper Documentation:** [swiperjs.com](https://swiperjs.com)
- **GSAP Documentation:** [greensock.com](https://greensock.com) 