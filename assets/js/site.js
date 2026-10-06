/* The entire non-serious department. All page content works without this. */
(() => {
  "use strict";

  // Owner switches. The CV prank itself is a normal link in index.html.
  const eggs = { portrait: true, konami: true };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const portrait = document.getElementById("profile-photo");

  if (eggs.portrait && portrait && portrait.dataset.cursed) {
    const normal = portrait.getAttribute("src");
    const cursed = new Image();
    cursed.src = portrait.dataset.cursed;
    let delay;
    let restore;

    const reset = () => {
      window.clearTimeout(delay);
      window.clearTimeout(restore);
      portrait.setAttribute("src", normal);
    };

    portrait.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      delay = window.setTimeout(() => {
        // A missing replacement should never turn the photo into a broken image.
        if (!cursed.complete || !cursed.naturalWidth) return;
        portrait.setAttribute("src", cursed.src);
        restore = window.setTimeout(reset, 650);
      }, 220);
    });
    portrait.addEventListener("pointerleave", reset);
    portrait.addEventListener("error", () => {
      if (portrait.getAttribute("src") !== normal) reset();
    });
    reducedMotion.addEventListener("change", reset);
  }

  if (eggs.konami) {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let keys = [];
    let lastKeyTime = 0;
    document.addEventListener("keydown", (event) => {
      if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
      if (event.target instanceof Element &&
          event.target.closest("input, textarea, select, [contenteditable]")) return;
      const now = Date.now();
      if (now - lastKeyTime > 8000) keys = [];
      lastKeyTime = now;
      keys.push(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      keys = keys.slice(-code.length);
      if (keys.length === code.length && keys.every((key, i) => key === code[i])) {
        keys = [];
        window.alert("Achievement unlocked: +30 lives. Your GPA remains unchanged.");
      }
    });
  }
})();
