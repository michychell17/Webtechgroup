const slideshows = document.querySelectorAll(".slideshow");

slideshows.forEach(function (slideshow) {
    const images = slideshow.querySelectorAll(".dessert-image");
    const previousButton = slideshow.querySelector(".previous");
    const nextButton = slideshow.querySelector(".next");

    let currentImage = 0;

    function showImage(imageNumber) {
        images.forEach(function (image) {
            image.classList.remove("active");
        });

        images[imageNumber].classList.add("active");
    }

    nextButton.addEventListener("click", function () {
        currentImage++;

        if (currentImage >= images.length) {
            currentImage = 0;
        }

        showImage(currentImage);
    });

    previousButton.addEventListener("click", function () {
        currentImage--;

        if (currentImage < 0) {
            currentImage = images.length - 1;
        }

        showImage(currentImage);
    });
});