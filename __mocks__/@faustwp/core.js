module.exports = {
	...jest.requireActual('@faustwp/core'),
	getWpHostname: () => 'localhost',
}
