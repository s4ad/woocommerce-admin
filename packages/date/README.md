# Date

A collection of utilities to display and work with date values.

## Installation

Install the module

```bash
pnpm install @woocommerce/date --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for ES2015+ such as lower versions of IE then using [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](https://babeljs.io/docs/en/next/babel-polyfill) will add support for these methods. Learn more about it in [Babel docs](https://babeljs.io/docs/en/next/caveats)._

## Usage

The `date` package makes use of the global `window.wcSettings.timeZone`.  If a timezone is set, the current and last periods will be converted from your browser's timezone to the store timezone.  If none is set, these periods will be based on your browser's timezone.
