<p align="center">
    <img src="https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png" height="128">
    <h1 align="center">Next-router-event</h1>
</p>

<p align="center">
    <img alt="logo" src="https://img.shields.io/badge/DERCC-DEV-brightgreen?style=for-the-badge">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/next">
    <img alt="NPM version" src="https://img.shields.io/npm/v/next-router-event?style=for-the-badge">
  </a>
    <img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
</p>

- [Introduction](#introduction)
- [Quick start](#quick-start)
  - [Installation](#installation)
  - [Examples](#examples)
- [Motivation](#motivation)

## Introduction

<b>Next-router-event</b> contains the `useRouterEvent` hook which is basically a tiny abstraction arount [next router.events](https://nextjs.org/docs/api-reference/next/router#routerevents). You can use the hook to easily trigger callbacks on a certain type of router event:

- routeChangeStart
- routeChangeComplete
- routeChangeError
- beforeHistoryChange
- hashChangeStart
- hashChangeComplete

<b>It also adds typescript support which gives you a better idea on what args are passed to the callback!</b>

## Quick start

### Installation

```bash
yarn add next-router-event

or

npm i next-router-event
```

### Examples

<b>Example 1:</b>
Imagine we have a modal that needs to close whenever the use navigates to a different page. Note that the callback is wrapped inside a `useCallback` as we want to make sure this function is referentially equal in order to avoid running the effect on every render, unless ofcourse it's on purpose.

```tsx
import { useState } from 'react'
import useRouterEvent from "next-router-event";

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = useCallback(() => setIsOpen(false), [])

    useRouterEvent('routeChangeComplete', onClose, []))

    ...
}
```

<b>Example 2:</b>
The hook can also be handy to trigger certain datalayer updates with regards to google analytics.

```tsx
import useRouterEvent from "next-router-event";

const handleRouteChange = () => {
  window.dataLayer.push({
    event: "pageview",
    page_location: window.location.href,
  });
};

const usePageView = () => {
  useRouterEvent("routeChangeComplete", handleRouteChange);
};

export default usePageView;
```

<b>Example 3:</b>
If a route load is cancelled (for example, by clicking two links rapidly in succession), we can capture this. By looking at the event type typescript knows what args are given to the callback which we can use to do specific stuff.

```tsx
import useRouterEvent from "next-router-event";

// wrong
const handleRouteChange1 = (err: string) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
};

// correct
const handleRouteChange2 = (err: Error, url: string) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
};

const useOnRouterError = () => {
  // typescript will complain
  useRouterEvent("routeChangeError", handleRouteChange1);

  // correct
  useRouterEvent("routeChangeError", handleRouteChange2);
};

export default usePageView;
```

## Motivation

A library for the `useRouterEvent` hook is probably a little bit redundant but I created it with the idea to try out [turborepo](https://turborepo.org/). This got me into trying out more things like [microbundler](https://github.com/developit/microbundle) for bundling and [changesets](https://github.com/changesets/changesets) as the way to manage versioning.

Also special thanks to [Lee Robinson](https://leerob.io/) who wrote a [nice article](https://leerob.io/blog/turborepo-design-system-monorepo) on this matter

Feel free to copy this setup as a boilerplate for your own ideas!
