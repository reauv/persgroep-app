import each from 'lodash/each';

/**
 * The container that holds all the stores.
 *
 * @type {Object}
 */
const container = {};

/**
 * Register a new store.
 *
 * @param  {String} key
 * @param  {Object} store
 *
 * @return {void}
 */
export function register(key, store) {
	if (typeof store === 'function') {
		container[key] = new store();
		return;
	}

	container[key] = store;
}

/**
 * Resolve a store from the store container.
 *
 * @param  {String} key
 * @return {Object}
 */
export function resolve(key) {
	return container[key];
}

export function hydrate(data = {}) {
	each(container, (store, key) => {
		if (typeof data[key] === 'object') {
			Object.assign(store, data[key]);
		}
	});
}

export function dehydrate() {
	return JSON.stringify(container);
}

if (process.env.ENV === 'development' && typeof window !== 'undefined') {
	window.store = container;
}
