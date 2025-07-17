// Swiper Component - Functionality Only
// Let Webflow handle all sizing and spacing

function initializeSwipers() {
    console.log('🔄 Initializing Swipers...');
    
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.error('❌ Swiper library not loaded. Please check the CDN link.');
        return;
    } else {
        console.log('✅ Swiper library is available');
    }
    
    const swiperInstances = [];
    
    // Find all swiper containers (both .swiper and .review_wrapper)
    const swiperContainers = document.querySelectorAll('.swiper');
    const reviewWrappers = document.querySelectorAll('.review_wrapper');
    
    // Combine both types of containers
    const allContainers = [...swiperContainers, ...reviewWrappers];
    
    if (allContainers.length === 0) {
        console.warn('No .swiper or .review_wrapper elements found on the page.');
        return;
    }
    
    console.log(`Found ${swiperContainers.length} swiper containers and ${reviewWrappers.length} review wrapper containers`);
    
    allContainers.forEach((container, containerIndex) => {
        try {
            // For review_wrapper elements, add the swiper class
            if (container.classList.contains('review_wrapper')) {
                container.classList.add('swiper');
                console.log('✅ Added .swiper class to .review_wrapper element');
            }
            
            // Destroy existing swiper if it exists
            if (container.swiper) {
                container.swiper.destroy(true, true);
            }
            
            // Check slide count for loop mode
            const slides = container.querySelectorAll('.swiper-slide');
            const enableLoop = slides.length >= 3; // Need at least 3 slides for smooth loop
            
            console.log(`Container ${containerIndex + 1}: Found ${slides.length} slides, loop enabled: ${enableLoop}`);
            
            const swiper = new Swiper(container, {
                // Let Webflow control sizing - use 'auto' to respect your styles
                slidesPerView: 'auto',
                spaceBetween: 0, // Let Webflow gaps handle spacing
                
                // Core functionality
                loop: enableLoop,
                loopAdditionalSlides: enableLoop ? 2 : 0,
                centeredSlides: false,
                speed: 400,
                
                // Touch/drag settings
                touchRatio: 1,
                touchAngle: 45,
                grabCursor: true,
                
                // Smooth dragging
                freeMode: {
                    enabled: true,
                    sticky: true,
                    minimumVelocity: 0.02,
                },
                
                // Keyboard support
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                
                // Mouse wheel support
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                },
                
                // Progress tracking
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                
                // Events
                on: {
                    init: function() {
                        console.log(`✅ Swiper ${containerIndex + 1} initialized successfully`);
                        this.update();
                        
                        // Make sure all slides are visible
                        const slides = this.slides;
                        slides.forEach(slide => {
                            slide.style.opacity = '1';
                            slide.style.transform = 'none';
                            slide.style.visibility = 'visible';
                        });
                    },
                    
                    // Prevent multiple swiper conflicts
                    touchStart: function() {
                        swiperInstances.forEach((otherSwiper, index) => {
                            if (index !== containerIndex && otherSwiper?.allowTouchMove !== undefined) {
                                otherSwiper.allowTouchMove = false;
                            }
                        });
                    },
                    
                    touchEnd: function() {
                        setTimeout(() => {
                            swiperInstances.forEach((otherSwiper) => {
                                if (otherSwiper?.allowTouchMove !== undefined) {
                                    otherSwiper.allowTouchMove = true;
                                }
                            });
                        }, 100);
                    }
                }
            });
            
            swiperInstances.push(swiper);
            
        } catch (error) {
            console.error(`Failed to initialize Swiper ${containerIndex + 1}:`, error);
            
            // Fallback: ensure slides are visible even without Swiper
            const slides = container.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                slide.style.opacity = '1';
                slide.style.transform = 'none';
                slide.style.visibility = 'visible';
                slide.style.display = 'flex';
            });
        }
    });

    // GSAP Scroll Animations
    function setupScrollAnimations() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP library not loaded. Animations will be skipped.');
            return;
        }
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const container = entry.target;
                    const slides = container.querySelectorAll('.swiper-slide');
                    
                    // Mark as animated
                    container.setAttribute('data-animated', 'true');
                    
                    // Only animate if slides are not already visible
                    const hiddenSlides = Array.from(slides).filter(slide => 
                        parseFloat(window.getComputedStyle(slide).opacity) < 1
                    );
                    
                    if (hiddenSlides.length > 0) {
                        // Animate slides in
                        gsap.fromTo(hiddenSlides, {
                            opacity: 0,
                            y: 30
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            stagger: {
                                amount: 0.4,
                                from: "start"
                            }
                        });
                    }
                    
                    observer.unobserve(container);
                }
            });
        }, observerOptions);

        allContainers.forEach(container => {
            observer.observe(container);
        });
    }

    // Initialize animations
    setTimeout(setupScrollAnimations, 200);

    // Handle window resize
    window.addEventListener('resize', function() {
        swiperInstances.forEach(swiper => {
            if (swiper?.update) {
                swiper.update();
            }
        });
    });

    return swiperInstances;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeSwipers, 200);
});

// Backup initialization
window.addEventListener('load', function() {
    if (document.querySelectorAll('.swiper-initialized').length === 0) {
        initializeSwipers();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeSwipers };
}

// Global usage
if (typeof window !== 'undefined') {
    window.initializeSwipers = initializeSwipers;
} 