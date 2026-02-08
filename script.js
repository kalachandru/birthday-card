// ========================================
// Floating Hearts Animation
// ========================================
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '💞'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 800);
}

// ========================================
// Gift Box Sparkles Animation
// ========================================
function createGiftSparkles() {
    const giftBox = document.getElementById('giftBox');
    const sparklesContainer = document.getElementById('sparklesContainer');

    if (!giftBox || !sparklesContainer) return;

    giftBox.addEventListener('click', () => {
        const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎊', '🎉'];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];

                const angle = (Math.PI * 2 * i) / 15;
                const distance = 80 + Math.random() * 40;

                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
                sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

                sparklesContainer.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 2000);
            }, i * 50);
        }
    });
}

// ========================================
// Music Control
// ========================================
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
    } else {
        bgMusic.play().catch(e => console.log('Music play failed:', e));
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
    }
    isMusicPlaying = !isMusicPlaying;
});

// ========================================
// Reason Cards Scroll Reveal
// ========================================
const reasonCards = document.querySelectorAll('.reason-card');

// Reset transform if going back
const prevSection = document.getElementById(`page${newPage}`);
prevSection.style.transform = "translateY(0%)";
currentSection.style.transform = "translateY(100%)";
    }

// Activate new page
const newSection = document.getElementById(`page${newPage}`);
newSection.classList.remove('prev'); // Ensure it's not marked as previous
newSection.classList.add('active');

currentPage = newPage;
}


// --- Page 3: Memory Gallery ---
let currentMemory = 0;
const memories = document.querySelectorAll('.memory-card');

function nextMemory() {
    memories[currentMemory].classList.remove('active');
    currentMemory = (currentMemory + 1) % memories.length;
    memories[currentMemory].classList.add('active');
}

function prevMemory() {
    memories[currentMemory].classList.remove('active');
    currentMemory = (currentMemory - 1 + memories.length) % memories.length;
    memories[currentMemory].classList.add('active');
}

// Auto-rotate memories every 4 seconds
setInterval(nextMemory, 4000);


// --- Page 4: Fireworks & Interaction ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];
let wishRevealed = false;

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize

class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 2;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.distanceTraveled = 0;
        this.distanceToTarget = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        this.active = true;
    }

    update() {
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.x += vx;
        this.y += vy;
        this.distanceTraveled += Math.sqrt(vx * vx + vy * vy);

        if (this.distanceTraveled >= this.distanceToTarget) {
            this.active = false;
            createParticles(this.targetX, this.targetY);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 3 + 1;
        this.friction = 0.95;
        this.gravity = 0.05;
        this.hue = Math.random() * 360;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
    }

    update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createParticles(x, y) {
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.2)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (!fw.active) fireworks.splice(index, 1);
    });

    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
    });

    requestAnimationFrame(animateFireworks);
}

// Launch firework on click
document.addEventListener('click', (e) => {
    // Only active on Page 4
    if (currentPage === 4) {
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight;
        fireworks.push(new Firework(startX, startY, e.clientX, e.clientY));

        // Show wish message after first interaction
        if (!wishRevealed) {
            setTimeout(() => {
                const wishMsg = document.getElementById('wishMessage');
                if (wishMsg) {
                    wishMsg.classList.remove('wish-hidden');
                    wishMsg.classList.add('wish-visible');
                }
            }, 1000);
            wishRevealed = true;
        }
    }
});

animateFireworks();

// ========================================
// Smooth Scroll Enhancement
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animations
// ========================================
const revealElements = document.querySelectorAll('.letter-card, .flip-cards-grid, .polaroid-grid, .quiz-container, .fun-buttons, .cake-container');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'all 0.8s ease';

            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createGiftSparkles();

    // Add initial animations
    setTimeout(() => {
        document.querySelector('.hero-title').style.opacity = '1';
    }, 100);
});

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🎉 Secret unlocked! You found the Konami code! Extra hugs for you! 🤗❤️');
        // Add extra hearts burst
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = '💖';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = '3s';
                heart.style.fontSize = '3rem';
                document.getElementById('floatingHearts').appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 30);
        }
    }
});
