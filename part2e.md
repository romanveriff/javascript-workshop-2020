# part 2 exercises

1. implement `reverse()` function that reverses text:

```javascript
const reverse = str => {
  // ...
};
console.log(reverse("hello"));
// olleh
```

2. declare `map()` function identical to `[].map()` using `for`:

```javascript
const map = (f, xs) => {
  // ...
};
console.log(map(i => i + 1, [1, 2, 3]));
// [ 2, 3, 4 ]
```

3. declare `map()` function using `[].forEach`:

```javascript
const map = (f, xs) => {
  // ...
};
console.log(map(i => i + 1, [1, 2, 3]));
// [ 2, 3, 4 ]
```

4. declare `map()` function using `[].reduce`:

```javascript
const map = (f, xs) => {
  // ...
};
console.log(map(i => i + 1, [1, 2, 3]));
// [ 2, 3, 4 ]
```

5. declare `multiply()` function that multiplies all elements of an array
   using `[].reduce`:

```javascript
const multiply = xs => {
  // ...
};
console.log(multiply([1, 2, 3]));
// 6
```

6. declare `fetchCat()` function that wraps fetch() and returns promise.
   when resolved it returns `{ status: "ok", data }`,
   when rejected it returns `{ status: "err", err }`

```javascript
await fetch("https://api.thecatapi.com/v1/images/search?size=full");
```
