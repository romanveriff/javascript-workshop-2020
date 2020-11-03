# part 1

```javascript
// little helper functions
//

// debug to console
const debug = console.info;

// pluralize
const pluralize = (singular, plural, x) => {
  switch (x) {
    case 0:
      return `no ${plural}`;
    case 1:
      return `${x} ${singular}`;
    default:
      return `${x} ${plural}`;
  }
};

const summary = ({ messages, users }) =>
  `[${pluralize("message", "messages", messages.length)}, ${pluralize(
    "user",
    "users",
    users.length,
  )}]`;

// formats timestamps as HH:MM:SS
const formatTime = time =>
  new Date(time).toLocaleTimeString("en-UK", {
    timeZone: "Europe/Tallinn",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// compose functions
const pipe = (...fns) => (...args) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

// generate timestamps for initial model and events
const rndTime = offset => Date.now() + offset * 1000;
const t8 = rndTime(8);
const t12 = rndTime(12);

// view renders model
//
const view = ({ users, messages }) =>
  console.log(
    "view",
    summary({ users, messages }),
    messages.map(
      m =>
        `${m.isDeleted ? "X " : "  "}${formatTime(m.time)} ${m.user}: ${
          m.text
        }`,
    ),
  );

// update generates a new model based on event and current model
//
const update = e => model => {
  debug("update", summary(model), e);
  switch (e.action) {
    case "ADD_MESSAGE":
      // adds the message to the end of messages
      return { ...model, messages: [...model.messages, e.payload] };

    case "DELETE_MESSAGE":
      // marks the message as deleted
      return {
        ...model,
        messages: model.messages.map(m =>
          m.time === e.payload.time ? { ...m, isDeleted: true } : m,
        ),
      };

    default:
      // otherwise returns the current model
      return model;
  }
};

// collection of events
//
const events = [
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(1), user: "roman", text: "hello" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(2), user: "liisbet", text: "hi, darling" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: rndTime(5), user: "roman", text: "want to learn js?" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t8, user: "liisbet", text: "when?" },
  },
  {
    action: "DELETE_MESSAGE",
    payload: { time: t8 },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t12, user: "liisbet", text: "when do we start?" },
  },
  {
    action: "ADD_MESSAGE",
    payload: { time: t12, user: "roman", text: "today" },
  },
];

// the app is a composition of all updates and view function
//
const app = pipe(
  ...events.map(update),
  view,
);

// initial model
//
const init = { users: ["roman", "liisbet"], messages: [] };

// call the app function with the initial model
//
app(init);

/* app's output:

update [no messages, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503884906, user: 'roman', text: 'hello' }
}
update [1 message, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503885906, user: 'liisbet', text: 'hi, darling' }
}
update [2 messages, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503888906, user: 'roman', text: 'want to learn js?' }
}
update [3 messages, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503891906, user: 'liisbet', text: 'when?' }
}
update [4 messages, 2 users] { action: 'DELETE_MESSAGE', payload: { time: 1604503891906 } }
update [4 messages, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503895906, user: 'liisbet', text: 'when do we start?' }
}
update [5 messages, 2 users] {
  action: 'ADD_MESSAGE',
  payload: { time: 1604503895906, user: 'roman', text: 'today' }
}
view [6 messages, 2 users] [
  '  17:31:24 roman: hello',
  '  17:31:25 liisbet: hi, darling',
  '  17:31:28 roman: want to learn js?',
  'X 17:31:31 liisbet: when?',
  '  17:31:35 liisbet: when do we start?',
  '  17:31:35 roman: today'
]

*/
```

## comments

```javascript
/*
  in javascript code for you can use
  multiline comments...
*/

// ...and one line comments
```

## console.log

to see what our program is doing we call `console.log` function. it
outputs a message to the console.

it accepts primitives, constants, objects...

```javascript
console.log(0);
// 0

const y = 0;
console.log(y);
// 0

console.log({ y: y });
// { y: 0 }

console.log({ y });
// { y: 0 }
```

...and multiple agruments:

```javascript
console.log(y, "string", 0);
// 0 string 0
```

## const

use `const` to declare a read-only named constants.
if you try to declare a constant with the same name in this scope again
you will get a syntax error:

```javascript
const a = 0;

const a = 1;
// SyntaxError: Identifier 'a' has already been declared
```

## function

how to declare the simplest function (it accepts no arguments and
returns `undefined`):

