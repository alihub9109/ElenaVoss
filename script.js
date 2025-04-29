document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .testimonial-card, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Sticky navigation on scroll
    const mainNav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // Animate landing page title
    const landingTitle = document.querySelector('.landing-title');
    if (landingTitle) {
        const letters = landingTitle.textContent.split('');
        landingTitle.textContent = '';
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${index * 0.1}s`;
            landingTitle.appendChild(span);
        });
    }

    // Parallax effect for landing page
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.classList.contains('layer-1') ? 5 : 
                        layer.classList.contains('layer-2') ? 10 : 15;
            layer.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    // Project modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModals = document.querySelectorAll('.project-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const modal = document.getElementById(`project-modal-${projectId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = button.closest('.project-modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Gallery navigation
    document.querySelectorAll('.gallery-prev, .gallery-next, .gallery-dot').forEach(control => {
        control.addEventListener('click', function() {
            const gallery = this.closest('.modal-gallery');
            const slides = gallery.querySelectorAll('.gallery-slide');
            const dots = gallery.querySelectorAll('.gallery-dot');
            let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            
            if (this.classList.contains('gallery-prev')) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else if (this.classList.contains('gallery-next')) {
                currentIndex = (currentIndex + 1) % slides.length;
            } else if (this.classList.contains('gallery-dot')) {
                currentIndex = Array.from(dots).indexOf(this);
            }
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        });
    });

    // Testimonial carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.carousel-dot');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active', 'prev', 'next'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
        const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        
        testimonialCards[currentTestimonial].classList.add('active');
        testimonialCards[prevIndex].classList.add('prev');
        testimonialCards[nextIndex].classList.add('next');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    carouselPrev.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });

    carouselNext.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 8000);

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade, .animate-slide-left, .animate-slide-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }

    // Enter button animation
    const enterBtn = document.querySelector('.enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('mouseenter', () => {
            enterBtn.style.transform = 'translateZ(30px)';
        });
        enterBtn.addEventListener('mouseleave', () => {
            enterBtn.style.transform = 'translateZ(0)';
        });
        enterBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
