# Swiper Component

A robust, responsive, and customizable swiper/carousel component built with the official Swiper.js library and enhanced with GSAP animations. Perfect for creating image galleries, content carousels, and slideshow functionality.

## Features

- 🎯 **Swiper.js Powered** - Built on the industry-standard Swiper.js library
- 📱 **Advanced Touch Support** - Professional-grade gesture recognition and handling
- 🎨 **Auto-Configuration** - Optimized settings applied automatically to all swipers
- 🔄 **Smart Looping** - Seamless continuous scrolling with loop mode
- 🎛️ **Multi-Control** - Mouse wheel, keyboard, and touch navigation
- 📱 **Mobile Optimized** - Responsive design with touch-first approach
- 🌙 **Dark Mode** - Built-in system preference support
- ✨ **GSAP Animations** - Scroll-triggered animations with IntersectionObserver
- 🎯 **Free Mode** - Natural momentum-based scrolling behavior
- 🎨 **Card Layout** - Pre-styled for card-based content with 20rem × 25rem dimensions
- 🚀 **Performance** - Hardware-accelerated with conflict prevention between multiple swipers
- 🛠️ **Auto-Initialize** - Zero configuration needed - just add HTML structure
- 🔧 **Error Handling** - Robust initialization with fallbacks and debugging

## Quick Start

### 1. Include the Required Libraries

```html
<!-- Swiper.js CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Optional: GSAP for enhanced animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Swiper.js JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Your custom CSS and JavaScript -->
<link rel="stylesheet" href="swiper-component.css">
<script src="swiper-component.js"></script>
```

### 2. Create HTML Structure

```html
<div class="swiper" id="mySwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="card">
                <img src="image1.jpg" alt="Slide 1">
                <div class="content">
                    <h3>Card Title 1</h3>
                    <p>Card content here...</p>
                </div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="card">
                <img src="image2.jpg" alt="Slide 2">
                <div class="content">
                    <h3>Card Title 2</h3>
                    <p>Card content here...</p>
                </div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="card">
                <img src="image3.jpg" alt="Slide 3">
                <div class="content">
                    <h3>Card Title 3</h3>
                    <p>Card content here...</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 3. Initialize the Swipers

The swiper will automatically initialize when the page loads. You can also manually initialize:

```javascript
// Automatic initialization (recommended)
// Swipers initialize automatically on DOMContentLoaded

// Manual initialization
const swiperInstances = initializeSwipers();

// Access individual swiper instances
swiperInstances.forEach((swiper, index) => {
    console.log(`Swiper ${index + 1}:`, swiper);
});
```

## Default Configuration

The component uses these optimized settings for all swipers:

| Setting | Value | Description |
|---------|-------|-------------|
| `slidesPerView` | `'auto'` | Respects your CSS-defined slide widths |
| `spaceBetween` | `12` | 12px space between slides |
| `loop` | `true` | Continuous loop mode enabled |
| `loopAdditionalSlides` | `2` | Extra slides for smooth looping |
| `speed` | `400` | 400ms transition speed |
| `freeMode.enabled` | `true` | Natural dragging behavior |
| `freeMode.sticky` | `true` | Slides snap to positions |
| `grabCursor` | `true` | Shows grab cursor on hover |
| `keyboard.enabled` | `true` | Arrow key navigation |
| `mousewheel.enabled` | `true` | Mouse wheel scrolling |

## API Methods

Access individual swiper instances to use the full Swiper.js API:

```javascript
// Get all swiper instances
const swiperInstances = initializeSwipers();

// Control specific swiper
const firstSwiper = swiperInstances[0];

// Navigation
firstSwiper.slideNext();
firstSwiper.slidePrev();
firstSwiper.slideTo(2);

// Loop control
firstSwiper.slideNext(); // Auto-loops to beginning

// Update after DOM changes
firstSwiper.update();

