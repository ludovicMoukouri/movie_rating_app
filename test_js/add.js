var addUtility = {}
var multUtility = {}
addUtility.sum = function (a, b) {
	'use strict';
	return a + b;
}
multUtility.mult = function (a, b) {
	'use strict';
	return a * b;
}
module.exports = { addUtility, multUtility };