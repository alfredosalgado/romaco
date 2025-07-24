// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initProgressBars();
    initSmoothScrolling();
    initHeaderScroll();
    initProductToggle();
    initHeroScrollIndicator();
    initFloatingButtons();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i') || this;
            if (nav.classList.contains('active')) {
                icon.innerHTML = '✕';
            } else {
                icon.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i') || mobileMenuBtn;
                icon.innerHTML = '☰';
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.value-card, .product-category, .feature-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = parseInt(progressBar.getAttribute('data-percentage') || '100');
                const progressItem = progressBar.closest('.progress-item');
                const percentageSpan = progressItem.querySelector('.progress-label span:last-child');
                
                // Start animation after a short delay
                setTimeout(() => {
                    // Animate the progress bar
                    progressBar.style.width = percentage + '%';
                    progressBar.classList.add('animated');
                    
                    // Animate the percentage number
                    animateNumber(percentageSpan, 0, percentage, 2500);
                }, 300);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Function to animate numbers
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(start + (range * easeOutQuart));
        
        element.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Product filter functionality (if needed)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-category');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
        }
    });
}

// Contact form handling
function handleContactForm() {
    const form = document.querySelector('#contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('¡Gracias por tu consulta! Te contactaremos pronto.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Product Toggle functionality
function initProductToggle() {
    // Convert existing product items to new structure
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        // Check if already converted
        if (item.querySelector('.product-header')) return;
        
        const productName = item.querySelector('.product-name');
        const productDescription = item.querySelector('.product-description');
        const productLinks = item.querySelector('.product-links');
        
        if (productName && productDescription && productLinks) {
            // Create new structure
            const header = document.createElement('div');
            header.className = 'product-header';
            
            const toggle = document.createElement('div');
            toggle.className = 'product-toggle';
            toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
            
            const content = document.createElement('div');
            content.className = 'product-content';
            
            // Move elements to new structure
            header.appendChild(productName);
            header.appendChild(toggle);
            
            content.appendChild(productDescription);
            content.appendChild(productLinks);
            
            // Clear item and add new structure
            item.innerHTML = '';
            item.appendChild(header);
            item.appendChild(content);
            
            // Add click event
            header.addEventListener('click', function() {
                const isExpanded = item.classList.contains('expanded');
                
                if (!isExpanded) {
                    // Expanding: first set max-height to 0, then calculate and animate
                    content.style.maxHeight = '0px';
                    item.classList.add('expanded');
                    
                    // Force reflow to ensure the expanded class is applied
                    content.offsetHeight;
                    
                    // Calculate the actual height needed
                    const actualHeight = content.scrollHeight;
                    content.style.maxHeight = actualHeight + 'px';
                    
                    // After animation completes, remove max-height restriction
                    setTimeout(() => {
                        if (item.classList.contains('expanded')) {
                            content.style.maxHeight = 'none';
                        }
                    }, 400);
                } else {
                    // Collapsing: set specific height first, then animate to 0
                    const currentHeight = content.scrollHeight;
                    content.style.maxHeight = currentHeight + 'px';
                    
                    // Force reflow
                    content.offsetHeight;
                    
                    // Animate to 0
                    content.style.maxHeight = '0px';
                    item.classList.remove('expanded');
                }
                
                // Animate toggle icon
                const icon = toggle.querySelector('i');
                if (item.classList.contains('expanded')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Add hover effect for subtle indication
            header.addEventListener('mouseenter', function() {
                toggle.style.transform = 'scale(1.1)';
                toggle.style.background = 'rgba(250, 176, 18, 0.2)';
            });
            
            header.addEventListener('mouseleave', function() {
                if (!item.classList.contains('expanded')) {
                    toggle.style.transform = 'scale(1)';
                }
                toggle.style.background = 'rgba(250, 176, 18, 0.1)';
            });
        }
    });
}

// Hero Scroll Indicator functionality
function initHeroScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const valueProposition = document.querySelector('.value-proposition');
            if (valueProposition) {
                const targetPosition = valueProposition.offsetTop - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrollY > heroHeight * 0.3) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
}

// Floating Buttons functionality
function initFloatingButtons() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollTopBtn) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            if (scrollY > windowHeight * 0.5) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top functionality
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // WhatsApp button click tracking (optional)
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    }
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', handleContactForm);