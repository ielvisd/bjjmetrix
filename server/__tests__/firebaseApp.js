const firebase = require('firebase');

describe('helper file', () => {
	it('helper file', async () => {
		expect(true).toEqual(true);
	});
});

async function getToken() {
	const email = 'test@test.com';
	const password = 'password';

	var config = {
		apiKey: 'AIzaSyAFSiqnWVdGtqG2GLdhujhzqoAL-AQJxtY',
		authDomain: 'bjj-metrix.firebaseapp.com',
		databaseURL: 'https://bjj-metrix.firebaseio.com',
		projectId: 'bjj-metrix',
		storageBucket: 'bjj-metrix.appspot.com',
		messagingSenderId: '683059064098'
	};

	firebase.initializeApp(config);

	const res = await firebase.auth().signInWithEmailAndPassword(email, password);

	const token = await res.user.getIdToken();

	return token;
}

module.exports.getToken = getToken();
