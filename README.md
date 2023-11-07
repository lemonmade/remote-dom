# Remote DOM

## Usage

### Worker

In your HTML:

```html
<remote-dom-worker src="https://my-app.com/remote.js"></remote-dom-worker>

<script
  src="https://remote-dom.io/v1/elements/remote-dom-worker.js"
  type="module"
></script>
```

In your Worker:

```js
import {root} from 'https://remote-dom.io/v1/environment/worker.js';

root.innerHTML = '<p>This content was provided by a remote environment!</p>';
```

In your classic script Worker:

```js
importScripts('https://remote-dom.io/v1/environment/worker.nomodule.js');

const root = self[Symbol.for('remote-dom.root')];
root.innerHTML = '<p>This content was provided by a remote environment!</p>';
```

### Iframe

In your HTML:

```html
<remote-dom-iframe src="https://my-app.com/remote.html"></remote-dom-iframe>

<script
  src="https://remote-dom.io/v1/elements/remote-dom-iframe.js"
  type="module"
></script>
```

In the `iframe` HTML:

```html
<html>
  <body>
    <remote-root>
      <p>This content was provided by a remote environment!</p>
    </remote-root>

    <script
      src="https://remote-dom.io/v1/environment/iframe.js"
      type="module"
    ></script>
  </body>
</html>
```

Using the body as the root element:

```html
<html>
  <head>
    <script
      src="https://remote-dom.io/v1/environment/iframe.js"
      type="module"
    ></script>
  </head>

  <body>
    <p>This content was provided by a remote environment!</p>
  </body>
</html>
```

Using a custom root element:

```html
<html>
  <body>
    <div id="root">
      <p>This content was provided by a remote environment!</p>
    </div>

    <script
      src="https://remote-dom.io/v1/environment/iframe.js"
      type="module"
      data-root="#root"
    ></script>
  </body>
</html>
```
