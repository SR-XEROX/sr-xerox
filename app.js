// SR Xerox Interactive Machine Experience - Fixed Version
class XeroxMachine {
    constructor() {
        this.isActive = false;
        this.currentSection = null;
        this.isAnimating = false;
        
        // DOM elements
        this.loadingScreen = document.getElementById('loadingScreen');
        this.machineContainer = document.getElementById('machineContainer');
        this.machineBody = document.querySelector('.machine-body');
        this.displayContent = document.getElementById('displayContent');
        this.paperOutput = document.getElementById('paperOutput');
        this.paper = document.getElementById('paper');
        this.paperContent = document.getElementById('paperContent');
        this.backBtn = document.getElementById('backBtn');
        this.controlButtons = document.querySelectorAll('.control-btn');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startMachineSequence();
        this.addMachineAmbientEffects();
    }
    
    setupEventListeners() {
        // Control button listeners
        this.controlButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(e);
            });
            btn.addEventListener('mouseenter', (e) => this.handleButtonHover(e));
            btn.addEventListener('mouseleave', (e) => this.handleButtonLeave(e));
        });
        
        // Back button listener
        this.backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.returnToMachine();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Prevent context menu for immersive experience
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    startMachineSequence() {
        // Hide loading screen after animation
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.display = 'none';
            }
            this.isActive = true;
            this.machineBody.classList.add('active');
            this.startReadySequence();
        }, 7000);
    }
    
    startReadySequence() {
        // Machine ready animations
        setTimeout(() => {
            this.updateDisplay('SYSTEM READY', 'All systems operational');
            this.playMachineSound('ready');
        }, 1000);
        
        setTimeout(() => {
            this.updateDisplay('SR XEROX', 'Perambalur');
        }, 3000);
    }
    
    addMachineAmbientEffects() {
        // Subtle machine breathing effect
        setInterval(() => {
            if (!this.isAnimating) {
                const readyLed = document.querySelector('.ready-led');
                if (readyLed) {
                    readyLed.style.opacity = Math.random() * 0.3 + 0.7;
                }
            }
        }, 2000);
        
        // Random status updates
        setInterval(() => {
            if (!this.isAnimating && this.currentSection === null) {
                const statusMessages = [
                    { title: 'SR XEROX', subtitle: 'Perambalur' },
                    { title: 'READY TO SERVE', subtitle: 'Select an option' },
                    { title: 'QUALITY PRINTING', subtitle: 'Since inception' }
                ];
                const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
                this.updateDisplay(randomMessage.title, randomMessage.subtitle);
            }
        }, 10000);
    }
    
    handleButtonClick(e) {
        if (this.isAnimating) return;
        
        const button = e.currentTarget;
        const section = button.getAttribute('data-section');
        
        console.log('Button clicked:', section); // Debug log
        
        this.activateButton(button);
        this.startPrintingSequence(section);
    }
    
    handleButtonHover(e) {
        if (this.isAnimating) return;
        
        const button = e.currentTarget;
        const section = button.getAttribute('data-section');
        
        // Update display on hover
        const hoverMessages = {
            about: { title: 'ABOUT SR XEROX', subtitle: 'Shop information' },
            services: { title: 'OUR SERVICES', subtitle: 'What we offer' },
            call: { title: 'CONTACT US', subtitle: 'Phone & WhatsApp' },
            gmail: { title: 'EMAIL CONTACT', subtitle: 'Send us a message' },
            directions: { title: 'FIND US', subtitle: 'Location & directions' }
        };
        
        if (hoverMessages[section]) {
            this.updateDisplay(hoverMessages[section].title, hoverMessages[section].subtitle);
        }
        
        // Enhanced button glow
        button.style.transform = 'translateY(-5px) translateZ(15px) scale(1.05)';
    }
    
    handleButtonLeave(e) {
        if (this.isAnimating) return;
        
        const button = e.currentTarget;
        button.style.transform = '';
        
        // Return to default display
        setTimeout(() => {
            if (!this.isAnimating && this.currentSection === null) {
                this.updateDisplay('SR XEROX', 'Perambalur');
            }
        }, 500);
    }
    
    handleKeyPress(e) {
        if (e.key === 'Escape' && this.currentSection) {
            this.returnToMachine();
        }
        
        // Number key shortcuts
        const keyMap = {
            '1': 'about',
            '2': 'services', 
            '3': 'call',
            '4': 'gmail',
            '5': 'directions'
        };
        
        if (keyMap[e.key] && !this.isAnimating) {
            const button = document.querySelector(`[data-section="${keyMap[e.key]}"]`);
            if (button) {
                button.click();
            }
        }
    }
    
    activateButton(button) {
        // Button press animation
        button.style.transform = 'translateY(2px) translateZ(2px) scale(0.95)';
        button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4), inset 0 2px 8px rgba(0,0,0,0.3)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 200);
        
        // Button glow effect
        const btnGlow = button.querySelector('.btn-glow');
        if (btnGlow) {
            btnGlow.style.opacity = '1';
            btnGlow.style.animation = 'glowPulse 0.5s ease-out';
        }
    }
    
    startPrintingSequence(section) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentSection = section;
        
        console.log('Starting printing sequence for:', section); // Debug log
        
        // Update display to show processing
        this.updateDisplay('PROCESSING...', 'Preparing document');
        this.displayContent.classList.add('processing');
        
        // Start machine printing animation
        this.machineBody.classList.add('printing');
        
        // Play printing sequence
        setTimeout(() => {
            this.updateDisplay('PRINTING...', 'Please wait');
            this.playMachineSound('printing');
        }, 1000);
        
        setTimeout(() => {
            this.printDocument(section);
        }, 2000);
    }
    
    printDocument(section) {
        console.log('Printing document for section:', section); // Debug log
        
        // Get content for the section
        const content = this.getContentForSection(section);
        
        if (!content) {
            console.error('No content found for section:', section);
            this.returnToMachine();
            return;
        }
        
        // Set paper content
        this.paperContent.innerHTML = content;
        
        console.log('Paper content set, starting animation'); // Debug log
        
        // Reset paper state first
        this.paper.classList.remove('printing', 'retracting');
        
        // Force reflow
        this.paper.offsetHeight;
        
        // Start paper emergence animation
        setTimeout(() => {
            this.paper.classList.add('printing');
            console.log('Paper animation started'); // Debug log
        }, 100);
        
        // Update machine display
        this.updateDisplay('DOCUMENT READY', 'Please take printout');
        
        // Stop machine effects
        setTimeout(() => {
            this.machineBody.classList.remove('printing');
            this.displayContent.classList.remove('processing');
            this.isAnimating = false;
        }, 2500);
        
        // Start typewriter effect
        setTimeout(() => {
            this.startTypewriterEffect();
        }, 1500);
    }
    
    getContentForSection(section) {
        const contentMap = {
            about: `
                <div class="paper-header">
                    <h2>SR XEROX</h2>
                    <div class="subtitle">(Naseeha General Store)</div>
                    <div class="divider">================================</div>
                </div>
                <div class="paper-body">
                    <div class="address-section">
                        <strong>Address:</strong><br>
                        37-D1, Kamarajar Signal<br>
                        Main Road, Perambalur-621212
                    </div>
                    <br>
                    <div class="description">
                        Your trusted printing partner in Perambalur
                    </div>
                    <br>
                    <div class="details">
                        ✓ Professional printing and xerox services<br>
                        ✓ State-of-the-art equipment and technology<br>
                        ✓ Quality, speed, and reliability guaranteed<br>
                        ✓ Serving Perambalur community with excellence<br>
                        ✓ Complete documentation solutions under one roof
                    </div>
                    <br>
                    <div class="tagline">
                        <strong>Where Quality Meets Efficiency</strong>
                    </div>
                </div>
            `,
            services: `
                <div class="paper-header">
                    <h2>OUR SERVICES</h2>
                    <div class="divider">================================</div>
                </div>
                <div class="paper-body">
                    <div class="service-item">
                        📄 <strong>Photocopying & Xerox</strong><br>
                        High-quality black & white and color photocopying
                    </div>
                    <br>
                    <div class="service-item">
                        🖨️ <strong>Digital Printing</strong><br>
                        Professional color and monochrome printing services
                    </div>
                    <br>
                    <div class="service-item">
                        📚 <strong>Binding & Lamination</strong><br>
                        Document binding, lamination, and finishing services
                    </div>
                    <br>
                    <div class="service-item">
                        📊 <strong>Document Scanning</strong><br>
                        Convert physical documents to digital formats
                    </div>
                    <br>
                    <div class="service-item">
                        🎨 <strong>Design Services</strong><br>
                        Layout design and document formatting
                    </div>
                    <br>
                    <div class="tagline">
                        <strong>Operating Hours:</strong><br>
                        Monday - Saturday: 8:00 AM - 8:00 PM<br>
                        Sunday: 8:30 AM - 4:45 PM
                    </div>
                </div>
            `,
            call: `
                <div class="paper-header">
                    <h2>CONTACT INFORMATION</h2>
                    <div class="divider">================================</div>
                </div>
                <div class="paper-body">
                    <div class="contact-item">
                        📞 <strong>Phone:</strong><br>
                        <a href="tel:+918489413570">+91 84894 13570</a>
                    </div>
                    <br>
                    <div class="contact-item">
                        💬 <strong>WhatsApp:</strong><br>
                        <a href="https://wa.me/918489413570" target="_blank">8489413570</a>
                    </div>
                    <br>
                    <div class="contact-item">
                        📍 <strong>Address:</strong><br>
                        37-D1, Kamarajar Signal<br>
                        Main Road, Perambalur-621212<br>
                        Next to Bawa Medical
                    </div>
                    <br>
                    <div class="tagline">
                        <strong>Quick & Professional Service</strong><br>
                        Call us for urgent printing needs!
                    </div>
                </div>
            `,
            gmail: `
                <div class="paper-header">
                    <h2>EMAIL CONTACT</h2>
                    <div class="divider">================================</div>
                </div>
                <div class="paper-body">
                    <div class="contact-item">
                        ✉️ <strong>Email Address:</strong><br>
                        <a href="mailto:srxeroxpblr@gmail.com">srxeroxpblr@gmail.com</a>
                    </div>
                    <br>
                    <div class="contact-item">
                        📝 <strong>For Email Inquiries:</strong><br>
                        • Service quotations<br>
                        • Bulk order requirements<br>
                        • Special printing projects<br>
                        • Document specifications
                    </div>
                    <br>
                    <div class="contact-item">
                        ⏱️ <strong>Response Time:</strong><br>
                        We typically respond within 2-4 hours<br>
                        during business hours
                    </div>
                    <br>
                    <div class="tagline">
                        <strong>Professional Communication</strong><br>
                        Email us your requirements!
                    </div>
                </div>
            `,
            directions: `
                <div class="paper-header">
                    <h2>DIRECTIONS</h2>
                    <div class="divider">================================</div>
                </div>
                <div class="paper-body">
                    <div class="contact-item">
                        📍 <strong>Our Location:</strong><br>
                        SR Xerox (Naseeha General Store)<br>
                        37-D1, Kamarajar Signal<br>
                        Main Road, Perambalur-621212
                    </div>
                    <br>
                    <div class="contact-item">
                        🗺️ <strong>Landmarks:</strong><br>
                        • Next to Bawa Medical<br>
                        • Near Kamarajar Signal<br>
                        • On Main Road<br>
                        • Sungu Pettai area
                    </div>
                    <br>
                    <div class="contact-item">
                        🚗 <strong>How to Reach:</strong><br>
                        Easy access from main road<br>
                        Parking available nearby<br>
                        <a href="https://maps.google.com/?q=SR+Xerox+Perambalur" target="_blank">Open in Google Maps</a>
                    </div>
                    <br>
                    <div class="tagline">
                        <strong>Easy to Find & Access</strong><br>
                        Visit us at your convenience!
                    </div>
                </div>
            `
        };
        
        return contentMap[section] || null;
    }
    
    startTypewriterEffect() {
        const content = this.paperContent;
        if (!content) return;
        
        console.log('Starting typewriter effect'); // Debug log
        
        // Show content immediately, then add typewriter class for animation
        content.style.opacity = '1';
        content.classList.add('typewriter-effect');
        
        // Remove typewriter effect after animation
        setTimeout(() => {
            content.classList.remove('typewriter-effect');
        }, 3000);
    }
    
    returnToMachine() {
        if (this.isAnimating) return;
        
        console.log('Returning to machine'); // Debug log
        
        this.isAnimating = true;
        
        // Update display
        this.updateDisplay('DOCUMENT STORED', 'Thank you');
        
        // Start paper retraction
        this.paper.classList.remove('printing');
        this.paper.classList.add('retracting');
        
        // Play retraction sound effect
        this.playMachineSound('retract');
        
        setTimeout(() => {
            // Reset paper state
            this.paper.classList.remove('retracting');
            this.paperContent.innerHTML = '';
            this.currentSection = null;
            
            // Return to ready state
            this.updateDisplay('SR XEROX', 'Perambalur');
            this.isAnimating = false;
        }, 1500);
    }
    
    updateDisplay(title, subtitle = '') {
        const titleElement = document.querySelector('.shop-title');
        const subtitleElement = document.querySelector('.shop-subtitle');
        
        if (titleElement) {
            titleElement.textContent = title;
        }
        
        if (subtitleElement) {
            subtitleElement.textContent = subtitle;
        }
        
        // Screen flicker effect
        this.displayContent.style.opacity = '0.7';
        setTimeout(() => {
            this.displayContent.style.opacity = '1';
        }, 100);
    }
    
    playMachineSound(type) {
        // Visual representation of machine sounds
        const statusLeds = document.querySelectorAll('.led');
        const readyLed = document.querySelector('.ready-led');
        
        switch(type) {
            case 'ready':
                if (readyLed) {
                    readyLed.style.animation = 'ledBlink 0.5s ease-in-out 3';
                }
                break;
                
            case 'printing':
                statusLeds.forEach((led, index) => {
                    setTimeout(() => {
                        led.style.opacity = '1';
                        led.style.boxShadow = '0 0 8px #00ff88, 0 0 16px #00ff88';
                        setTimeout(() => {
                            led.style.opacity = index === 1 ? '1' : '0.3';
                            led.style.boxShadow = index === 1 ? '0 0 8px #00ff88, 0 0 16px #00ff88' : 'none';
                        }, 200);
                    }, index * 100);
                });
                break;
                
            case 'retract':
                if (readyLed) {
                    readyLed.style.animation = 'ledBlink 0.3s ease-in-out 5';
                }
                break;
        }
    }
    
    // Additional cinematic effects
    addCinematicEffects() {
        // Subtle camera shake during printing
        if (this.isAnimating && this.machineBody.classList.contains('printing')) {
            const intensity = 0.5;
            const x = (Math.random() - 0.5) * intensity;
            const y = (Math.random() - 0.5) * intensity;
            
            this.machineContainer.style.transform = `translate(${x}px, ${y}px)`;
            
            setTimeout(() => {
                this.machineContainer.style.transform = '';
            }, 50);
        }
    }
    
    // Easter eggs and hidden features
    addEasterEggs() {
        let clickCount = 0;
        const shopTitle = document.querySelector('.shop-title');
        
        if (shopTitle) {
            shopTitle.addEventListener('click', () => {
                clickCount++;
                if (clickCount === 5) {
                    this.updateDisplay('HIDDEN MODE', 'Developer greeting!');
                    setTimeout(() => {
                        this.updateDisplay('CREATED WITH ❤️', 'For SR Xerox');
                    }, 2000);
                    setTimeout(() => {
                        this.updateDisplay('SR XEROX', 'Perambalur');
                        clickCount = 0;
                    }, 4000);
                }
            });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing SR Xerox Machine');
    
    // Create main machine instance
    const machine = new XeroxMachine();
    
    // Make machine globally available for debugging
    window.machine = machine;
    
    // Add cinematic effects
    machine.addEasterEggs();
    
    // Add cinematic camera effects during animations
    setInterval(() => {
        machine.addCinematicEffects();
    }, 100);
    
    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════╗
    ║        SR XEROX - PERAMBALUR         ║
    ║      Interactive Machine v2.0        ║
    ║                                      ║
    ║   Created with ❤️ for amazing UX     ║
    ║                                      ║
    ║   Paper printing now working!        ║
    ╚══════════════════════════════════════╝
    `);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

// Error handling and recovery
window.addEventListener('error', (e) => {
    console.error('SR Xerox Machine Error:', e.error);
    
    const machine = window.machine;
    if (machine && machine.isAnimating) {
        machine.isAnimating = false;
        machine.currentSection = null;
        machine.updateDisplay('SYSTEM ERROR', 'Please refresh page');
    }
});

// Touch gesture support for mobile
class TouchGestureManager {
    constructor() {
        this.startY = 0;
        this.startX = 0;
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        document.addEventListener('touchstart', (e) => {
            this.startY = e.touches[0].clientY;
            this.startX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const diffY = this.startY - endY;
            const diffX = this.startX - endX;
            
            // Swipe up to return to machine (if paper is visible)
            if (diffY > 50 && Math.abs(diffX) < 100) {
                const machine = window.machine;
                if (machine && machine.currentSection) {
                    machine.returnToMachine();
                }
            }
        }, { passive: true });
    }
}

// Initialize touch manager
const touchManager = new TouchGestureManager();