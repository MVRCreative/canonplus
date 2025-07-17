// Debug logging
function logSwiperInfo() {
    const allSlides = document.querySelectorAll('[class*="swiper-slide"]');
    console.log('All swiper slides found:', allSlides.length);
    
    allSlides.forEach((slide, index) => {
        const styles = window.getComputedStyle(slide);
        console.log(`Slide ${index}:`, {
            classes: slide.className,
            width: styles.width,
            pointerEvents: styles.pointerEvents,
            userSelect: styles.userSelect,
            touchAction: styles.touchAction,
            parentContainer: slide.closest('[class*="swiper"]')?.className
        });
    });
}

// Initialize Swiper instances
function initializeSwipers() {
    const swiperContainers = document.querySelectorAll('.swiper');
    
    swiperContainers.forEach((container, containerIndex) => {
        try {
            // Check for existing swiper and destroy if needed
            if (container.swiper) {
                container.swiper.destroy(true, true);
            }

            // Detect container type for logging
            const hasAudiobook = container.querySelector('.swiper-slide.is--audiobook');
            const hasCategory = container.querySelector('.swiper-slide.is--category');
            const hasSliderMain = container.querySelector('.swiper-slide.is-slider-main');
            
            // Simplified configuration - CSS now handles the heavy lifting
            const config = {
                slidesPerView: 'auto',
                spaceBetween: 0, // CSS gap handles spacing
                
                // Core swiper settings
                freeMode: {
                    enabled: true,
                    sticky: false, // Prevents unwanted offset
                    minimumVelocity: 0.02,
                },
                
                // Enable loop for smooth infinite scrolling
                loop: true,
                loopAdditionalSlides: 2,
                
                // Responsive and smooth
                speed: 400,
                touchRatio: 1,
                touchAngle: 45,
                grabCursor: true,
                
                // Observer for dynamic content
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                
                // Resistance for natural feel
                resistance: true,
                resistanceRatio: 0.5,
                
                on: {
                    init: function() {
                        const slideTypes = [];
                        if (hasAudiobook) slideTypes.push('audiobook');
                        if (hasCategory) slideTypes.push('category');
                        if (hasSliderMain) slideTypes.push('slider-main');
                        
                        console.log(`✅ Swiper ${containerIndex + 1} initialized:`, {
                            types: slideTypes.length ? slideTypes : ['base'],
                            slidesCount: this.slides.length,
                            allowTouchMove: this.allowTouchMove,
                            loop: this.params.loop
                        });
                        
                        // Setup GSAP animations for this instance
                        setupGSAPAnimations(this);
                    },
                    
                    touchStart: function(swiper, event) {
                        const slideClass = event.target.closest('.swiper-slide')?.className || 'unknown';
                        console.log(`👆 Touch start on container ${containerIndex}:`, {
                            slideClass: slideClass,
                            targetTag: event.target.tagName
                        });
                        this.$el[0].style.cursor = 'grabbing';
                    },
                    
                    touchMove: function(swiper, event) {
                        // Log first touch move to verify functionality
                        if (!this._firstMove) {
                            console.log(`✨ Touch move working on container ${containerIndex}`);
                            this._firstMove = true;
                        }
                    },
                    
                    touchEnd: function() {
                        this.$el[0].style.cursor = 'grab';
                    },
                    
                    slideChange: function() {
                        console.log(`🔄 Slide changed on container ${containerIndex}:`, {
                            activeIndex: this.activeIndex,
                            realIndex: this.realIndex
                        });
                    }
                }
            };

            // Create Swiper instance
            const swiper = new Swiper(container, config);
            
            // Store reference for debugging
            window.swiperInstances = window.swiperInstances || [];
            window.swiperInstances[containerIndex] = swiper;

        } catch (error) {
            console.error(`❌ Error initializing swiper ${containerIndex}:`, error);
        }
    });
}

