### A shopping cart built with React, Redux (with Typescript), Material-UI, Node, MongoDB, Express [Old code style]

#### To install locally

1. Clone repo on your local machine:

```js
 git clone
```

Install server-side dependencies:

```js
 cd fullstack-shopping-cart
 npm install
```

Install client-side dependencies:

```js
 cd client
 npm install
```

In the root of the project create a .env file and replace the MONGODB_URI, and SESSION_SECRET env variable with your own

Start MongoDB in your local machine

```js
sudo service mongod start
```

cd into ./client and build the client:

```js
 npm run build
```

Now navigate back to server root directory and start the server

```js
 cd ..
 npm run start
```

Now navigate to `localhost:5000` and the app is running here
