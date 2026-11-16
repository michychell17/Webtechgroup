
function changeDessertPhoto(button, direction) {
    const slider = button.closest(".dessert-photo-slider");

    const photos = slider.dataset.photos
        .split(",")
        .map(photo => photo.trim())
        .filter(Boolean);

    if (!photos.length) return;

    const image = slider.querySelector("img");

    let currentIndex = Number(slider.dataset.index || 0);

    currentIndex =
        (currentIndex + direction + photos.length)
        % photos.length;

    image.src = photos[currentIndex];
    slider.dataset.index = currentIndex;
}