// Destroy
firstSwiper.destroy(true, true);
```

### Event Handling

```javascript
// Listen to swiper events
swiperInstances.forEach(swiper => {
    swiper.on('slideChange', function() {
        console.log('Slide changed to:', this.activeIndex);
    });
    
    swiper.on('touchStart', function() {
        console.log('Touch started');
    });
});
```

## CSS Classes

The component uses the following CSS classes:

- `.swiper` - Main container
- `.swiper-wrapper` - Slides wrapper
- `.swiper-slide` - Individual slide
- `.swiper-pagination` - Pagination container
- `.swiper-pagination-bullet` - Individual pagination bullet
- `.swiper-pagination-bullet-active` - Active pagination bullet
- `.swiper-scrollbar` - Scrollbar container
- `.swiper-scrollbar-drag` - Scrollbar drag element
- `.animate-in` - Animation class for slide entrance
- `.animate-out` - Animation class for slide exit

## Examples

### Basic Card Carousel

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiper Component Example</title>
    
    <!-- Required CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <link rel="stylesheet" href="swiper-component.css">
</head>
<body>
    <div class="swiper" id="cardCarousel">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="card">
                    <img src="https://picsum.photos/320/200?random=1" alt="Image 1">
                    <div style="padding: 16px;">
                        <h3>Card Title 1</h3>
                        <p>Description here...</p>
                    </div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="card">
                    <img src="https://picsum.photos/320/200?random=2" alt="Image 2">
                    <div style="padding: 16px;">
                        <h3>Card Title 2</h3>
                        <p>Description here...</p>
                    </div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="card">
                    <img src="https://picsum.photos/320/200?random=3" alt="Image 3">
                    <div style="padding: 16px;">
                        <h3>Card Title 3</h3>
                        <p>Description here...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Required JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="swiper-component.js"></script>
</body>
</html>
```

### GSAP Integration

```html
<!-- Include GSAP for enhanced animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<div class="swiper" id="animatedSlider">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="card">
                <div style="padding: 40px; text-align: center;">
                    <h2>Animated Slide 1</h2>
                    <p>Enhanced with GSAP animations</p>
                </div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="card">
                <div style="padding: 40px; text-align: center;">
                    <h2>Animated Slide 2</h2>
                    <p>Smooth transitions and effects</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const animatedSlider = new SwiperComponent('#animatedSlider', {
        freeMode: false,
        pagination: true,
        scrollbar: true
    });
</script>
```

### Multiple Swipers on One Page

```html
<!-- All swipers will automatically initialize with optimal settings -->
<div class="swiper" id="products">
    <div class="swiper-wrapper">
        <!-- Product slides -->
        <div class="swiper-slide">
            <div class="card">Product 1</div>
        </div>
        <div class="swiper-slide">
            <div class="card">Product 2</div>
        </div>
        <!-- More slides... -->
    </div>
</div>

<div class="swiper" id="testimonials">
    <div class="swiper-wrapper">
        <!-- Testimonial slides -->
        <div class="swiper-slide">
            <div class="card">Testimonial 1</div>
        </div>
        <div class="swiper-slide">
            <div class="card">Testimonial 2</div>
        </div>
        <!-- More slides... -->
    </div>
</div>

<script>
    // All swipers initialize automatically
    // Each swiper prevents interference with others through smart touch management
</script>
```

## Customization

### Custom Styling

You can easily customize the appearance by overriding the CSS:

```css
/* Custom slide styling */
.swiper-slide {
    width: 300px !important; /* Custom slide width */
    height: 400px !important; /* Custom slide height */
}

/* Custom pagination styling */
.swiper-pagination-bullet {
    background: #007bff;
    width: 16px;
    height: 4px;
    border-radius: 2px;
}

.swiper-pagination-bullet-active {
    background: #0056b3;
}

/* Custom scrollbar styling */
.swiper-scrollbar {
    background: rgba(0, 123, 255, 0.1);
    height: 6px;
}

.swiper-scrollbar-drag {
    background: #007bff;
}

/* Custom card styling */
.swiper-slide .card {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
}

.swiper-slide .card:hover {
    transform: translateY(-10px) rotateY(5deg);
}
```

## Browser Support

- Chrome (all versions)
- Firefox (all versions)
- Safari (all versions)
- Edge (all versions)
- Internet Explorer 11+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v1.0.0
- Initial release
- Basic swiper functionality
- Touch/swipe support
- Autoplay feature
- Responsive design
- Dark mode support 