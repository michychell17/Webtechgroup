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

// Sample pop-up events
const bakeryEvents = {
    "2026-11-21": {
        title: "Holiday Dessert Pop-Up",
        location: "Downtown Community Market",
        time: "10:00 a.m. – 3:00 p.m.",
        image: "downtown-market.jpg",
        imageAlt: "Downtown Community Market"
    },

    "2026-11-28": {
        title: "Small Business Saturday",
        location: "Sweetville Town Square",
        time: "9:00 a.m. – 2:00 p.m.",
        image: "town-square.jpg",
        imageAlt: "Sweetville Town Square"
    },

    "2026-12-12": {
        title: "Winter Treat Market",
        location: "Sweetville Community Center",
        time: "11:00 a.m. – 4:00 p.m.",
        image: "community-center.jpg",
        imageAlt: "Sweetville Community Center"
    }
};

const calendarDays = document.getElementById("calendar-days");

// Only run the calendar code on pages containing the calendar
if (calendarDays) {
    const calendarMonth = document.getElementById("calendar-month");
    const eventTitle = document.getElementById("event-title");
    const eventMessage = document.getElementById("event-message");
    const eventLocation = document.getElementById("event-location");
    const eventTime = document.getElementById("event-time");
    const eventImage = document.getElementById("event-image");

    let displayedDate = new Date();

    function createDateKey(year, month, day) {
        const monthNumber = String(month + 1).padStart(2, "0");
        const dayNumber = String(day).padStart(2, "0");

        return `${year}-${monthNumber}-${dayNumber}`;
    }

    function showEvent(dateKey) {
        const event = bakeryEvents[dateKey];

        if (event) {
        eventTitle.textContent = event.title;
        eventMessage.textContent = "Sweetest Slice will be at:";

        eventImage.src = event.image;
        eventImage.alt = event.imageAlt;
        eventImage.hidden = false;

        eventLocation.textContent = "Location: " + event.location;
        eventTime.textContent = "Time: " + event.time;
    } else {
        eventTitle.textContent = "No Events Scheduled";
        eventMessage.textContent =
            "We do not have a pop-up event scheduled for this day.";

        eventImage.hidden = true;
        eventImage.src = "";
        eventImage.alt = "";

        eventLocation.textContent = "";
        eventTime.textContent = "";
    }
}

    function displayCalendar() {
        calendarDays.innerHTML = "";

        const year = displayedDate.getFullYear();
        const month = displayedDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = displayedDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

        // Add blank spaces before the first date
        for (let i = 0; i < firstDay; i++) {
            const emptySpace = document.createElement("span");
            emptySpace.className = "empty-day";
            calendarDays.appendChild(emptySpace);
        }

        // Add each date button
        for (let day = 1; day <= totalDays; day++) {
            const dateButton = document.createElement("button");
            const dateKey = createDateKey(year, month, day);

            dateButton.type = "button";
            dateButton.textContent = day;
            dateButton.dataset.date = dateKey;

            if (bakeryEvents[dateKey]) {
                dateButton.classList.add("has-event");
            }

            dateButton.addEventListener("click", function () {
                const selectedDate =
                    document.querySelector(".selected-date");

                if (selectedDate) {
                    selectedDate.classList.remove("selected-date");
                }

                dateButton.classList.add("selected-date");
                showEvent(dateKey);
            });

            calendarDays.appendChild(dateButton);
        }
    }

    document
        .getElementById("previous-month")
        .addEventListener("click", function () {
            displayedDate.setMonth(displayedDate.getMonth() - 1);
            displayCalendar();
        });

    document
        .getElementById("next-month")
        .addEventListener("click", function () {
            displayedDate.setMonth(displayedDate.getMonth() + 1);
            displayCalendar();
        });

    document
    .getElementById("today-button")
    .addEventListener("click", function () {
        const today = new Date();

        displayedDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        displayCalendar();

        const todayKey = createDateKey(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const todayButton = calendarDays.querySelector(
            `[data-date="${todayKey}"]`
        );

        if (todayButton) {
            todayButton.classList.add("selected-date");
        }

        showEvent(todayKey);
    });
    displayCalendar();
}