# Variable, function and parameter names should be camelCase

## Rule details

Variable, function, parameter and property names should be camelCase with these exceptions:

- Function names can be PascalCase if used a constructor function. In this case a warning is issued which ends with "_(but okay for constructor functions)_".
- Variable names can be SHOUT_CASE if declared with `const`.

Examples of **incorrect** code for this rule:

```js
let FOO = 1;

const foo_bar = 1;

function Foo() {} // warning includes"...(but okay for constructor functions)"

function foo(Bar) {}

const foo = { Bar: 1 };

const foo = { foo_bar: 1 };
```

Examples of **correct** code for this rule:

```js
let foo = 1;

const FOO_BAR = 1;

function foo() {}

function foo(bar) {}

const foo = { bar: 1 };
```
