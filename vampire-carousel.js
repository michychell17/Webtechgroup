
let currentCollection = 0;

function changeCollection(direction) {
    const slides = document.querySelectorAll(
        ".seasonal-carousel .seasonal-slide"
    );

    if (slides.length === 0) return;

    slides[currentCollection].classList.remove("active");

    currentCollection =
        (currentCollection + direction + slides.length)
        % slides.length;

    slides[currentCollection].classList.add("active");
}
