// Birthday VW Bus Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the experience
    initializeExperience();
    
    // Add loading progress animation
    const progressBar = document.querySelector('.loading-progress');
    if (progressBar) {
        progressBar.style.animation = 'loadingProgress 3s ease-in-out forwards';
    }
    
    // Preload any images or resources here if needed
    console.log('🚐 VW Birthday Experience Loaded! 🎉');
    console.log('Keyboard shortcuts: 1-4 for pages, Space for next action');
    console.log('Mobile: Swipe left to advance, tap gift box to open');
    console.log('Easter egg: Click the VW emblem 5 times! 🎁');
});

function initializeExperience() {
    // Show loading screen for 3 seconds
    setTimeout(() => {
        hideLoadingScreen();
        showMainContent();
        startBusAnimation();
    }, 3000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function showMainContent() {
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');
}

function startBusAnimation() {
    const bus = document.getElementById('vw-bus');
    
    // Add extra animations to the bus
    setTimeout(() => {
        bus.style.animation = 'busIdle 3s ease-in-out infinite, busHonk 0.5s ease-in-out';
    }, 1000);
    
    // Make headlights blink more frequently when page loads
    const headlights = document.querySelectorAll('.headlight');
    headlights.forEach(light => {
        light.style.animation = 'headlightBlink 1s infinite';
    });
    
    // Reset headlight animation after 3 seconds
    setTimeout(() => {
        headlights.forEach(light => {
            light.style.animation = 'headlightBlink 4s infinite';
        });
    }, 3000);
}

function startJourney() {
    // Add bus driving animation
    const bus = document.getElementById('vw-bus');
    bus.style.animation = 'busDriveAway 2s ease-in-out forwards';
    
    // Play engine sound if available
    const engineSound = document.getElementById('engine-sound');
    if (engineSound) {
        engineSound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Transition to page 2 after bus animation
    setTimeout(() => {
        showPage('page2');
        animateStats();
    }, 2000);
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
    }, 100);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

function showSurprise() {
    showPage('page3');
    
    // Add extra confetti animation
    setTimeout(() => {
        createExtraConfetti();
    }, 500);
}

function createExtraConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    
    // Create additional confetti pieces
    for (let i = 0; i < 20; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.width = '10px';
        confettiPiece.style.height = '10px';
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.top = '-10px';
        confettiPiece.style.animation = `confettiFall ${2 + Math.random() * 3}s linear infinite`;
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        
        confettiContainer.appendChild(confettiPiece);
        
        // Remove after animation
        setTimeout(() => {
            if (confettiPiece.parentNode) {
                confettiPiece.parentNode.removeChild(confettiPiece);
            }
        }, 5000);
    }
}

function getRandomColor() {
    const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF6347', '#9370DB'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function openGiftBox() {
    const giftBox = document.getElementById('gift-box');
    const couponContainer = document.getElementById('coupon-container');
    const finalBtn = document.getElementById('final-btn');
    
    // Add opened class to gift box
    giftBox.classList.add('opened');
    
    // Play gift opening sound effect (if you add audio)
    playSound('gift-open');
    
    // Show coupon after a delay
    setTimeout(() => {
        couponContainer.classList.remove('hidden');
        
        // Add sparkle effect
        createSparkles(giftBox);
        
        // Show final button after another delay
        setTimeout(() => {
            finalBtn.classList.remove('hidden');
        }, 1000);
    }, 800);
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleAnimation 1.5s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

function showFinalMessage() {
    showPage('page4');
    
    // Add heart explosion effect
    setTimeout(() => {
        createHeartExplosion();
    }, 500);
}

function createHeartExplosion() {
    const hearts = ['❤️', '💙', '💚', '💛', '💜', '🧡'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.transform = 'translate(-50%, -50%)';
        
        const angle = (i / 25) * 360;
        const distance = 100 + Math.random() * 200;
        const duration = 2 + Math.random() * 2;
        
        heart.style.animation = `heartExplosion ${duration}s ease-out forwards`;
        heart.style.setProperty('--angle', angle + 'deg');
        heart.style.setProperty('--distance', distance + 'px');
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }
}

function restartJourney() {
    // Reset all animations and go back to page 1
    const bus = document.getElementById('vw-bus');
    const giftBox = document.getElementById('gift-box');
    const couponContainer = document.getElementById('coupon-container');
    const finalBtn = document.getElementById('final-btn');
    
    // Reset bus animation
    bus.style.animation = 'busIdle 3s ease-in-out infinite';
    
    // Reset gift box
    giftBox.classList.remove('opened');
    couponContainer.classList.add('hidden');
    finalBtn.classList.add('hidden');
    
    // Reset stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.textContent = '0';
    });
    
    // Go back to page 1
    showPage('page1');
    
    // Restart bus animation
    setTimeout(() => {
        startBusAnimation();
    }, 500);
}

function playSound(soundType) {
    // Placeholder for sound effects
    // You can add actual audio files and play them here
    console.log(`Playing sound: ${soundType}`);
}

// Add keyboard shortcuts for navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1':
            showPage('page1');
            break;
        case '2':
            showPage('page2');
            animateStats();
            break;
        case '3':
            showPage('page3');
            break;
        case '4':
            showPage('page4');
            break;
        case ' ': // Spacebar
            e.preventDefault();
            const currentPage = document.querySelector('.page.active');
            if (currentPage) {
                const pageId = currentPage.id;
                switch(pageId) {
                    case 'page1':
                        startJourney();
                        break;
                    case 'page2':
                        showSurprise();
                        break;
                    case 'page3':
                        if (!document.getElementById('gift-box').classList.contains('opened')) {
                            openGiftBox();
                        } else {
                            showFinalMessage();
                        }
                        break;
                    case 'page4':
                        restartJourney();
                        break;
                }
            }
            break;
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe left to go to next page
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swiped left - next page
            const currentPage = document.querySelector('.page.active');
            if (currentPage) {
                const pageId = currentPage.id;
                switch(pageId) {
                    case 'page1':
                        startJourney();
                        break;
                    case 'page2':
                        showSurprise();
                        break;
                    case 'page3':
                        if (!document.getElementById('gift-box').classList.contains('opened')) {
                            openGiftBox();
                        } else {
                            showFinalMessage();
                        }
                        break;
                }
            }
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Add some Easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('vw-emblem')) {
        clickCount++;
        if (clickCount === 5) {
            // Secret VW honk sound
            playSound('vw-honk');
            createSparkles(e.target);
            clickCount = 0;
        }
    }
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust animations based on screen size
    const isMobile = window.innerWidth <= 768;
    const bus = document.getElementById('vw-bus');
    
    if (isMobile && bus) {
        bus.style.left = '5%';
    } else if (bus) {
        bus.style.left = '10%';
    }
});

// End of script
