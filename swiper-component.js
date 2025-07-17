// Wait for both DOM and scripts to be ready
function initializeSwipers() {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded. Please check the CDN link.');
        return;
    }
    
    // Initialize all Swiper instances
    const swiperInstances = [];
    
    // Find all swiper containers
    const swiperContainers = document.querySelectorAll('.swiper');
    
    if (swiperContainers.length === 0) {
        console.warn('No .swiper elements found on the page.');
        return;
    }
    
    swiperContainers.forEach((container, containerIndex) => {
        try {
            // Destroy existing swiper if it exists
            if (container.swiper) {
                container.swiper.destroy(true, true);
            }
            
            const swiper = new Swiper(container, {
                // Core settings - using 'auto' to respect your fixed widths
                slidesPerView: 'auto',
                spaceBetween: 12,
                loop: true,
                loopAdditionalSlides: 2,
                
                // Ensure smooth looping
                centeredSlides: false,
                speed: 400,
                
                // Touch/drag settings for smooth interaction
                touchRatio: 1,
                touchAngle: 45,
                grabCursor: true,
                
                // Enable free mode for smoother dragging
                freeMode: {
                    enabled: true,
                    sticky: true,
                    minimumVelocity: 0.02,
                },
                
                // Optional controls
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                },
                
                // Prevent interference between swipers
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                
                // Add error handling
                on: {
                    init: function() {
                        console.log(`Swiper ${containerIndex + 1} initialized successfully`);
                        // Ensure slides are properly positioned
                        this.update();
                    },
                    touchStart: function() {
                        // Disable other swipers when this one is being touched
                        swiperInstances.forEach((otherSwiper, index) => {
                            if (index !== containerIndex && otherSwiper && otherSwiper.allowTouchMove !== undefined) {
                                otherSwiper.allowTouchMove = false;
                            }
                        });
                    },
                    touchEnd: function() {
                        // Re-enable all swipers after touch ends
                        setTimeout(() => {
                            swiperInstances.forEach((otherSwiper) => {
                                if (otherSwiper && otherSwiper.allowTouchMove !== undefined) {
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
        }
    });

    // Enhanced GSAP Scroll-Triggered Animation
    function setupScrollAnimations() {
        // Check if GSAP is available
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
                    
                    // Mark as animated to prevent re-animation
                    container.setAttribute('data-animated', 'true');
                    
                    // Clean and quick fade-in animation
                    gsap.fromTo(slides, {
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
                    
                    // Stop observing after animation
                    observer.unobserve(container);
                }
            });
        }, observerOptions);

        // Observe all swiper containers
        swiperContainers.forEach(container => {
            observer.observe(container);
        });
    }

    // Setup animations after swipers are initialized
    setTimeout(() => {
        setupScrollAnimations();
    }, 200);

    // Handle resize
    window.addEventListener('resize', function() {
        swiperInstances.forEach(swiper => {
            if (swiper && swiper.update) {
                swiper.update();
            }
        });
    });

    return swiperInstances;
}

// Multiple ways to ensure everything loads properly
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure scripts are fully loaded
    setTimeout(initializeSwipers, 200);
});

// Backup initialization
window.addEventListener('load', function() {
    // Only initialize if not already done
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