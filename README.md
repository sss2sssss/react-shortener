This project was bootstrapped with [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap).

Simple Link Shortner Creator developed by using React and Firebase Dynamic Link
Demo: https://react-linkshortener.firebaseapp.com

## Before Start
Initiate a Firebase project then confugure for Dynamic Link, for more detail can click following link:
https://firebase.google.com/docs/dynamic-links/rest

Then once got your domain and key, create a .env file and add these two variables:
REACT_APP_FIREBASE_DYNAMIC_LINK_DOMAIN=YOUR_FIREBASE_DYNAMIC_LINK_DOMAIN
REACT_APP_FIREBASE_WEB_API_KEY=YOUR_FIREBASE_WEB_API_KEY

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
