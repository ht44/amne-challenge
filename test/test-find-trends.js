'use strict';
const assert = require('assert');
const now = require('performance-now');
const findTrends = require('../index');

describe ('TEST', () => {
  it ('should run', () => {
    assert.equal(true, true);
  });
});

describe ('#findTrends', function() {

  this.timeout(30000);

  it ('should be properly required', () => {
    assert.ok(findTrends);
  });

  it ('should be of type \'function\'', () => {
    assert.equal(typeof findTrends, 'function');
  });

  it ('should return an array for testing', () => {
    assert.equal(Array.isArray(findTrends('./mock/input.txt', './output/output.txt')), true);
  });

  it ('should execute in < 30 seconds', () => {
    let start = now();
    findTrends('./mock/large.txt', './output/output.txt')
    let end = now();
    assert.equal(end - start < 30000, true);
  });

  it ('should pass for the sample input', () => {
    assert.deepEqual(findTrends('./mock/input.txt', './output/output.txt'), [3, 0, -1]);
  });

});
