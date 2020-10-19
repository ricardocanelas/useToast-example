This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a simple example of how you can create your own toast using only hook/contextApi.

See the examples here - https://ricardocanelas.github.io/useToast-example

## UseToast

| props       | type     | params                 |
| ----------- | -------- | ---------------------- |
| toasts      | array    | -                      |
| getToasts   | function | direction              |
| addToast    | function | props, direction, time |
| removeToast | function | id                     |
| clearToasts | function | -                      |

**Directions**:

- top
- top-left
- top-right
- bottom
- bottom-left
- bottom-right.

## Installing

In `index.js` add the providers

```js
import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "./useToast";

ReactDOM.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.getElementById("root")
);
```

### Using:

```js
import React from "react";
import useToast from "./useToast";

const App = () => {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast(
      { title: "This is a simple message", variant: "success" },
      "bottom",
      7000
    );
  };

  return (
    <div>
      <button onClick={handleClick}>Add Toast</button>
    </div>
  );
};
```

## Customizing your toasts

| props        | type        |
| ------------ | ----------- |
| DefaultToast | Component   |
| maximum      | number      |
| portal       | DOM Element |

```js
import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "./useToast";

const MyAlert = ({ props, remove }) => {
  return (
    <div>
      props.title
      <button onClick={handleClick}>Add Toast</button>
    </div>
  );
};

ReactDOM.render(
  <ToastProvider DefaultToast={MyAlert} maximum={5} portal={document.body}>
    <App />
  </ToastProvider>,
  document.getElementById("root")
);
```

# License

MIT © [Ricardo Canelas](https://github.com/ricardocanelas)
