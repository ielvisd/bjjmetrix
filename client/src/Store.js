import { createContext } from 'react';

// Exports Store which is what will hold our state and dispatch functions (similar to Redux)
export const Store = createContext({
	state: {},
	dispatch: () => {}
});
