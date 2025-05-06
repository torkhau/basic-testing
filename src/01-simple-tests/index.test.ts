// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: -2, b: 0, action: Action.Add })).toBe(-2);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Add })).toBe(-3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: -2, b: 0, action: Action.Subtract })).toBe(-2);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Subtract })).toBe(3);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Multiply })).toBe(0);
    expect(
      Object.is(simpleCalculator({ a: 0, b: -1, action: Action.Multiply }), -0),
    ).toBeTruthy();
    expect(
      Object.is(simpleCalculator({ a: -2, b: 0, action: Action.Multiply }), -0),
    ).toBeTruthy();
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Divide })).toBeNaN();
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(
      Object.is(simpleCalculator({ a: 0, b: -1, action: Action.Divide }), -0),
    ).toBeTruthy();
    expect(simpleCalculator({ a: -2, b: 0, action: Action.Divide })).toBe(
      -Infinity,
    );
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Divide })).toBe(-0.5);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Divide })).toBe(-0.5);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: -1, action: Action.Exponentiate })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: -2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(
      simpleCalculator({ a: -1, b: -2, action: Action.Exponentiate }),
    ).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: 'add' })).toBeNull();

    expect(simpleCalculator({ a: 1, b: 1, action: 'sub' })).toBeNull();

    expect(simpleCalculator({ a: 1, b: 1, action: 'mult' })).toBeNull();

    expect(simpleCalculator({ a: 1, b: 1, action: 'exp' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '00', b: -2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: '30', b: undefined, action: Action.Add }),
    ).toBe(null);

    expect(
      simpleCalculator({ a: '00', b: -2, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '30', b: undefined, action: Action.Subtract }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: '00', b: -2, action: Action.Multiply }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '30', b: undefined, action: Action.Multiply }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: '00', b: -2, action: Action.Divide }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '30', b: undefined, action: Action.Divide }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: '00', b: -2, action: Action.Exponentiate }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '30', b: undefined, action: Action.Exponentiate }),
    ).toBeNull();
  });
});
