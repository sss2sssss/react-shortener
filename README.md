This project was bootstrapped with [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap).

Simple Link Shortner Creator developed by using React and Firebase Dynamic Link.

This web apps are now capacitor-ready! Read this for more details regards capacitor:
https://capacitorjs.com/docs/v2

Demo: https://react-linkshortener.firebaseapp.com

The demo site will allowing user to shorten this five domain: google.com, facebook.com, youtube.com, github.com, medium.com.

For more information on URL whitelisting on Firebase Dynamic Link, please refer to this FAQ:
https://support.google.com/firebase/answer/9021429

## Before Start
Initiate a Firebase project then confugure for Dynamic Link, for more detail can click following link:
https://firebase.google.com/docs/dynamic-links/rest

Then once got your domain and key, create a .env file and add these two variables:
REACT_APP_FIREBASE_DYNAMIC_LINK_DOMAIN=YOUR_FIREBASE_DYNAMIC_LINK_DOMAIN
REACT_APP_FIREBASE_WEB_API_KEY=YOUR_FIREBASE_WEB_API_KEY

## Optional
On .env there's one variable used to determine which domain that you use to whitelist:
REACT_APP_DEMO_MODE=google.com,facebook.com,youtube.com,github.com,medium.com


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

### `npm run init-mobile`

It will help init capacitor config and add android config into project.

### `npm run start-android`

It will auto run build script then copy asset over to android capacitor folder then open Android Studio


This site had deployed to Firebase Hosting, more details on Firebase Hosting:
https://firebase.google.com/docs/hosting
