import { describe, expect, it } from 'vitest';

import { cn } from '../cn';

describe('cn', () => {
  it('単一のクラス名を返す', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('複数のクラス名を結合する', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('条件付きクラス名を処理する', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('配列のクラス名を処理する', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('オブジェクト形式のクラス名を処理する', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('Tailwind の競合するクラスをマージする', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('空の入力を処理する', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null, undefined)).toBe('');
  });

  it('複雑な組み合わせを処理する', () => {
    expect(cn('base', ['array-class'], { 'object-class': true }, true && 'conditional', 'px-2', 'px-4')).toBe(
      'base array-class object-class conditional px-4',
    );
  });
});
