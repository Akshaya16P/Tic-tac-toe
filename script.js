document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Toggle Logic ---
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
            if (nav.classList.contains('show')) {
                toggleBtn.textContent = '❌';
            } else {
                toggleBtn.textContent = '☰';
            }
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                    toggleBtn.textContent = '☰';
                }
            });
        });
    }

    // --- Dynamic Text Animation for Hero Section ---
    const roles = ["Web Developer", "Competitive Coder", "Software Developer"];
    let roleIndex = 0;
    const dynamicRoleElement = document.getElementById('dynamic-role');

    if (dynamicRoleElement) {
        function typeWriterEffect() {
            const currentRole = roles[roleIndex];
            let i = 0;
            dynamicRoleElement.textContent = '';
            
            const typing = setInterval(() => {
                if (i < currentRole.length) {
                    dynamicRoleElement.textContent += currentRole.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(deleteText, 2000);
                }
            }, 100);
        }

        function deleteText() {
            const currentRole = roles[roleIndex];
            let i = currentRole.length;
            const deleting = setInterval(() => {
                if (i > 0) {
                    dynamicRoleElement.textContent = currentRole.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(deleting);
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeWriterEffect, 500);
                }
            }, 50);
        }

        setTimeout(typeWriterEffect, 500);
    }
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-item, .section-title');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Active Nav Link Highlight ---
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Skills Progress Animation ---
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            once: true,
        });
    }

    const progressBars = document.querySelectorAll('.progress-fill');

    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetPercent = parseInt(fill.getAttribute('data-fill'));
                fill.style.width = targetPercent + "%";

                const percentSpan = fill.closest('.progress-container').querySelector('.percent');
                let current = 0;
                const update = setInterval(() => {
                    if (current >= targetPercent) {
                        clearInterval(update);
                    } else {
                        current++;
                        percentSpan.textContent = current + "%";
                    }
                }, 25);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => skillObserver.observe(bar));
});

// --- Certifications Carousel (Swiper) ---
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 20;
const totalCards = cards.length;

function updateCarousel() {
    const newTransformValue = -currentIndex * cardWidth;
    carouselContainer.style.transform = `translateX(${newTransformValue}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // loop
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalCards - 1; // loop backwards
    }
    updateCarousel();
});

// --- Autoplay ---
let autoSlide = setInterval(() => {
    nextBtn.click();
}, 3000);

// Pause on hover
document.querySelector('.carousel-wrapper').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 3000);
});

// --- Modal ---
const modal = document.getElementById("certificateModal");
const modalImg = document.getElementById("certificateImage");
const buttons = document.querySelectorAll(".view-certificate");
const closeBtn = document.getElementsByClassName("close")[0];
    
buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        modalImg.src = this.getAttribute("data-certificate-path");
        modal.style.display = "block";
    });
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

