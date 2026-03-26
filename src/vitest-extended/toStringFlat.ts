import { type Fn } from './bemedev/globals/types';

const log10: Fn<[value: number], number> = (value: number) => {
  return Math.floor(Math.log10(value));
};

export const toStringFlat: Fn<[value: number, len: number], string> = (
  _value,
  _len,
) => {
  const logLength = log10(_len);
  const logValue = log10(_value);
  const length = logLength - logValue;

  let out = '';
  Array.from({ length }).forEach(() => {
    out += '0';
  });

  out += _value;

  return out;
};
