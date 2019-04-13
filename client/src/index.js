import React, { useReducer, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Store } from './Store';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

require('dotenv').config();

// Set's the App's initial State
const initialState = {
	email: '',
	id: null,
	name: '',
	phone: '',
	premium: false,
	recieves_email: false,
	recieves_text: false
};

// Reducer Functions used to update State
const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const AppContainer = () => {
	useEffect(() => {
		// Initialize Firebase
		var config = {
			apiKey: 'AIzaSyAFSiqnWVdGtqG2GLdhujhzqoAL-AQJxtY',
			authDomain: 'bjj-metrix.firebaseapp.com',
			databaseURL: 'https://bjj-metrix.firebaseio.com',
			projectId: 'bjj-metrix',
			storageBucket: 'bjj-metrix.appspot.com',
			messagingSenderId: '683059064098'
		};
		firebase.initializeApp(config);
	}, []);

	// useReducer hook is acting like Redux here and setting up our state to be the initial State we defined above and mapping our reducer actions to dispatch calls.
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		// Store.Provider wraps our App component setting it up with state & dispatch. To see state in action in Inspector you can go to Store.Provider => props =>  value => state (updates live when working with the app)
		<Router>
			<Store.Provider value={{ state, dispatch }}>
				<App />
			</Store.Provider>
		</Router>
	);
};

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
