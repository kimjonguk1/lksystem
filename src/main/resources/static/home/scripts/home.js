document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    let currentSlide = 0;
    let intervalId = null;

    // Functions
    const moveToSlide = (index) => {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = index;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    };

    // Event Listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetInterval();
        });
    });

    // Auto-advance slides
    const startInterval = () => {
        intervalId = setInterval(nextSlide, 10000); // Change slide every 5 seconds
    };

    const resetInterval = () => {
        clearInterval(intervalId);
        startInterval();
    };

    // Start the carousel
    startInterval();
});