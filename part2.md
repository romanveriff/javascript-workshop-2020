# part 2

## array

```javascript
console.clear();
console.log(Date.now());

let a = [];
a.push(1);
console.log(a);
console.log(a.pop());
console.log(a);

for (let i = 0; i < 3; i++) {
  a.push(i);
}
console.log(a);

console.log(a.join(" "));

for (let i = 0; i < 3; i++) {
  a.pop(i);
}
console.log(a);

console.log("012".split("").map(Number));

const xs = [1, 2, 3, 4, 5];

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.splice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.splice(0, 3));
// [ 4, 5 ]

console.log(xs.splice(0, 3));
// []

console.log([...Array(3)].map(() => 1));
console.log(Array(3).fill(1));

console.log([...[1, 2], ...[3, 4]]);
console.log([1, 2].concat([3, 4]));

console.log([1, 2, 3].every(x => x > 0));
console.log([1, 2, 3].some(x => x > 0));

console.log([1, 2, 3].filter(x => x > 1));
console.log([1, 2, 3].find(x => x > 1));
console.log([1, 2, 3].findIndex(x => x > 1));
console.log([1, [2, [3]], [4]].flat());
[1, 2, 3].forEach(console.log);
console.log([1, 2, 3].includes(1));
console.log([1, 2, 3].join(","));

console.log([3, 1, 2].sort());
console.log([3, 1, 2].sort((a, b) => a - b));
console.log([3, 1, 2].sort((a, b) => b - a));
console.log([3, 1, 2].reverse());
console.log(
  "hello"
    .split("")
    .reverse()
    .join(""),
);

console.log([1, 2, 3].map(i => i + 1));
```

## async await promise

```javascript
const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve("resolved"), ms));

(async () => {
  console.log(Date.now(), "calling");
  // 1604411025326 calling

  const result = await delay(500);
  console.log(Date.now(), result);
  // 1604411025830 resolved
})();
```

## export import

f.js

```javascript
export default 0;
export const f = 0;
```

g.js

```javascript
import g, { f } from "./f.js";
import { readFileSync } from "fs";

console.log(g);
// 0

console.log(f);
// 0

console.log(readFileSync("src/f.js", "utf8").split(" ")[0]);
// export
```
