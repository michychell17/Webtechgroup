// Find every carousel on the page (works for any page that has one)
const carousels = document.querySelectorAll(".carousel");

// Set up each carousel separately
carousels.forEach(function (carousel) {

    // Grab the row of cards and the two arrow buttons inside this carousel
    const track = carousel.querySelector(".flavor-grid");
    const previousButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    // Figures out how far to slide: the width of one card plus the 20px gap
    function scrollAmount() {
        const card = track.querySelector(".flavor-card");
        return card.offsetWidth + 20;
    }

    // When the right arrow is clicked, slide the row to the right
    nextButton.addEventListener("click", function () {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    // When the left arrow is clicked, slide the row to the left
    // (negative number = backwards)
    previousButton.addEventListener("click", function () {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
}); 