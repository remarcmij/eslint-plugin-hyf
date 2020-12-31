# The result from Array#map must be used

## Rule details

Beginners often make the mistake of using `Array#map` as an _expression statement_, i.e. without actually using the new array returned by `map`. This rule warns that `map` should in this case be replaced by `forEach`.

Examples of **incorrect** code for this rule:

```js
foo.map((bar) => {
  console.log(bar);
});
```

Examples of **correct** code for this rule:

```js
const result = foo.map((x) => x * 2);

foo
  .map((x) => x * 2)
  .forEach((x) => {
    console.log(x);
  });
```
