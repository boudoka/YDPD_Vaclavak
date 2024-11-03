let slideIndex = 0;
const slides = document.querySelectorAll('.slides .slide'); // Select slide divs
const images = document.querySelectorAll('.slides img'); // Select images
const captions = document.querySelectorAll('.slide .caption'); // Select captions
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Function to display the current slide
function showSlides() {
    // Hide all slides, captions, and remove active dot class
    slides.forEach((slide) => {
        slide.style.opacity = 0;
        slide.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide and caption, and add active class to the corresponding dot
    slides[slideIndex].style.opacity = 1;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    captions[slideIndex].style.opacity = 1; // Show the active caption
}

// Function to change to the next slide automatically
function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides; // Loop back to the first slide after the last
    showSlides();
}

// Dots navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index; // Set the slide index based on the clicked dot
        showSlides();
    });
});

// Automatic Slide
setInterval(nextSlide, 5000); // Automatically change slides every 5 seconds

// Initialize first slide
showSlides();
