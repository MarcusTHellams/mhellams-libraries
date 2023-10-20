# MTH Use Deferred Promise

`useDeferredPromise` is a custom React hook that provides a simple mechanism to create deferred promises within a React functional component. This can be useful for delaying the resolution of a promise until a later time or when a specific event occurs.

### Installation
pnpm
```shell
pnpm add @mhellams/mth-use-deferred-promise
````

yarn
```shell
yarn add @mhellams/mth-use-deferred-promise
````

npm
```shell
npm install @mhellams/mth-use-deferred-promise
````

### Import
ESM
```javascript
import { useDeferredPromise } from '@mhellams/mth-use-deferred-promise';
````

CJS
```javascript
const { useDeferredPromise } = require('@mhellams/mth-use-deferred-promise');
````
### Usage
[StackBlitz](https://stackblitz.com/edit/stackblitz-starters-va2tqk?file=src%2FApp.tsx)