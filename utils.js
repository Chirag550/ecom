import confetti from "canvas-confetti";

export const runfire = () => {
  var duration = 5 * 100;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 180, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 5 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.2), y: Math.random() - 0.1 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.8), y: Math.random() - 0.1 },
      })
    );
  }, 250);
};
