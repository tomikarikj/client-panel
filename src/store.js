import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
// @todo

// Firebase config
const fbConfig = {
  apiKey: 'AIzaSyBSfMv8Z43fmK4T-QOzzbAZ7fyrsBqxyig',
  authDomain: 'clientpanel-57df9.firebaseapp.com',
  databaseURL: 'https://clientpanel-57df9.firebaseio.com',
  projectId: 'clientpanel-57df9',
  storageBucket: 'clientpanel-57df9.appspot.com',
  messagingSenderId: '123323157356'
};

// React Redux Firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// Init Firebase instance
firebase.initializeApp(fbConfig);
// Init Firestore
// eslint-disable-next-line
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
