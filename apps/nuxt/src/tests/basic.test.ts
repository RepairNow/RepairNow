import { expect, it } from 'vitest'

it('testing addition', () => {
  const number1 = 5;
  const number2 = 6;
  const sum = number1 + number2;

  expect(sum).equals(11);
})
