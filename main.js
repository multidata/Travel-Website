// Travel Website - Main JavaScript File

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let chatbotOpen = false;
let currentCarouselIndex = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('../components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            });
    }
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Show loading animation
    showLoading();
    
    // Initialize components after a short delay
    setTimeout(() => {
        hideLoading();
        initializeComponents();
    }, 1500);
}

// Loading Animation
function showLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.remove('hidden');
    }
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
}

// Initialize All Components
function initializeComponents() {
    initializeHeader();
    initializeChatbot();
    initializeCarousels();
    initializeForms();
    initializeDarkMode();
    initializeBackToTop();
    initializeAnimations();
    initializeSearchFunctionality();
    initializeFilterFunctionality();
}

// Header Functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// Chatbot Functionality
function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (!chatbotToggle || !chatbotWindow) return;
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotOpen = !chatbotOpen;
        chatbotWindow.classList.toggle('active', chatbotOpen);
        
        if (chatbotOpen) {
            // Add welcome message
            addChatbotMessage('bot', 'Hello! I\'m your travel assistant. How can I help you today?');
        }
    });
    
    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatbotMessage);
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }
    
    function sendChatbotMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatbotMessage('user', message);
        chatbotInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = generateChatbotResponse(message);
            addChatbotMessage('bot', response);
        }, 1000);
    }
    
    function addChatbotMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function generateChatbotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Flight enquiries
        if (message.includes('flight') || message.includes('airline') || message.includes('booking')) {
            return 'I can help you with flight bookings! Please visit our Flights page or call our booking hotline at +1-800-TRAVEL.';
        }
        
        // Hotel enquiries
        if (message.includes('hotel') || message.includes('accommodation') || message.includes('room')) {
            return 'For hotel bookings, please check our Hotels page. We have partnerships with top hotels worldwide!';
        }
        
        // Timing queries
        if (message.includes('time') || message.includes('schedule') || message.includes('departure')) {
            return 'For real-time schedules and timing information, please visit our respective pages (Flights, Trains, Buses) or contact our support team.';
        }
        
        // General travel info
        if (message.includes('travel') || message.includes('destination') || message.includes('package')) {
            return 'We offer amazing travel packages! Check our Destinations and Travel Packages pages for the best deals.';
        }
        
        // Default response
        return 'Thank you for your message! For detailed assistance, please contact our live agent at support@travelwebsite.com or call +1-800-TRAVEL.';
    }
}

// Carousel Functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        
        if (!carouselInner || items.length === 0) return;
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play
        setInterval(nextSlide, 5000);
    });
}

// Form Validation and Handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // Search forms
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', handleSearchForm);
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

function handleSearchForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchQuery = formData.get('search') || formData.get('query');
    
    if (!searchQuery.trim()) {
        showNotification('Please enter a search term.', 'error');
        return;
    }
    
    // Simulate search
    showNotification(`Searching for: ${searchQuery}`, 'info');
    // In a real application, this would redirect to search results
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    
    // Update header
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('dark', theme === 'dark');
    }
    
    // Update form controls
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.classList.toggle('dark', theme === 'dark');
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .testimonial-card, .feature-item');
    animateElements.forEach(el => observer.observe(el));
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterItems(query, e.target.dataset.target);
        });
    });
}

function filterItems(query, targetSelector) {
    const items = document.querySelectorAll(targetSelector);
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const isVisible = text.includes(query);
        item.style.display = isVisible ? 'block' : 'none';
    });
}

// Filter Functionality
function initializeFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            const targetContainer = e.target.dataset.target;
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Filter items
            filterItemsByCategory(filter, targetContainer);
        });
    });
}

function filterItemsByCategory(category, containerSelector) {
    const items = document.querySelectorAll(`${containerSelector} .filter-item`);
    
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        const isVisible = category === 'all' || itemCategory === category;
        item.style.display = isVisible ? 'block' : 'none';
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for use in other scripts
window.TravelWebsite = {
    showNotification,
    toggleDarkMode,
    applyTheme,
    debounce,
    throttle
}; 