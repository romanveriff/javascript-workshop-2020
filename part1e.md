# part 1 exercises

1. declare log() function. it calls `console.log` with the same
   arguments, but outputs hardcoded prefix.

```javascript
const log = (/*...*/) => {
  //...
};
log(0, 1);
// prefix: 0 1
```

2. refactor to remove all arguments from declaration of words() by
   partially applying the function.

```javascript
const split = (sep, str) => str.split(sep);
const words = str => split(" ", str);

log(words("hello world"));
// ["hello", "world"]
```

3. declare prop() function. it returns property value of an object.

```javascript
const user = { name: "roman", id: 1 };
const prop = (/*...*/) => {
  //...
};

log(prop("name", user));
// roman
```

4. refactor pluralize() without using `switch/case`:

```javascript
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
```

5. currify pluralize(), so both calls would work the same:

```javascript
pluralize("user", "users")(1);
pluralize("user", "users", 1);
```
