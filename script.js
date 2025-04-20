/**
 * Ahli Sumur - Well Drilling Service Website
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Hero Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Deactivate all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected slide
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for carousel controls
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow();
        });
    });
    
    // Start the slideshow
    startSlideshow();
    
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxCategory = document.querySelector('.lightbox-category');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentLightboxIndex = 0;
    let visibleGalleryItems = [];
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get all currently visible gallery items
            visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
            
            // Find the index of the clicked item in the visible items array
            currentLightboxIndex = visibleGalleryItems.indexOf(item);
            
            // Get image source, title and category
            const imgSrc = item.querySelector('img').getAttribute('src');
            const title = item.querySelector('.gallery-info h3').textContent;
            const category = item.querySelector('.gallery-info p').textContent;
            
            // Set lightbox content
            lightboxImage.setAttribute('src', imgSrc);
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = category;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigate to previous image
    lightboxPrev.addEventListener('click', function() {
        currentLightboxIndex = (currentLightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
        updateLightboxContent();
    });
    
    // Navigate to next image
    lightboxNext.addEventListener('click', function() {
        currentLightboxIndex = (currentLightboxIndex + 1) % visibleGalleryItems.length;
        updateLightboxContent();
    });
    
    // Update lightbox content
    function updateLightboxContent() {
        const currentItem = visibleGalleryItems[currentLightboxIndex];
        const imgSrc = currentItem.querySelector('img').getAttribute('src');
        const title = currentItem.querySelector('.gallery-info h3').textContent;
        const category = currentItem.querySelector('.gallery-info p').textContent;
        
        lightboxImage.setAttribute('src', imgSrc);
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            currentLightboxIndex = (currentLightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
            updateLightboxContent();
        } else if (e.key === 'ArrowRight') {
            currentLightboxIndex = (currentLightboxIndex + 1) % visibleGalleryItems.length;
            updateLightboxContent();
        }
    });
    
    // Testimonial Slider
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let testimonialWidth;
    let visibleTestimonials;
    
    // Set initial state and calculate dimensions
    function initTestimonialSlider() {
        // Calculate how many testimonials to show based on screen width
        if (window.innerWidth >= 992) {
            visibleTestimonials = 3;
        } else if (window.innerWidth >= 768) {
            visibleTestimonials = 2;
        } else {
            visibleTestimonials = 1;
        }
        
        // Calculate the width of each testimonial
        testimonialWidth = 100 / visibleTestimonials;
        
        // Set width for each testimonial card
        testimonialCards.forEach(card => {
            card.style.flex = `0 0 ${testimonialWidth}%`;
        });
        
        // Reset to first slide when resizing
        currentTestimonial = 0;
        updateTestimonialSlider();
    }
    
    // Update testimonial slider position
    function updateTestimonialSlider() {
        const maxPosition = testimonialCards.length - visibleTestimonials;
        
        // Prevent sliding past the last testimonial
        if (currentTestimonial > maxPosition) {
            currentTestimonial = maxPosition;
        }
        
        // Calculate the translation percentage
        const translateValue = -currentTestimonial * testimonialWidth;
        
        // Apply the translation
        testimonialContainer.style.transform = `translateX(${translateValue}%)`;
    }
    
    // Event listeners for testimonial controls
    testimonialPrev.addEventListener('click', function() {
        if (currentTestimonial > 0) {
            currentTestimonial--;
            updateTestimonialSlider();
        }
    });
    
    testimonialNext.addEventListener('click', function() {
        const maxPosition = testimonialCards.length - visibleTestimonials;
        if (currentTestimonial < maxPosition) {
            currentTestimonial++;
            updateTestimonialSlider();
        }
    });
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Update testimonial slider on window resize
    window.addEventListener('resize', initTestimonialSlider);
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || phone === '' || message === '') {
                alert('Mohon isi semua field yang diperlukan.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Mohon masukkan alamat email yang valid.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9+\-\s]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Mohon masukkan nomor telepon yang valid.');
                return;
            }
            
            // If all validations pass, you would normally submit the form
            // For this example, we'll just show a success message
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }
    
    // Floating Action Button (FAB)
    const fabMain = document.querySelector('.fab-main');
    const fabContainer = document.querySelector('.fab-container');
    
    fabMain.addEventListener('click', function() {
        fabContainer.classList.toggle('active');
        fabMain.classList.toggle('active');
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
        if (!fabContainer.contains(e.target) && fabContainer.classList.contains('active')) {
            fabContainer.classList.remove('active');
            fabMain.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.header').offsetHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Initialize the active menu item on page load
    highlightNavItem();
});