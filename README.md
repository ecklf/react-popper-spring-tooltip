# React Popper Spring Tooltip

[![npm version](https://img.shields.io/npm/v/react-popper-spring-tooltip.svg)](https://www.npmjs.com/package/react-popper-spring-tooltip)
[![npm downloads](https://img.shields.io/npm/dm/react-popper-spring-tooltip.svg)](https://www.npmjs.com/package/react-popper-spring-tooltip)
[![Dependency Status](https://david-dm.org/souporserious/react-popper-spring-tooltip.svg)](https://david-dm.org/souporserious/react-popper-spring-tooltip)[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Tooltips powered by [react-popper](https://github.com/FezVrasta/react-popper) and [react-spring](https://www.react-spring.io/).

## Demo

**Click on the image below 🔽**

<p align="center">
  <a href="https://react-popper-spring-tooltip.netlify.com">
    <img src="assets/demo.gif" width="256" height="auto"/>
  </a>
</p>

## Install

Via package managers:

```bash
npm install react-popper-spring-tooltip --save
# or
yarn add react-popper-spring-tooltip
```

## Usage

### Examples

Let's start with a simple example:

Wrap your `Tooltip` component around on / off `Trigger`.

```jsx
<Tooltip trigger="click" placement="bottom" content={<h1>Hi!</h1>}>
  {({ ...bind }) => <button {...bind}>Trigger</button>}
</Tooltip>
```

Spreading `bind` will pass you the reference provided by `react-popper` and _EventListeners_ to open / close the tooltip content.

`react-popper-spring-tooltip` makes use of a React pattern called **"render prop"**, if you are not
familiar with it, please read more [on the official React documentation](https://reactjs.org/docs/render-props.html).

In more advanced use cases you may pass your own React Components via the `content` prop. You can also pass your custom `react-spring` config to make awesome custom animations.

```jsx
<Tooltip
  trigger="click"
  placement="bottom"
  content={<TooltipContent />}
  springConfig={{
    from: {
      scale: 0.8,
      config: { duration: 100 }
    },
    to: {
      scale: 1,
      config: { duration: 50 }
    }
  }}
>
  {({ isOpen, ...bind }) => (
    <button
      {...bind}
      className={`${isOpen ? "opened-button" : "closed-button"}`}
    >
      Trigger
    </button>
  )}
</Tooltip>
```

### Props

#### children

> `(props) => ReactNode` | _required_

The `Tooltip` component must be wrapped around function that renders the _Trigger_.

#### content

> `string | React.Element` | _required_

The content of the Tooltip.

#### trigger

> `string` | _required_

The tooltip trigger. Valid triggers are:

- `click`
- `hover`
- `context`

#### placement

> `string` | _required_

The tooltip placement. Valid placements are:

- `auto`
- `top`
- `bottom`
- `left`
- `right`

Each placement can have a variation from this list:

- `-start`
- `-end`

#### init

> `boolean` | defaults to `false`

Will determine the initial open (true) and closed (false) state.

#### springConfig

> `object` | defaults to:

```js
{ from: {opacity : 0}, to: {opacity: 1}}
```

Define the CSS using `from` and `to` keys.

If you are new to `react-spring` check out their [docs](https://www.react-spring.io/).

## TypeScript

This library is built with TypeScript and will automatically generate typing in: `dist/Tooltip.d.ts`

## Local Development

### clone repo

`git clone https://github.com/impulse/react-popper-spring-tooltip.git`

### cd into folder

`cd ~/react-popper-spring-tooltip`

### install dependencies

`npm install` or `yarn`

### run dev mode

`npm run watch` or `yarn watch`
