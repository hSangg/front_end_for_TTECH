export const openNewWindow = (link) => {
  window.open(link, "_blank");
};

export const smoothScrollTo = (
  element,
  currentScroll,
  targetScroll,
  duration
) => {
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const easeInOutCubic = easeInOutCubicFunction(
      elapsedTime,
      currentScroll,
      targetScroll - currentScroll,
      duration
    );
    element.scrollLeft = easeInOutCubic;

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollLeft = targetScroll;
    }
  };

  requestAnimationFrame(animateScroll);
};

const easeInOutCubicFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};
