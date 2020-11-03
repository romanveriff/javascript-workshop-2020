export const curry = f => {
  const _ = (...args) =>
    args.length < f.length ? _.bind(null, ...args) : f(...args);
  return _;
};

export const pipe = (...fns) => (...args) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

export const a = 0;
export function fn (x) {return x}
export default 0;
