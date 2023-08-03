# About

A custom hook that lets you subscribe to a DOM event. It uses useSyncExternalStore under the hood, but allows you to do the following that useSyncExternalStore doesn't support.

- Get the event object.
- Provide a selector function to subscribe to the change of an event's property only.
- Specify a ref to an HTMLElement that the listener of this hook will be attached to.
- Select the event name with code-completion support.
- The event type in the selector function is inferred from the event name you typed in the first parameter, so that you can easily select a property of the event with code-completion aid.

## Installation

```bash
npm install use-sync-event
```

or

```bash
pnpm add use-sync-event
```

## Import

```js
import { useSyncEvent } from "use-sync-event";
```

## Usage

1. The first parameter is the event name that you want to subscribe. If you provide this parameter only, the event object will be returned when it is triggered.

```js
const resizeEvent = useSyncEvent("resize");
```

2. The second parameter is an optional object. It has 2 optional fields. In the first field, you can provide a selector function to subscribe to the change of a property only. In the second field, you can provide a ref to an HTMLElement that the listener of this hook will be attached to.

```js
const pointerX = useSyncEvent("pointerdown", {
  selector: (e) => e.clientX,
  ref: myRef,
});
```

```jsx
<div ref={myRef}>Click or touch me...</div>
```

3. Note that the type of e in the optional selector function is inferred by the event name you typed in the first parameter. This allows you to easily find a property of a specific event type. For example, e in the following is inferred as WheelEvent because "wheel" is typed in the first parameter.

```js
const wheelDeltaY = useSyncEvent("wheel", {
  selector: (e) => e.deltaY,
});
```

## License

[MIT](https://opensource.org/license/mit/)

## Copyright

Copyright (c) 2023 Ho Chung Law
