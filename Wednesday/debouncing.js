function debounce(fn, wait = 0, immediate = false) {
  let timer = null;

  return function debounced(...args) {
    const ctx = this;

    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;

      if (!immediate) {
        fn.apply(ctx, args);
      }
    }, wait);

    if (callNow) {
      fn.apply(ctx, args);
    }
  };
}

module.exports = {
  debounce,
};