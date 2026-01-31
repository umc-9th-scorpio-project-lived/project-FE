import { describe, it, expect } from 'vitest';
import { add } from './testUtil';

describe('add', () => {
  it('두 숫자를 더할 수 있다', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('음수도 처리할 수 있다', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
