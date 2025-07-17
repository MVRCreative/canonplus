// Debug logging
function logSwiperInfo() {
    const allSlides = document.querySelectorAll('[class*="swiper-slide"]');
    console.log('All swiper slides found:', allSlides.length);
    
    allSlides.forEach((slide, index) => {
        console.log(`Slide ${index}:`, {
            classes: slide.className,
            computedStyles: window.getComputedStyle(slide),
            parentContainer: slide.closest('[class*="swiper"]')?.className
        });
    });
}

// Initialize Swiper instances with class-specific configs
function initializeSwipers() {
    const swiperContainers = document.querySelectorAll('.swiper');
    
    swiperContainers.forEach((container, containerIndex) => {
        try {
            // Check for existing swiper and destroy if needed
            if (container.swiper) {
                container.swiper.destroy(true, true);
            }

            // Detect container type
            const hasAudiobook = container.querySelector('.swiper-slide.is--audiobook');
            const hasCategory = container.querySelector('.swiper-slide.is--category');
            
            // Base configuration that works for all types
            const config = {
                slidesPerView: 'auto',
                spaceBetween: 0, // Let Webflow flexbox handle gaps
                freeMode: {
                    enabled: true,
                    sticky: false, // Prevents unwanted offset
                    minimumVelocity: 0.02,
                },
                loop: false, // Disable loop to prevent spacing issues
                speed: 800,
                observer: true,
                observeParents: true,
                watchOverflow: true,
                roundLengths: true, // Prevents blurry text
                grabCursor: true,
                resistance: true,
                resistanceRatio: 0.5,
                on: {
                    init: function() {
                        // Force correct initial position
                        this.setTranslate(0);
                        
                        // Setup GSAP animations for this instance
                        setupGSAPAnimations(this);
                    },
                    touchStart: function() {
                        // Disable transitions during touch
                        this.$el[0].style.cursor = 'grabbing';
                    },
                    touchEnd: function() {
                        this.$el[0].style.cursor = 'grab';
                    }
                }
            };

            // Create Swiper instance
            const swiper = new Swiper(container, config);
            
            // Log debug info after initialization
            console.log(`Swiper ${containerIndex} initialized:`, {
                type: hasAudiobook ? 'audiobook' : hasCategory ? 'category' : 'standard',
                config: config,
                element: container
            });

        } catch (error) {
            console.error(`Error initializing swiper ${containerIndex}:`, error);
        }
    });
}

// Enhanced GSAP animations setup
function setupGSAPAnimations(swiper) {
    const slides = swiper.slides;
    
    slides.forEach((slide) => {
        // Reset any existing GSAP animations
        gsap.killTweensOf(slide);
        
        // Setup hover animation
        slide.addEventListener('mouseenter', () => {
            gsap.to(slide, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        slide.addEventListener('mouseleave', () => {
            gsap.to(slide, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    logSwiperInfo();
    initializeSwipers();
});

// Re-initialize on Webflow page change
window.Webflow && window.Webflow.push(() => {
    logSwiperInfo();
    initializeSwipers();
}); 