// Enhanced GSAP animations setup
function setupGSAPAnimations(swiper) {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not loaded - skipping animations');
        return;
    }
    
    const slides = swiper.slides;
    
    slides.forEach((slide, index) => {
        // Reset any existing GSAP animations
        gsap.killTweensOf(slide);
        
        // Different hover animations based on slide type
        const isAudiobook = slide.classList.contains('is--audiobook');
        const isCategory = slide.classList.contains('is--category');
        const isSliderMain = slide.classList.contains('is-slider-main');
        
        // Setup hover animation with different intensities
        slide.addEventListener('mouseenter', () => {
            let scale = 1.02; // Default scale
            let duration = 0.3;
            
            if (isAudiobook) {
                scale = 1.05;
                duration = 0.4;
            } else if (isCategory) {
                scale = 1.08;
                duration = 0.25;
            } else if (isSliderMain) {
                scale = 1.03;
                duration = 0.35;
            }
            
            gsap.to(slide, {
                scale: scale,
                duration: duration,
                ease: 'power2.out',
                zIndex: 10
            });
        });
        
        slide.addEventListener('mouseleave', () => {
            gsap.to(slide, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                zIndex: 1
            });
        });
    });
}

// Test all swiper functionality
function testSwiperFunctionality() {
    setTimeout(() => {
        console.log('\n🧪 Testing swiper functionality...');
        
        document.querySelectorAll('.swiper').forEach((container, index) => {
            const swiper = container.swiper;
            if (swiper) {
                console.log(`Testing swiper ${index + 1}:`, {
                    allowTouchMove: swiper.allowTouchMove,
                    slides: swiper.slides.length,
                    realIndex: swiper.realIndex,
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                    loop: swiper.params.loop
                });
                
                // Test programmatic slide for functional verification
                if (swiper.slides.length > 1) {
                    console.log(`🎬 Testing programmatic slide on swiper ${index + 1}`);
                    swiper.slideNext();
                    setTimeout(() => {
                        swiper.slidePrev();
                        console.log(`✅ Programmatic slide test complete for swiper ${index + 1}`);
                    }, 1000);
                }
            } else {
                console.error(`❌ No swiper instance found for container ${index + 1}`);
            }
        });
    }, 1000);
}

// Verify combo class functionality specifically
function verifyComboClasses() {
    setTimeout(() => {
        console.log('\n🔍 Verifying combo class functionality...');
        
        const audiobookSlides = document.querySelectorAll('.swiper-slide.is--audiobook');
        const categorySlides = document.querySelectorAll('.swiper-slide.is--category');
        
        console.log(`Found ${audiobookSlides.length} audiobook slides`);
        console.log(`Found ${categorySlides.length} category slides`);
        
        // Test touch event handling on combo classes
        audiobookSlides.forEach((slide, index) => {
            const styles = window.getComputedStyle(slide);
            console.log(`Audiobook slide ${index + 1}:`, {
                width: styles.width,
                height: styles.height,
                pointerEvents: styles.pointerEvents,
                userSelect: styles.userSelect,
                swiper: slide.closest('.swiper')?.swiper ? 'Connected' : 'Not connected'
            });
        });
        
        categorySlides.forEach((slide, index) => {
            const styles = window.getComputedStyle(slide);
            console.log(`Category slide ${index + 1}:`, {
                width: styles.width,
                height: styles.height,
                pointerEvents: styles.pointerEvents,
                userSelect: styles.userSelect,
                swiper: slide.closest('.swiper')?.swiper ? 'Connected' : 'Not connected'
            });
        });
    }, 500);
}

// Initialize everything
function initializeAll() {
    console.log('🚀 Initializing swipers with optimized configuration...');
    logSwiperInfo();
    initializeSwipers();
    verifyComboClasses();
    testSwiperFunctionality();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeAll);

// Re-initialize on Webflow page change
if (window.Webflow) {
    window.Webflow.push(() => {
        console.log('🔄 Webflow page change - reinitializing...');
        initializeAll();
    });
}

// Expose debugging functions globally for manual testing
window.debugSwipers = {
    logInfo: logSwiperInfo,
    testFunctionality: testSwiperFunctionality,
    verifyComboClasses: verifyComboClasses,
    instances: () => window.swiperInstances
};