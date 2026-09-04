/**
 * Lazy-init seminar slider: runs only when .slider_wrap enters viewport.
 * Saves work on pages where the slider is below the fold or never seen.
 */
(function () {
  "use strict";

  const ROOT_MARGIN = "120px"; // start init when slider is 120px from viewport
  const THRESHOLD = 0.01;

  function initSlider() {
    const wrap = document.querySelector(".slider_wrap");
    const track = wrap?.querySelector(".scroll_gallery");
    const header = wrap?.querySelector(".seminar-header");
    const counter = wrap?.querySelector(".seminar-count");
    const counterValue = counter?.querySelector(".seminar-count__value");
    if (!wrap || !track || !header || !counterValue) return;

    const viewport = track.parentElement;
    const originals = Array.from(track.querySelectorAll(".slide_item"));
    if (!viewport || !originals.length) return;

    const BUFFER = 3;
    const DELAY = 3500;
    const TRANSITION = "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)";

    // patched-out: track.style.opacity = "0";
    // patched-out: track.style.visibility = "hidden";

    const clone = (node) => {
      const copy = node.cloneNode(true);
      copy.classList.remove("is-active");
      return copy;
    };
    originals.slice(-BUFFER).forEach((node) =>
      track.insertBefore(clone(node), track.firstChild)
    );
    originals.slice(0, BUFFER).forEach((node) => track.appendChild(clone(node)));

    let slides = Array.from(track.querySelectorAll(".slide_item"));
    let current = BUFFER;
    let currentTranslate = 0;
    let timerId = null;
    let resizeRaf = null;
    let counterTimeout = null;

    let isDragging = false;
    let dragStartX = 0;
    let dragDelta = 0;
    let clickedOnLink = false;

    track.style.willChange = "transform";
    track.style.transition = TRANSITION;

    const revealTrack = () => {
      track.style.opacity = "1";
      track.style.visibility = "visible";
      track.classList.add("is-ready");
    };

    const updateHeaderWidth = () => {
      const active = slides[current];
      if (!active) return;
      header.style.width = `${active.getBoundingClientRect().width}px`;
    };

    const animateCounter = (nextValue) => {
      const gsap = window.gsap;
      if (!gsap) {
        counterValue.classList.add("is-sliding-out");
        counterTimeout = setTimeout(() => {
          counterValue.textContent = nextValue;
          counterValue.classList.remove("is-sliding-out");
          counterValue.classList.add("is-sliding-in");
          requestAnimationFrame(() =>
            counterValue.classList.remove("is-sliding-in")
          );
        }, 150);
        return;
      }

      gsap
        .timeline()
        .to(counterValue, {
          yPercent: -100,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            counterValue.textContent = nextValue;
            gsap.set(counterValue, { yPercent: 100, opacity: 0 });
          },
        })
        .to(
          counterValue,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          ">0"
        );
    };

    const updateCounter = ({ animate = true } = {}) => {
      const nextUnits = slides[current]?.dataset.units || "";
      if (counterValue.textContent === nextUnits) return;
      clearTimeout(counterTimeout);
      if (animate) animateCounter(nextUnits);
      else counterValue.textContent = nextUnits;
    };

    const setActive = ({ animateCounter = true } = {}) => {
      slides.forEach((card) => card.classList.remove("is-active"));
      const active = slides[current];
      if (!active) return;
      active.classList.add("is-active");
      updateCounter({ animate: animateCounter });
      updateHeaderWidth();
    };

    const translateTo = (index, { instant = false } = {}) => {
      const slide = slides[index];
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const viewportCenter = viewport.clientWidth / 2;
      currentTranslate = viewportCenter - slideCenter;

      if (instant) track.style.transition = "none";
      track.style.transform = `translate3d(${currentTranslate}px,0,0)`;
      if (instant)
        requestAnimationFrame(() => {
          track.offsetHeight;
          track.style.transition = TRANSITION;
        });
    };

    const normalizeIfNeeded = () => {
      const total = slides.length;
      const visible = total - BUFFER * 2;
      let adjusted = false;

      if (current >= total - BUFFER) {
        current -= visible;
        translateTo(current, { instant: true });
        adjusted = true;
      } else if (current < BUFFER) {
        current += visible;
        translateTo(current, { instant: true });
        adjusted = true;
      }

      if (adjusted) {
        setActive({ animateCounter: false });
      }
    };

    const scheduleNext = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        current += 1;
        goTo(current);
      }, DELAY);
    };

    const goTo = (index) => {
      current = index;
      translateTo(current);
      setActive();
      scheduleNext();
    };

    const restart = () => {
      clearTimeout(timerId);
      translateTo(current, { instant: true });
      setActive();
      scheduleNext();
    };

    const settleCurrent = () => {
      translateTo(current);
      setActive();
      scheduleNext();
    };

    const pointerDown = (event) => {
      const target = event.target;
      const link = target.closest("a");
      const courseLink = target.closest(".course_link_module");
      const exploreBox = target.closest(".explore_box");

      if (link || courseLink || exploreBox) {
        clickedOnLink = true;
        return;
      }

      clickedOnLink = false;
      isDragging = true;
      dragStartX = event.clientX;
      dragDelta = 0;
      clearTimeout(timerId);
      track.style.transition = "none";
      track.classList.add("is-grabbing");
      track.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };

    const pointerMove = (event) => {
      if (clickedOnLink || !isDragging) return;

      const target = event.target;
      const link = target.closest("a, .course_link_module, .explore_box");
      if (link) {
        clickedOnLink = true;
        isDragging = false;
        track.classList.remove("is-grabbing");
        track.style.transition = TRANSITION;
        return;
      }

      dragDelta = event.clientX - dragStartX;
      track.style.transform = `translate3d(${currentTranslate + dragDelta}px,0,0)`;
      event.preventDefault();
    };

    const pointerUp = (event) => {
      if (clickedOnLink) {
        clickedOnLink = false;
        isDragging = false;
        track.classList.remove("is-grabbing");
        track.style.transition = TRANSITION;
        track.releasePointerCapture?.(event.pointerId);
        return;
      }

      if (!isDragging) return;

      isDragging = false;
      track.classList.remove("is-grabbing");
      track.style.transition = TRANSITION;
      track.releasePointerCapture?.(event.pointerId);

      const slideWidth = slides[current]?.offsetWidth || 1;
      const threshold = slideWidth * 0.15;
      let direction = 0;
      if (dragDelta < -threshold) direction = 1;
      if (dragDelta > threshold) direction = -1;
      dragDelta = 0;

      if (direction === 0) settleCurrent();
      else goTo(current + direction);
    };

    const handleTransitionEnd = (event) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      normalizeIfNeeded();
    };

    setActive();
    translateTo(current, { instant: true });
    requestAnimationFrame(() => {
      revealTrack();
      scheduleNext();
    });

    track.addEventListener("pointerdown", pointerDown, { passive: false });
    track.addEventListener("pointermove", pointerMove, { passive: false });
    window.addEventListener("pointerup", pointerUp);
    track.addEventListener("pointercancel", pointerUp);
    track.addEventListener("transitionend", handleTransitionEnd);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(timerId);
      else restart();
    });

    window.addEventListener("resize", () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        updateHeaderWidth();
        restart();
      });
    });
  }

  function runWhenReady() {
    const wrap = document.querySelector(".slider_wrap");
    if (!wrap) return;

    initSlider();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runWhenReady);
  } else {
    runWhenReady();
  }
})();