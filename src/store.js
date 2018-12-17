import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//@todo Reducers

const firebaseConfig = {
  apiKey: "AIzaSyByWHCZSuUAgxBL7QXqLt_PlkgMra8sn68",
  authDomain: "react-client-panel-d66e5.firebaseapp.com",
  databaseURL: "https://react-client-panel-d66e5.firebaseio.com",
  projectId: "react-client-panel-d66e5",
  storageBucket: "react-client-panel-d66e5.appspot.com",
  messagingSenderId: "464563590536"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});
const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
