const fs = require('fs');

const { debounce } = require('./debouncing');

const {
  throttle,
  once,
  memoize,
  pipe,
  curry,
} = require('./Library');


const fruits = [
  'apple',
  'apricot',
  'banana',
  'blackberry',
  'blueberry',
  'cherry',
  'coconut',
  'date',
  'dragonfruit',
  'elderberry',
  'fig',
  'grape',
  'guava',
  'honeydew',
  'jackfruit',
];


// debounce 

const search = (query) => {
  const results = fruits.filter((f) =>
    f.startsWith(query.toLowerCase())
  );

  console.log(`[${query}] ->`, results);
};

const debouncedSearch = debounce(search, 300);

console.log('Debounce:');

['a', 'ap', 'app', 'appl', 'apple'].forEach((q, i) => {
  setTimeout(() => debouncedSearch(q), i * 50);
});


// throttle 

console.log('Throttle:');

const throttled = throttle(
  (v) => console.log('throttle ->', v),
  200
);

for (let i = 0; i < 6; i++) {
  setTimeout(() => throttled(i), i * 50);
}


// once 

console.log('Once:');

const init = once(() => {
  console.log('initialized');
  return 42;
});

console.log('first call ->', init());

console.log('second call ->', init());


// memoize 
console.log('Memoize:');

function slowFib(n) {
  if (n < 2) return n;

  return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(slowFib);

console.time('fib 35 (first)');

console.log('fib(35)=', fastFib(35));

console.timeEnd('fib 35 (first)');

console.time('fib 35 (cached)');

console.log('fib(35)=', fastFib(35));

console.timeEnd('fib 35 (cached)');


// pipe 

console.log('Pipe:');

const add1 = (x) => x + 1;

const double = (x) => x * 2;

const piped = pipe(add1, double);

console.log('piped(3) ->', piped(3));


// curry 

console.log('Curry:');

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(
  'curriedSum(1)(2)(3) ->',
  curriedSum(1)(2)(3)
);

console.log(
  'curriedSum(1,2)(3) ->',
  curriedSum(1, 2)(3)
);