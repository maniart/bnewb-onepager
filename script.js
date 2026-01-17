// Carousel Class
class Carousel {
    constructor(containerSelector, dotsContainerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.track = this.container.querySelector('.carousel-track, .testimonial-track');
        this.items = Array.from(this.track.children);
        this.prevBtn = this.container.parentElement.querySelector('.carousel-btn.prev');
        this.nextBtn = this.container.parentElement.querySelector('.carousel-btn.next');
        this.dotsContainer = document.querySelector(dotsContainerSelector);

        this.currentIndex = 0;
        this.totalItems = this.items.length;

        this.init();
    }

    init() {
        if (this.totalItems === 0) return;

        // Create dots
        this.createDots();

        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.showPrevious());
        this.nextBtn?.addEventListener('click', () => this.showNext());

        // Auto-play (optional)
        this.startAutoPlay();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch support
        this.addTouchSupport();
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';
        this.dots = [];

        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

            if (i === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }

    updateDots() {
        if (!this.dots) return;

        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    startAutoPlay(interval = 5000) {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.showNext(), interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoPlay();
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diff = startX - currentX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.showNext();
                } else {
                    this.showPrevious();
                }
            }

            isDragging = false;
            this.startAutoPlay();
        });

        // Mouse drag support for desktop
        let mouseStartX = 0;
        let mouseCurrentX = 0;
        let isMouseDragging = false;

        this.container.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.container.style.cursor = 'grabbing';
            this.stopAutoPlay();
        });

        this.container.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            mouseCurrentX = e.clientX;
        });

        this.container.addEventListener('mouseup', () => {
            if (!isMouseDragging) return;

            const diff = mouseStartX - mouseCurrentX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.showNext();
                } else {
                    this.showPrevious();
                }
            }

            isMouseDragging = false;
            this.container.style.cursor = 'grab';
            this.startAutoPlay();
        });

        this.container.addEventListener('mouseleave', () => {
            if (isMouseDragging) {
                isMouseDragging = false;
                this.container.style.cursor = 'grab';
            }
        });

        this.container.style.cursor = 'grab';
    }
}

// Initialize Carousels
document.addEventListener('DOMContentLoaded', () => {
    // We Believe Carousel
    new Carousel('.carousel', '.carousel-dots');

    // Testimonials Carousel
    new Carousel('.testimonial-carousel', '.testimonial-dots');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for hash-only links like "#book"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Navbar background on scroll (add white background after scrolling)
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});

// Keyboard navigation for carousels
document.addEventListener('keydown', (e) => {
    // This is a simple implementation - you might want to make it more sophisticated
    if (e.key === 'ArrowLeft') {
        document.querySelector('.carousel-btn.prev')?.click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.carousel-btn.next')?.click();
    }
});
