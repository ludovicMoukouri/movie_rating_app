var expect = require('chai').expect;
var assert = require("assert");
const { addUtility, multUtility } = require('./../add.js');

describe('Add', function(){
	describe('addUtility', function(){
		it('should have a sum method', function(){
			assert.equal(typeof addUtility, 'object');
			assert.equal(typeof addUtility.sum, 'function');
		})
		it('addUtility.sum(5, 4) should return 9', function(){
			assert.deepEqual(addUtility.sum(5, 4), 9)
		})
	})
});

describe('Mult', function(){
	describe('multUtility', function(){
		it('should have a mult method', function(){
			expect(multUtility).to.be.an('object');
			expect(multUtility).to.have.property('mult');
		})
		it('multUtility.mult(5, 4) should return 20', function(){
			expect(multUtility.mult(5, 4)).to.deep.equal(20)
		})
	})
});