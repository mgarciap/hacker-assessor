import React from 'react/addons';
import test from 'tape';
import Hello from '../hello';

const TestUtils = React.addons.TestUtils;

test('Hello component should exist', (assert) => {
  var isReactElement = TestUtils.isElementOfType(<Hello />, Hello);

  assert.ok(isReactElement);

  assert.end();
});