```javascript
function f() {}
console.log(f);
// [Function: f]

const g = () => {};
console.log(g);
// [Function: g]
```

how to call a function?

```javascript
function f(msg) {
  return `${this?.name}: ${msg}`;
}
console.log(f("hello"));
// undefined: hello

console.log(f.call({ name: "roman" }, "hello"));
// roman: hello

console.log(f.bind({ name: "roman" }, "hello")());
// roman: hello
```

how to call an arrow function?

```javascript
const f = msg => msg;
console.log(f("hello"));
// hello

console.log(f.call(null, "hello"));
// hello

console.log(f.bind(null, "hello")());
// hello
```

how to output a source code of a function?

```
console.log(f.toString());
// function f() {}

const g = () => {};
console.log(g.toString());
// () => {}
```

a function can accept arguments:

```javascript
function f1() {
  return arguments;
}
console.log(f1(1, 2, 3));
// [Arguments] { '0': 1, '1': 2, '2': 3 }

function f2(a, ...b) {
  return { a, b };
}
console.log(f2(1, 2, 3));
// { a: 1, b: [ 2, 3 ] }

function f3(...args) {
  return args;
}
console.log(f3(1, 2, 3));
// [ 1, 2, 3 ]

const f4 = (...args) => args;
console.log(f4(1, 2, 3));
// [ 1, 2, 3 ]

const f5 = a => a;
console.log(f5(1, 2, 3));
// 1

console.log((a => a)(1));
// 1  // immediately invoked function execution

console.log(((a = 1) => a)());
// 1  // default argument

console.log(((a, ...b) => ({ a, b }))(1, 2, 3));
// { a: 1, b: [ 2, 3 ] }
```

...and finally function can do something and return data primitives, structured
data, or even other functions:

```javascript
const add = x => y => x + y;
console.log(add(1));
// [Function (anonymous)]
console.log(add(1)(1));
// 2

const inc = add(1);
console.log(inc(1));
// 2

const log1 = x => console.log(x);
log1(0, 1);
// 0

const log2 = (...args) => console.log(...args);
log2(0, 1);
// 0 1

const log3 = console.log;
log3(0, 1);
// 0 1
```

some functions are pure:

```javascript
const xs = [1, 2, 3, 4, 5];

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.slice(0, 3));
// [ 1, 2, 3 ]
```

other function are impure:

```javascript
console.log(xs.splice(0, 3));
// [ 1, 2, 3 ]

console.log(xs.splice(0, 3));
// [ 4, 5 ]

console.log(xs.splice(0, 3));
// []
```

> _a pure function_ is a function that, given the same input, will always
> return the same output and does not have any observable side effect.

> _a side effect_ is a change of system state or observable interaction
> with the outside world that occurs during the calculation of a result.

why pure functions?

- cacheble by input,
- testable,
- reasonable,
- easier to parallelize.

## scope and closure

the area outside all the functions is _global scope_. things declared
inside a function are only accessible within its _local scope_. things
declared within outer scope are accessible from inner scope.

```javascript
const a = 0;
(() => {
  const b = 1;

  console.log("inner", a);
  // inner 0

  console.log("inner", b);
  // inner 1
})();

console.log("outer", a);
// outer 0

console.log("outer", b);
// ReferenceError: b is not defined
```

```javascript
const curry = f => {
  const _ = (...args) =>
    args.length < f.length ? _.bind(null, ...args) : f(...args);
  return _;
};

const filter = curry((f, xs) => xs.filter(f));
```

## numbers

```javascript
console.log(1);
// 1
```

to see the type we use `typeof` operator:

```javascript
console.log(typeof 1);
// number
```

with numbers we can do basic math:

```javascript
console.log(1 + 1);
// 2

console.log(1 / 0);
// Infinity // wat!

console.log(0 / 0);
// NaN // wat!

console.log(0.1 + 0.2);
// 0.30000000000000004 // wat!

console.log(12 % 5);
// 2

console.log(-12 % 5);
// -2

console.log(4 % 2);
// 0

console.log(-4 % 2);
// -0 // wat!

console.log(2 ** (3 ** 2));
// 512

console.log((2 ** 3) ** 2);
// 64

console.log(Number.parseFloat("01.50 eur"));
// 1.5

console.log(Number.parseInt("100", 2));
// 4

console.log(Number.parseInt("100", 10));
// 100

console.log(Number.parseInt("100", 16));
// 256

console.log(Number(Math.PI).toFixed(2));
// 3.14

console.log(Number(Math.PI).toString(2));
// 11.001001000011111101101010100010001000010110100011
```

