# Realtime Chat App API
**Realtime Chat API**

#Learning

---

## Tech Used
- TypeScript
- Node
- Express
- MongoDB
- Socket.IO
- more...

---

## Instalation

```js
npm i
npm start
```

> Rename `local.env` to `.env` and set your dev environment there

##### Default PORT : 5000

---

## NPM Script
- npm start

> Will run `npm run build` and then execute the `index.js` file inside `./build` folder with `node build/index` to start the server

- npm run build

> Will compile TypeScript from `./src` folder to `./build` folder (This will delete the existing `./build` folder before creating new one)

- npm run serve

> Will start the server by executing the `index.js` file inside `./build` folder withtout run `npm run build`

- npm run dev

> Will start the server by executing the `index.ts` file inside `./src` folder using `nodemon`

- npm run lint

> Will run TypeScript linter

---

##### _valenoirs_