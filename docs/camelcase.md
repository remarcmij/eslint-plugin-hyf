# Identifiers should be camelCase

## Rule details

Variable, function, parameter and property names should be camelCase, with these exceptions:

- Constructor function names can be PascalCase. The rule flags a function as a potential constructor function if the function body includes assignments to properties of the `this` object and excludes a `return` statement.
- Variable names can be SHOUT_CASE if declared with `const`.

Examples of **incorrect** code for this rule:

```js
let FOO = 1;

const foo_bar = 1;

function Foo() {}

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

function Foo() {
  this.bar = 1;
}

const foo = { bar: 1 };
```
