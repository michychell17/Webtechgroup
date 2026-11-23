// text-size.js
// Adds three buttons (A, A+, A++) to the header so visitors can make the page bigger.
// Add <script src="text-size.js" defer></script> to the <head> of every page and
// the buttons show up everywhere without touching each page's HTML.

(function () {
    // The three size choices. "zoom" is how much bigger the page gets.
    const levels = [
        { label: "A",   zoom: 1,    name: "Normal text size" },
        { label: "A+",  zoom: 1.15, name: "Larger text size" },
        { label: "A++", zoom: 1.3,  name: "Largest text size" }
    ];

    const header = document.querySelector("header");
    if (!header) return; // no header on this page, so do nothing

    // A group wrapper so screen readers announce "Text size, group"
    const group = document.createElement("div");
    group.className = "text-size-controls";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Text size");

    const buttons = [];

    // Makes the page bigger or smaller and remembers the choice
    function applySize(index) {
        document.body.style.zoom = levels[index].zoom;

        // aria-pressed tells screen readers which button is currently on
        buttons.forEach(function (button, i) {
            button.setAttribute("aria-pressed", i === index ? "true" : "false");
        });

        // Remember the choice so the next page opens at the same size.
        // try/catch because some browsers block saving in private mode.
        try {
            localStorage.setItem("textSizeLevel", String(index));
        } catch (error) {}
    }

    // Build one button per size
    levels.forEach(function (level, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = level.label;
        button.setAttribute("aria-label", level.name);
        button.addEventListener("click", function () {
            applySize(index);
        });
        buttons.push(button);
        group.appendChild(button);
    });

    header.appendChild(group);

    // On page load, use the size the visitor picked last time (or normal)
    let saved = 0;
    try {
        saved = parseInt(localStorage.getItem("textSizeLevel"), 10) || 0;
    } catch (error) {}
    if (saved < 0 || saved >= levels.length) saved = 0;

    applySize(saved);
})();
