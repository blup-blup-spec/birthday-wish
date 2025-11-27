const carousel = document.querySelector('.carousel');
const cells = document.querySelectorAll('.carousel__cell');
const cellCount = cells.length;
let selectedIndex = 0;
const radius = Math.round((290 / 2) / Math.tan(Math.PI / cellCount));

function rotateCarousel() {
    const angle = selectedIndex / cellCount * -360;
    carousel.style.transform = 'translateZ(-' + radius + 'px) rotateY(' + angle + 'deg)';
}

// Position cells
cells.forEach((cell, i) => {
    const cellAngle = i / cellCount * 360;
    cell.style.transform = 'rotateY(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
});

// Initial rotation
rotateCarousel();

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel();
});

nextBtn.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel();
});

// Auto rotate slowly
let autoRotate = setInterval(() => {
    selectedIndex++;
    rotateCarousel();
}, 3000);

// Stop auto rotate on interaction
[prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => clearInterval(autoRotate));
    btn.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            selectedIndex++;
            rotateCarousel();
        }, 3000);
    });
});


// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    follower.style.transform = 'scale(1.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
});

// Modal Logic
const wishCard = document.getElementById('wishCard');
const blessingCard = document.getElementById('blessingCard');
const chatModal = document.getElementById('chatModal');
const blessingModal = document.getElementById('blessingModal');
const closeButtons = document.querySelectorAll('.close-modal');

function openModal(modal) {
    modal.classList.add('active');
    if (modal === chatModal) {
        animateMessages();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
}

wishCard.addEventListener('click', () => openModal(chatModal));
blessingCard.addEventListener('click', () => openModal(blessingModal));

closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        closeModal(e.target.closest('.modal-overlay'));
    });
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target);
    }
});

// Animate Chat Messages
function animateMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach((msg, index) => {
        msg.style.animation = 'none';
        msg.offsetHeight; /* trigger reflow */
        msg.style.animation = `slideIn 0.5s ease forwards ${index * 1.5}s`;
    });
}
