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