## math

```javascript
console.log(Math.E);
// 2.718281828459045

console.log(Math.E);
// 3.141592653589793

console.log(Math.abs(-1));
// 1

console.log(Math.ceil(0.5));
// 1

console.log(Math.floor(1.5));
// 1

console.log(Math.round(1.49));
// 1

console.log(Math.round(0.5));
// 1

console.log(Math.min(1, 2));
// 1

console.log(Math.max(0, 1));
// 1

console.log(Math.pow(2, 0));
// 1

console.log(Math.random());
// 0.7847719258029551

console.log(Math.trunc(Math.PI));
// 3
```

## date

```javascript
console.log(Date.now());
// 1604565720000

console.log(new Date("05 Nov 2020 10:42:00 GMT+2").getTime());
// 1604565720000

console.log(Date.parse("2020-11-05T10:42:00+02:00"));
// 1604565720000

console.log(Date.parse("05 Nov 2020 10:42:00 GMT+2"));
// 1604565720000

console.log(Date.parse("1970-01-01T00:00:00+00:00"));
// 0 // unix time starts on 1 jan 1971

console.log(new Date("05 Nov 2020 10:42:00 GMT+2").toISOString());
// 2020-11-05T08:42:00.000Z

console.log(new Date("2020-11-05T10:42:00+02:00").toUTCString());
// Thu, 05 Nov 2020 08:42:00 GMT
```

## strings

```javascript
console.log("abc".concat("d"));
// abcd

console.log("abc".endsWith("bc"));
// true

console.log("abc".includes("a"));
// true

console.log("bbb".indexOf("b"));
// 0

console.log("bbb".lastIndexOf("b"));
// 2

console.log("abc".match("a"));
// [ 'a', index: 0, input: 'abc', groups: undefined ]

console.log("abc".matchAll("a"));
// Object [RegExp String Iterator] {}
```

## < > >= <= === !== ! && ||

```javascript
console.log(1 < 2);
// true

console.log(1 < 2 < 3);
// true

console.log(3 > 2 > 1);
// false // wat!

console.log(1 >= 1);
// true

console.log(1 <= 1);
// true

console.log(1 === 1);
// true

console.log(1 !== 1);
// false
```

but be careful with objects:

```javascript
const a = { 0: 0 };
const b = { 0: 0 };
const c = a;

console.log(a === b);
// false

console.log(a === c);
// true
```

```javascript
console.log(!true)
// false

console.log(true && false)
// false

console.log(true || false)
// true
```

## if ... else

```javascript
const f = x => {
  if (x) {
    return 1;
  } else {
    return 0;
  }
};
console.log(f(true));
// 0

console.log(f(false));
// 1
```

## (cond ? true : false)

```javascript
const f = x => (x ? 1 : 0);
console.log(f(true));
// 0

console.log(f(false));
// 1
```

## switch

```javascript
const f = x => {
  switch (x) {
    case true:
      return 1;
    case false:
      return 0;
    default:
      return -1;
  }
};
console.log(f(true));
// 1

console.log(f(false));
// 0

console.log(f());
// -1
```

## objects

```javascript
const x = { a: 0, b: "text", c: true };
console.log(x.a);
// 0

console.log(x["a"]);
// 0

console.log(x.d);
// undefined

console.log(Object.entries(x));
// [ [ 'a', 0 ], [ 'b', 'text' ], [ 'c', true ] ]

console.log(Object.values(x));
// [ 0, 'text', true ]

console.log(Object.keys(x));
// [ 'a', 'b', 'c' ]

console.log(Object.getOwnPropertyNames(x));
// [ 'a', 'b', 'c' ]

const a = (function() {
  return arguments;
})("a", "b");
console.log(a);
// [Arguments] { '0': 'a', '1': 'b' }

console.log(Object.keys(a));
// [ '0', '1' ]

console.log(Object.getOwnPropertyNames(a));
// [ '0', '1', 'length', 'callee' ]

const x = { a: 0, b: "text", c: true };

const { a } = x;
console.log(a);
// 0

const b = { ...x, d: 1 };
console.log(b);
// { a: 0, b: 'text', c: true, d: 1 }
```
