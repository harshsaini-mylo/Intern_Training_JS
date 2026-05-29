// once

const once = (fn) => {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
};


// memoize

const memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
};


// debounce

const debounce = (fn, wait) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};


// throttle

const throttle = (fn, limit) => {
  let waiting = false;

  return (...args) => {
    if (waiting) return;

    fn(...args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
};


// pipe

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);


// curry

const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...nextArgs) =>
      curried(...args, ...nextArgs);
  };
};




module.exports = {
  once,
  memoize,
  debounce,
  throttle,
  pipe,
  curry,
};