import { test, expect } from 'vitest'

test('first test', () => {
  const el = 5;
  const el2 = 6;

  const sum = el + el2
  expect(sum).equals(11)
});
